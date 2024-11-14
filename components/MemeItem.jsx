import { Text, View, Image, TouchableOpacity } from "react-native";
import memeItemStyles from "./memeitemstyles";

function MemeItem({ item, handleImagePress }) {
  return (
    <View style={memeItemStyles.memeContainer}>
      <Text style={memeItemStyles.title}>{item.title}</Text>
      <Text style={memeItemStyles.description}>{item.description}</Text>
      <TouchableOpacity onPress={() => handleImagePress(item.img_url)}>
        <Image source={{ uri: item.img_url }} style={memeItemStyles.image} />
      </TouchableOpacity>
      <View style={memeItemStyles.endSeccion}>
        <Text style={memeItemStyles.likes}>👍 {item.likes}</Text>
        <Text style={memeItemStyles.user}>Posted by: {item.user}</Text>
      </View>
    </View>
  );
}

export default MemeItem;
