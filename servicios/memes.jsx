import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

const urlBase = "https://memes-api.grye.org";

export const autenticar = async (usuario, contraseña) => {
  try {
    const respuesta = await fetch(`${urlBase}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: usuario,
        password: contraseña,
      }).toString(),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Usuario o contraseña incorrectos"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const registrar = async (usuario, contraseña) => {
  try {
    const respuesta = await fetch(`${urlBase}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: usuario,
        password: contraseña,
      }).toString(),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al registrar usuario"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const obtenerMemes = async (pagina, cantidad) => {
  try {
    const url = `${urlBase}/memes/?page=${pagina}&limit=${cantidad}`;
    const respuesta = await fetch(url);

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al obtener memes"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const subirMeme = async (token, titulo, descripcion, imagen) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para subir un meme."];
    }

    const url = `${urlBase}/memes/?title=${encodeURIComponent(
      titulo,
    )}&description=${encodeURIComponent(descripcion)}`;

    const dataFormulario = new FormData();

    if (Platform.OS === "web") {
      dataFormulario.append("file", imagen.file);
    } else {
      const nombreArchivo = imagen.fileName || "upload.jpg";

      const uriArchivoTemporal = `${FileSystem.cacheDirectory}${nombreArchivo}`;
      await FileSystem.copyAsync({
        from: imagen.uri,
        to: uriArchivoTemporal,
      });

      dataFormulario.append("file", {
        uri: uriArchivoTemporal,
        name: nombreArchivo,
        type: imagen.mimeType || "image/jpeg",
      });
    }

    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: dataFormulario,
    });

    if (!respuesta.ok) {
      return [null, "Error al subir meme"];
    }

    return ["Meme subido con exito!", null];
  } catch (error) {
    return [null, error.message || "Error al subir meme"];
  }
};

export const likeMeme = async (token, memeId) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para dar like a un meme."];
    }

    const url = `${urlBase}/memes/${memeId}`;

    const respuesta = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const { likes } = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al dar like a meme"];
    }

    return [likes, null];
  } catch (error) {
    return [null, error.message || "Error al subir meme"];
  }
};
