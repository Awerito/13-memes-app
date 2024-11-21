import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

const baseUrl = "https://memes-api.grye.org";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({ username, password }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return [null, data.detail || "Login failed"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const register = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({ username, password }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return [null, data.detail || "Register failed"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const getMemes = async (page, limit) => {
  try {
    const url = `${baseUrl}/memes/?page=${page}&limit=${limit}`;
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      return [null, "Failed to fetch memes"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const postMeme = async (token, title, description, image) => {
  try {
    if (!token) {
      return [null, "You must be logged in to upload a meme!"];
    }

    const url = `${baseUrl}/memes/?title=${encodeURIComponent(
      title,
    )}&description=${encodeURIComponent(description)}`;

    const formData = new FormData();

    if (Platform.OS === "web") {
      formData.append("file", image.file);
    } else {
      const fileName = image.fileName || "upload.jpg";

      const tempFileUri = `${FileSystem.cacheDirectory}${fileName}`;
      await FileSystem.copyAsync({
        from: image.uri,
        to: tempFileUri,
      });

      formData.append("file", {
        uri: tempFileUri,
        name: fileName,
        type: image.mimeType || "image/jpeg",
      });
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return [null, errorData.message || "Failed to upload meme."];
    }

    return ["Meme uploaded successfully!", null];
  } catch (error) {
    return [null, error.message || "An error occurred while uploading."];
  }
};
