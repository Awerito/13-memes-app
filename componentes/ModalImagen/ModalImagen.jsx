import { Modal, View, Image, TouchableOpacity, Text } from "react-native";
import estilos from "./EstilosImagenModal";

const ModalImagen = ({ visible, actualizaVisibilidad, urlImagen }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => actualizaVisibilidad(false)}
    >
      <View style={estilos.contenedorModal}>
        <TouchableOpacity
          style={estilos.botonCerrado}
          onPress={() => actualizaVisibilidad(false)}
        >
          <Text style={estilos.textoBotonCerrado}>Cerrar</Text>
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          source={{ uri: urlImagen }}
          style={estilos.imagenPantallaCompleta}
        />
      </View>
    </Modal>
  );
};

export default ModalImagen;
