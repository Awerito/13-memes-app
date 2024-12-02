import { useState, useContext } from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import { ContextoAutenticacion } from "../../contexto/ContextoAutenticacion";
import estilos from "./EstilosModalAutenticacion";

const ModalAutenticacion = ({ visible, actualizaVisibilidad }) => {
  const [usuario, actualizaUsuario] = useState("");
  const [contraseña, actualizaContraseña] = useState("");

  const { autenticarUsuario } = useContext(ContextoAutenticacion);

  const manejarEnvio = async () => {
    const esExitoso = await autenticarUsuario(usuario, contraseña);
    if (esExitoso) actualizaVisibilidad(false);
    else alert("Autenticación fallida");
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
          <Text>Autenticación</Text>
          <TextInput
            placeholder="Usuario"
            value={usuario}
            onChangeText={actualizaUsuario}
            style={estilos.entradaTexto}
          />
          <TextInput
            placeholder="Contraseña"
            value={contraseña}
            onChangeText={actualizaContraseña}
            secureTextEntry
            style={estilos.entradaTexto}
          />
          <Button title="Enviar" onPress={manejarEnvio} />
          <Button title="Cerrar" onPress={() => actualizaVisibilidad(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAutenticacion;
