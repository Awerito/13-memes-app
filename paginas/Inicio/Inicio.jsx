import { useState, useContext } from "react";
import { View, FlatList, ActivityIndicator, Button } from "react-native";
import ElementoMeme from "../../componentes/ElementoMeme/ElementoMeme";
import ModalImagen from "../../componentes/ModalImagen/ModalImagen";
import ModalAutenticacion from "../../componentes/ModalAutenticacion/ModalAutenticacion";
import ModalSubirMeme from "../../componentes/ModalSubirMeme/ModalSubirMeme";
import ModalRegistro from "../../componentes/ModalRegistro/ModalRegistro";
import { ContextoAutenticacion } from "../../contexto/ContextoAutenticacion";
import useMemes from "../../hooks/useMemes";
import estilos from "./EstilosInicio";

const Inicio = () => {
  const { estaAutenticado } = useContext(ContextoAutenticacion);

  const { memes, estaCargando, cargarMasMemes, actualizarMemes } = useMemes();

  const [imagenSeleccionada, actualizaImagenSeleccionada] = useState(null);

  const [modalImagenVisible, actualizaVisibilidadModalImagen] = useState(false);
  const [modalSubirMemeVisible, actualizaVisibilidadModalSubirMeme] =
    useState(false);
  const [modalRegistroVisible, actualizaVisibilidadModalRegistro] =
    useState(false);
  const [modalAutenticacionVisible, actualizaVisibiliadModalAutenticacion] =
    useState(false);

  const manejarPresionarImagen = (imgUrl) => {
    actualizaImagenSeleccionada(imgUrl);
    actualizaVisibilidadModalImagen(true);
  };

  return (
    <View style={estilos.contenedor}>
      <FlatList
        data={memes}
        renderItem={({ item }) => (
          <ElementoMeme
            meme={item}
            manejarPresionarImagen={manejarPresionarImagen}
          />
        )}
        keyExtractor={(item) => item._id}
        onEndReached={cargarMasMemes}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          estaCargando ? <ActivityIndicator size="large" /> : null
        }
      />

      <ModalImagen
        urlImagen={imagenSeleccionada}
        visible={modalImagenVisible}
        actualizaVisibilidad={actualizaVisibilidadModalImagen}
      />

      <ModalSubirMeme
        visible={modalSubirMemeVisible}
        actualizaVisibilidad={actualizaVisibilidadModalSubirMeme}
        actualizarMemes={actualizarMemes}
      />

      <ModalRegistro
        visible={modalRegistroVisible}
        actualizaVisibilidad={actualizaVisibilidadModalRegistro}
      />

      <ModalAutenticacion
        visible={modalAutenticacionVisible}
        actualizaVisibilidad={actualizaVisibiliadModalAutenticacion}
      />

      <View style={estilos.contenedorBoton}>
        {estaAutenticado ? (
          <Button
            title="Subir"
            onPress={() => actualizaVisibilidadModalSubirMeme(true)}
          />
        ) : (
          <>
            <Button
              title="Ingresar"
              onPress={() => actualizaVisibiliadModalAutenticacion(true)}
            />
            <Button
              title="Registrarse"
              onPress={() => actualizaVisibilidadModalRegistro(true)}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Inicio;
