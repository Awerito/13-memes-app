import { useState } from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import estilos from "./EstilosModalRegistro";
import { registrar } from "../../servicios/memes";

const ModalRegistro = ({ visible, actualizaVisibilidad }) => {
  const [usuario, actualizaUsuario] = useState("");
  const [contraceña, actualizaContraceña] = useState("");
  const [confirmaContraceña, actualizaConfirmaContraceña] = useState("");

  const manejaEnvio = async () => {
    if (contraceña !== confirmaContraceña) {
      alert("Contraseñas no coinciden");
      return;
    }

    const [_, error] = await registrar(usuario, contraceña);
    if (error) {
      alert(error);
      return;
    }

    alert("Usuario registrado correctamente");
    actualizaVisibilidad(false);
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
          <Text>Registro</Text>
          <TextInput
            placeholder="Usuario"
            value={usuario}
            onChangeText={actualizaUsuario}
            style={estilos.entradaTexto}
          />
          <TextInput
            placeholder="Contraseña"
            value={contraceña}
            onChangeText={actualizaContraceña}
            secureTextEntry
            style={estilos.entradaTexto}
          />
          <TextInput
            placeholder="Repite la contraseña"
            value={confirmaContraceña}
            onChangeText={actualizaConfirmaContraceña}
            secureTextEntry
            style={estilos.entradaTexto}
          />
          <Button title="Envio" onPress={manejaEnvio} />
          <Button title="Cerrar" onPress={() => actualizaVisibilidad(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalRegistro;
