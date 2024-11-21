import { useState, useContext } from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import styles from "./LoginModalStyles";

const LoginModal = ({ visible, setVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async () => {
    const success = await loginUser(username, password);
    if (success) setVisible(false);
    else alert("Login failed");
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
          <Text>Login</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;
