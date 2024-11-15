import { useState } from "react";
import { View, FlatList, ActivityIndicator, Button } from "react-native";
import MemeItem from "./components/MemeItem";
import ImageModal from "./components/ImageModal";
import LoginModal from "./components/LoginModal";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import useMemes from "./services/useMemes";

const App = () => {
  const { memes, loading, loadMoreMemes } = useMemes();
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleImagePress = (imgUrl) => {
    setSelectedImage(imgUrl);
    setModalImageVisible(true);
  };

  const handleOpenLoginPress = () => {
    setModalLoginVisible(true);
  };

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ isAuthenticated, loginUser }) => (
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
              visible={modalImageVisible}
              imageUrl={selectedImage}
              onClose={() => setModalImageVisible(false)}
            />

            <LoginModal
              visible={modalLoginVisible}
              username={username}
              password={password}
              onUsernameChange={setUsername}
              onPasswordChange={setPassword}
              onLogin={() => loginUser(username, password)}
              onClose={() => setModalLoginVisible(false)}
            />

            {!isAuthenticated && (
              <Button title="Login" onPress={handleOpenLoginPress} />
            )}
          </View>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

export default App;
