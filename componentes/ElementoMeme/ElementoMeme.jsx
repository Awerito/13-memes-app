import { Text, View, Image, TouchableOpacity } from "react-native";
import estilos from "./EstilosElementoMeme";

function ElementoMeme({ meme, manejarPresionarImagen }) {
  return (
    <View style={estilos.contenedorMeme}>
      <Text style={estilos.titulo}>{meme.title}</Text>
      <Text style={estilos.descripcion}>{meme.description}</Text>
      <TouchableOpacity onPress={() => manejarPresionarImagen(meme.img_url)}>
        <Image
          resizeMode="contain"
          source={{ uri: meme.img_url }}
          style={estilos.imagen}
        />
      </TouchableOpacity>
      <View style={estilos.cierreSeccion}>
        <Text style={estilos.meGusta}>👍 {meme.likes}</Text>
        <Text style={estilos.usuario}>Posteado por: {meme.user}</Text>
      </View>
    </View>
  );
}

export default ElementoMeme;
