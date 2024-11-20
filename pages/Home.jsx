import { useState, useContext } from "react";
import { View, FlatList, ActivityIndicator, Button, Alert } from "react-native";
import MemeItem from "../components/MemeItem";
import ImageModal from "../components/ImageModal";
import LoginModal from "../components/LoginModal";
import UploadMemeModal from "../components/UploadMemeModal";
import { AuthContext } from "../context/AuthContext";
import useMemes from "../services/useMemes";
import useUploadMeme from "../services/useUploadMeme";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { memes, loading, loadMoreMemes } = useMemes();
  const { uploadMeme } = useUploadMeme(); // Get uploadMeme from hook

  const [selectedImage, setSelectedImage] = useState(null);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [modalUploadVisible, setModalUploadVisible] = useState(false);

  const handleImagePress = (imgUrl) => {
    setSelectedImage(imgUrl);
    setModalImageVisible(true);
  };

  const handleUpload = async (image, title, description) => {
    try {
      await uploadMeme(image, title, description); // Call uploadMeme function
      Alert.alert("Success", "Meme uploaded successfully!");
      setModalUploadVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to upload meme.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={memes}
        renderItem={({ item }) => (
          <MemeItem item={item} handleImagePress={handleImagePress} />
        )}
        keyExtractor={(item) => item.filename}
        onEndReached={loadMoreMemes}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />

      <ImageModal
        imageUrl={selectedImage}
        visible={modalImageVisible}
        setVisible={setModalImageVisible}
      />

      <LoginModal
        visible={modalLoginVisible}
        setVisible={setModalLoginVisible}
      />

      <UploadMemeModal
        visible={modalUploadVisible}
        onClose={() => setModalUploadVisible(false)}
        onUpload={handleUpload} // Pass handleUpload
      />

      {isAuthenticated ? (
        <Button title="Upload" onPress={() => setModalUploadVisible(true)} />
      ) : (
        <Button title="Login" onPress={() => setModalLoginVisible(true)} />
      )}
    </View>
  );
};

export default Home;
