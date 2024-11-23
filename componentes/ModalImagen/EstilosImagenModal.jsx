import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  contenedorModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  botonCerrado: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  textoBotonCerrado: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  imagenPantallaCompleta: {
    width: "90%",
    height: "80%",
    borderRadius: 8,
  },
});

export default estilos;
