import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  contenedorModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contenidoModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  entradaTexto: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
  nombreImagen: {
    marginVertical: 10,
    fontStyle: "italic",
  },
});

export default estilos;
