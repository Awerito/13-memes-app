import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./MemeItemStyles";

function MemeItem({ item, handleImagePress }) {
  return (
    <View style={styles.memeContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity onPress={() => handleImagePress(item.img_url)}>
        <Image
          resizeMode="contain"
          source={{ uri: item.img_url }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.endSeccion}>
        <Text style={styles.likes}>👍 {item.likes}</Text>
        <Text style={styles.user}>Posted by: {item.user}</Text>
      </View>
    </View>
  );
}

export default MemeItem;
