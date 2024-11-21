import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  memeContainer: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 6,
    marginVertical: 10,
  },
  likes: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007bff",
    marginTop: 5,
  },
  user: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
  endSeccion: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
