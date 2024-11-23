import { Modal, View, Image, TouchableOpacity, Text } from "react-native";
import styles from "./ImageModalStyles";

const ImageModal = ({ visible, setVisible, imageUrl }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setVisible(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          source={{ uri: imageUrl }}
          style={styles.fullScreenImage}
        />
      </View>
    </Modal>
  );
};

export default ImageModal;
