import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MemeItem from "./components/MemeItem";
import loginStyles from "./loginStyles";
import imageStyles from "./imageStyles";

const App = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetchMemes = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://memes-api.grye.org/memes/?page=${page}&limit=10`,
      );
      const data = await response.json();

      if (data.length > 0) {
        setMemes((prevMemes) => [...prevMemes, ...data]);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes(page);
  }, [page]);

  const loadMoreMemes = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleImagePress = (imgUrl) => {
    setSelectedImage(imgUrl);
    setModalImageVisible(true);
  };

  const handleLoginPress = () => {
    setModalLoginVisible(true);
  };

  const handleLogin = () => {
    fetch("https://memes-api.grye.org/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: username,
        password: password,
        // scope: "",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.access_token) {
          AsyncStorage.setItem("token", data.jwt);
          setModalLoginVisible(false);
          alert("Login successful!");
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
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

      {/* Full screen image modal */}
      <Modal
        visible={modalImageVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalImageVisible(false)}
      >
        <View style={imageStyles.modalContainer}>
          <TouchableOpacity
            style={imageStyles.closeButton}
            onPress={() => setModalImageVisible(false)}
          >
            <Text style={imageStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage }}
            style={imageStyles.fullScreenImage}
          />
        </View>
      </Modal>

      {/* Login Modal */}
      <Modal
        visible={modalLoginVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalLoginVisible(false)}
      >
        <View style={loginStyles.modalContainer}>
          <View style={loginStyles.modalContent}>
            <Text>Login</Text>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={loginStyles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={loginStyles.input}
            />
            <Button title="Submit" onPress={handleLogin} />
            <Button title="Close" onPress={() => setModalLoginVisible(false)} />
          </View>
        </View>
      </Modal>

      <Button title="Login" onPress={handleLoginPress} />
    </View>
  );
};

export default App;
