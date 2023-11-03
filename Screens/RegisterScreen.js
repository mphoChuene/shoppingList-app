import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import app from "../firebaseConfig";
import RegisterImg from "../assets/register.jpg";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app); // Initialize the auth instance

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Successfully registered and logged in
      navigation.navigate("Login"); // Navigate back to the "Login" page
    } catch (error) {
      console.log("Registration Error:", error);
      // Handle registration error
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior="padding"
      enabled>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>
          Welcome to the shopping-list app, please register.
        </Text>
        <Image source={RegisterImg} style={styles.image} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            style={styles.inputs}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            style={styles.inputs}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button title="Register" onPress={handleRegister} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal:7,
    // justifyContent: "center",
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  image: {
    height: 330,
    width: "100%",
  },
  inputContainer: {
    width: "80%",
  },
  inputs: {
    height: 40,
    width: "100%",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    height: 40,
    width: "80%",
    marginVertical: 10,
    backgroundColor: "dodgerblue",
  },
});

export default RegisterScreen;
