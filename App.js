import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const App = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  const renderMemeItem = ({ item }) => (
    <View style={styles.memeContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Image source={{ uri: item.img_url }} style={styles.image} />
      <View style={styles.endSeccion}>
        <Text style={styles.likes}>👍 {item.likes}</Text>
        <Text style={styles.user}>Posted by: {item.user}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={memes}
      renderItem={renderMemeItem}
      keyExtractor={(item) => item.filename}
      onEndReached={loadMoreMemes}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
    />
  );
};

const styles = StyleSheet.create({
  memeContainer: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 6,
    marginVertical: 10,
  },
  likes: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007bff",
    marginTop: 5,
  },
  user: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
  endSeccion: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default App;
