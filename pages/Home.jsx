import { useState, useContext } from "react";
import { View, FlatList, ActivityIndicator, Button } from "react-native";
import MemeItem from "../components/MemeItem/MemeItem";
import ImageModal from "../components/ImageModal/ImageModal";
import LoginModal from "../components/LoginModal/LoginModal";
import UploadMemeModal from "../components/UploadMemeModal/UploadMemeModal";
import { AuthContext } from "../context/AuthContext";
import useMemes from "../hooks/useMemes";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const { memes, isLoading, loadMoreMemes } = useMemes();

  const [selectedImage, setSelectedImage] = useState(null);

  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [modalUploadVisible, setModalUploadVisible] = useState(false);

  const handleImagePress = (imgUrl) => {
    setSelectedImage(imgUrl);
    setModalImageVisible(true);
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
          isLoading ? <ActivityIndicator size="large" /> : null
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
        setVisible={setModalUploadVisible}
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
