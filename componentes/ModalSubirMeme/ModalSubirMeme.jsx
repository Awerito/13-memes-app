import { useState, useContext } from "react";
import { View, Text, TextInput, Button, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import estilos from "./EstilosModalSubirMeme";
import { subirMeme } from "../../servicios/memes";
import { ContextoAutenticacion } from "../../contexto/ContextoAutenticacion";

const ModalSubirMeme = ({ visible, actualizaVisibilidad, actualizarMemes }) => {
  const { credenciales, estaAutenticado } = useContext(ContextoAutenticacion);

  const [titulo, actualizaTitulo] = useState("");
  const [descripcion, actualizaDescripcion] = useState("");
  const [imagen, actualizaImagen] = useState(null);

  const eligeImagen = async () => {
    const permisoAlmacenamiento =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permisoAlmacenamiento.status !== "granted") {
      alert("Permisos de almacenamiento requeridos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      actualizaImagen(result.assets[0]);
    }
  };

  const manejaSubida = () => {
    if (!imagen || !titulo || !descripcion) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    if (!estaAutenticado || !credenciales) {
      alert("Debe iniciar sesión para subir memes.");
      return;
    }
    subirMeme(credenciales.access_token, titulo, descripcion, imagen).then(
      ([_, error]) => {
        if (error) {
          alert(error);
          return;
        }
        actualizaVisibilidad(false);
        actualizarMemes();
      },
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => actualizaVisibilidad(false)}
    >
      <View style={estilos.contenedorModal}>
        <View style={estilos.contenidoModal}>
          <Text>Subir Meme</Text>
          <TextInput
            placeholder="Titulo"
            value={titulo}
            onChangeText={actualizaTitulo}
            style={estilos.entradaTexto}
          />
          <TextInput
            placeholder="Descripción"
            value={descripcion}
            onChangeText={actualizaDescripcion}
            style={estilos.entradaTexto}
          />
          {imagen && (
            <Text style={estilos.nombreImagen}>{imagen.fileName}</Text>
          )}
          <Button title="Elegir imagen" onPress={eligeImagen} />
          <Button title="Subir" onPress={manejaSubida} />
          <Button title="Cerrar" onPress={() => actualizaVisibilidad(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalSubirMeme;
