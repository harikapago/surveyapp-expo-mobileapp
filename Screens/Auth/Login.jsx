import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert, // Import Alert from react-native
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import MyButton from "../Components/MyButton";

// Get the screen dimensions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function SignIn({ navigation }) {
  const [message, setMessage] = useState("");
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
// const email=formData.email
const{email}=formData
const{password}=formData
  const handleInputChange = (name, value) => {

    setFormData({ ...formData, [name]: value });

  };

  useEffect(() => {
    // Fetch agent data from an API when the component mounts
    fetch("https://express-mongodb-survey-postapi.azurewebsites.net/agents")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setAgents(data);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }, []);

  const validateEmail = (email) => {
    // Simple email validation using a regular expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const verifyAgent = () => {
    // if (!validateEmail(email)) {
    //   Alert.alert("Error", "Invalid email format. Please enter a valid email address.");
    //   return;
    // }

    // Replace the following logic with your agent verification logic.
    // You can make a network request to verify the agent's credentials.

    fetch("https://express-mongodb-survey-postapi.azurewebsites.net/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          // Login successful
          setMessage("Login successful");
        //   Alert.alert("Success", "Login successful");
          const filtered = agents.filter((agent) => agent.email === formData.email);
          if (filtered.length > 0) {
            const agentId = filtered[0].agentId;
            console.log(agentId);
            // Navigate to the 'Survey' screen with the agentId parameter
            navigation.navigate("Welcome",{ agentId });
            // navigation.navigate("welcome", { agentId });
          }
        } else if (response.status === 401) {
          // Invalid email or password
          setMessage("Invalid email or password");
          Alert.alert("Error", "Invalid email or password");
        } else {
          // Other login failure
          setMessage("Login failed");
          Alert.alert("Error", "Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Error occurred during login");
        Alert.alert("Error", "Error occurred during login");
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require("../../assets/screens/login.png")}
        //    source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/login-page-2578971-2147152.png?f=webp' }} // Replace with your image URI
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.title}>LogIn</Text>

      <View style={styles.inputContainer}>
        <View style={styles.emailInput}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Email Address"
            placeholderTextColor="gray"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
          />
        </View>
        {/* Add Password Input Below Email Input */}
        <View style={styles.passwordInput}>
          {/* <Text style={styles.label}>Password</Text> */}
          <TextInput
            style={styles.inputField}
            placeholder="Enter Password"
            placeholderTextColor="gray"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            // onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
      </View>

      {/* Add Login Button */}
      <MyButton
        title="Login"
        backgroundColor="rgb(255, 200, 0)"
        onPress={verifyAgent}
        disabled={!validateEmail(email) || !password}
      />
      <Text style={styles.message}>{message}</Text>
<Text  style={styles.registerLable}>
    Please do Register before trying to Login
</Text>

      {/* Add button for New User Registration */}
      <Button
        title="New User Registration"
        onPress={() => navigation.navigate("SignIn")}
      />

    </KeyboardAvoidingView>
  );
}

export default SignIn;

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
  emailInput: {
    backgroundColor: "lightgray",
    borderLeftWidth: 3,
    borderLeftColor: "blue",
  },
  passwordInput: {
    backgroundColor: "lightgray",
    marginTop: 10,
  },
  label: {
    fontSize: 0.04 * screenWidth,
  },
  inputField: {
    fontSize: 0.04 * screenWidth,
    textAlign: "center",
    padding: 5,
  },
  registerLable:{
    margin:5,
    fontSize:0.03 * screenWidth,
  },
  message: {
    // marginTop: 0.03 * screenHeight,
    fontSize: 0.032 * screenWidth,
  },
});
