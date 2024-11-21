import { useState, useContext } from "react";
import { View, Text, TextInput, Button, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "./UploadMemeModalStyles";
import { postMeme } from "../../services/memes";
import { AuthContext } from "../../context/AuthContext";

const UploadMemeModal = ({ visible, setVisible, refreshMemes }) => {
  const { credentials, isAuthenticated } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const storagePermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (storagePermission.status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const handleUpload = () => {
    if (!image || !title || !description) {
      alert("Please complete all fields and select an image.");
      return;
    }
    if (!isAuthenticated || !credentials) {
      alert("You must be logged in to upload a meme!");
      return;
    }
    postMeme(credentials.access_token, title, description, image).then(
      ([data, error]) => {
        if (error) {
          alert(error);
          return;
        }
        console.log("Meme uploaded successfully!", data);
        setVisible(false);
        refreshMemes();
      },
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Upload Meme</Text>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          {image && <Text style={styles.imageName}>{image.fileName}</Text>}
          <Button title="Select Image" onPress={pickImage} />
          <Button title="Upload" onPress={handleUpload} />
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default UploadMemeModal;
