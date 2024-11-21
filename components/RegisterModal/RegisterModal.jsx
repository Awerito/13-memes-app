import { useState } from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import styles from "./RegisterModalStyles";
import { register } from "../../services/memes";

const RegisterModal = ({ visible, setVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    const [_, error] = await register(username, password);
    if (error) {
      alert(error);
      return;
    }

    alert("Registration successful");
    setVisible(false);
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
          <Text>Register</Text>
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
          <TextInput
            placeholder="Repeat Password"
            value={confirmPass}
            onChangeText={setConfirmPass}
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

export default RegisterModal;
