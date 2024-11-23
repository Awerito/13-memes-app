import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  contenedorMeme: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  imagen: {
    width: "100%",
    height: 300,
    borderRadius: 6,
    marginVertical: 10,
  },
  meGusta: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007bff",
    marginTop: 5,
  },
  usuario: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
  cierreSeccion: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default estilos;
