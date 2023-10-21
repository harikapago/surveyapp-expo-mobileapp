import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import MyButton from "../Components/MyButton";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function Register({ route, navigation }) {
//   const email  = "1mohsin231@gmail.com"
    const { email } = route.params;

  const [fullName, setFullName] = useState("");
  const [constituency, setConstituency] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleRegistration = () => {
    if (!validateEmail(email)) {
      Alert.alert(
        "Error",
        "Invalid email format. Please enter a valid email address."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password and Confirm Password do not match.");
      return;
    }

    // Send the registration data to the server using an HTTP POST request
    fetch("https://express-mongodb-survey-postapi.azurewebsites.net/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        fullName: fullName,
        constituency: constituency,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          // Registration successful
          setRegistrationMessage("Registration successful");
          Alert.alert("Success", "Registration successful");

          // Navigate to the Login screen
          navigation.navigate("Login");
        } else if (response.status === 400) {
          // Invalid registration data
          setRegistrationMessage("Invalid registration data");
          Alert.alert("Error", "Invalid registration data");
        } 
        else if (response.status === 409) {
          // Invalid registration data
          setRegistrationMessage("Email already Rigestered");
          Alert.alert("Error", "Email already Rigestered");}
        else {
          // Other registration failure
          setRegistrationMessage("Registration failed");
          Alert.alert("Error", "Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require("../../assets/screens/register.png")}
        // source={{ uri: 'https://res.cloudinary.com/dyylqn8vb/image/upload/v1697792027/Screenshot_436_xh0de7.png' }} // Replace with your image URI
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          value={email}
          editable={false}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Constituency"
          value={constituency}
          onChangeText={(text) => setConstituency(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <MyButton
        title="Register"
        backgroundColor="rgb(255, 200, 0)"
        onPress={handleRegistration}
        disabled={
          !validateEmail(email) ||
          !fullName ||
          !constituency ||
          !password ||
          !confirmPassword
        }
      />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Text style={styles.message}>{registrationMessage}</Text>
    </KeyboardAvoidingView>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 0.06 * screenWidth,
    fontWeight: "bold",
    marginBottom: 0.01 * screenHeight,
    marginTop: 0.01 * screenHeight,
  },
  inputContainer: {
    width: 0.9 * screenWidth,
    marginVertical: 0.02 * screenHeight,
  },
  icon: {
    width: 1 * screenWidth,
    height: 0.4 * screenHeight,
  },
  inputField: {
    fontSize: 0.04 * screenWidth,
    textAlign: "center",
    padding: 5,
    marginBottom: 10,
    backgroundColor:'lightgray',
  },
  message: {
    marginTop: 0.03 * screenHeight,
    fontSize: 0.032 * screenWidth,
  },
});
