import { Modal, View, Image, TouchableOpacity, Text } from "react-native";
import imageStyles from "./imageStyles";

const ImageModal = ({ visible, setVisible, imageUrl }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={imageStyles.modalContainer}>
        <TouchableOpacity
          style={imageStyles.closeButton}
          onPress={() => setVisible(false)}
        >
          <Text style={imageStyles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Image source={{ uri: imageUrl }} style={imageStyles.fullScreenImage} />
      </View>
    </Modal>
  );
};

export default ImageModal;
