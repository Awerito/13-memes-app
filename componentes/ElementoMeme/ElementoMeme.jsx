import { useState, useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import estilos from "./EstilosElementoMeme";
import { likeMeme } from "../../servicios/memes";
import { ContextoAutenticacion } from "../../contexto/ContextoAutenticacion";

function ElementoMeme({ meme, manejarPresionarImagen }) {
  const { credenciales, estaAutenticado } = useContext(ContextoAutenticacion);
  const [likes, actualizaLikes] = useState(meme.likes);

  const manejarLike = () => {
    if (!estaAutenticado || !credenciales) {
      alert("Debe iniciar sesión para dar me gusta.");
      return;
    }

    likeMeme(credenciales.access_token, meme._id).then(
      ([nuevosLikes, error]) => {
        if (error) {
          alert(error);
          return;
        }

        actualizaLikes(nuevosLikes);
      },
    );
  };

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
        <TouchableOpacity onPress={manejarLike}>
          <Text style={estilos.meGusta}>❤️ {likes}</Text>
        </TouchableOpacity>
        <Text style={estilos.usuario}>Posteado por: {meme.user}</Text>
      </View>
    </View>
  );
}

export default ElementoMeme;
