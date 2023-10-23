import React, { useState, useEffect,useRef } from "react";
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
import IconButton from "../Components/IconButton";
import MyButton from "../Components/MyButton";

// Get the screen dimensions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
//   const [otp, setOTP] = useState("");
const [otp, setOTP] = useState(['', '', '', '', '']);
  const [message, setMessage] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [isSendOTPDisabled, setIsSendOTPDisabled] = useState(false);
  const [sendOTPTimer, setSendOTPTimer] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const otpInputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const focusNextField = (index) => {
    if (index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const generateRandomNumber = () => {
    let result = "";
    for (let i = 0; i < 5; i++) {
      const digit = Math.floor(Math.random() * 10);
      result += digit;
    }
    return result;
  };

  const validateEmail = (email) => {
    // Simple email validation using a regular expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendOTP = async () => {
    if (!validateEmail(email)) {
      Alert.alert(
        "Error",
        "Invalid email format. Please enter a valid email address."
      );
      return;
    }

    const newOTP = generateRandomNumber(); // Generate a new OTP
    console.log(newOTP);
    setGeneratedOTP(newOTP); // Store it in a state variable
    setIsSendOTPDisabled(true);
    setAttempts(0);

    // Set a timer to enable the "Send OTP" button after one minute
    const timer = setTimeout(() => {
      setIsSendOTPDisabled(false);
    }, 30000); // 60,000 milliseconds = 1 minute
    setSendOTPTimer(timer);

    try {
      // to make network requests.
      const response = await fetch(
        "https://surveyappemailotp.azurewebsites.net/send-email",
        // "https://emailotpdp.onrender.com/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailid: email, otpnumber: newOTP }), // Use the newly generated OTP
        }
      );

      if (response.ok) {
        setMessage("OTP sent successfully to your email.");
        Alert.alert("Success", "OTP sent successfully to your email.");
      } else {
        const data = await response.json();
        setMessage(data.message || "Error sending OTP");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error sending OTP");
    }
  };

// const TempEmail="1mohsinTemaEmail@gmail.com"
    const checkOTP = () => {
        const enteredOTP = otp.join('');
      // navigation.navigate("Welcome",{TempEmail});
      if (enteredOTP === generatedOTP) {
        // Compare with the stored OTP

        setMessage('OTP matches. Navigating to the Register screen...');
        // navigation.navigate('Welcome',{email});
        setOTP("")
        setGeneratedOTP("SecuRinG")
        Alert.alert(
          "Success",
          "OTP matches. Navigating to the Register screen...",
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate to the "Welcome" screen
                navigation.navigate("Register", { email });
              },
            },
          ]
        );
      } else {
        Alert.alert("Error", "OTP does not match. Please Genearte a new OTP and continue.");
        setOTP("")
        setGeneratedOTP("SecuRinG")
        setMessage('OTP does not match. Please Genearte a new OTP and continue.');
      }
    };

  useEffect(() => {
    return () => {
      // Clear the timer when the component unmounts to prevent memory leaks
      if (sendOTPTimer) {
        clearTimeout(sendOTPTimer);
      }
    };
  }, []);

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
  >
    <Image
      source={require("../../assets/screens/image04.png")}
      style={styles.icon}
      resizeMode="cover"
    />
     <Text style={styles.title}>Sign In</Text>
    {/* <View style={styles.backgroundContainer}>
      <Image
        source={require("../../assets/screens/image04.png")}
        style={styles.backgroundImage}
        resizeMode="contain"
      />
      <View style={styles.overlayContainer}>
        <Image
          source={require("../../assets/screens/icon01.png")}
          style={styles.icon01}
          resizeMode="contain"
        />
      
      </View>
    </View> */}
     
    <View style={styles.inputContainer}>
      <View style={styles.emailInput}>
        <TextInput
          style={styles.emailInputField}
          placeholder="Enter Email Address"
          placeholderTextColor="gray"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <Button
        title={isSendOTPDisabled ? "Re-send OTP" : "Send OTP"}
        onPress={sendOTP}
        disabled={!validateEmail(email) || isSendOTPDisabled}
      />
     
    </View>
        <Image
          source={require("../../assets/screens/icon02.png")} // Replace with the correct path to your icon02 image
          style={styles.icon02}
          resizeMode="contain"
        />
    <Text style={styles.title}>Verification</Text>
    <Text style={styles.subHeading}>Please enter the OTP Code</Text>
    <View style={styles.otpContainer}>
      {otpInputRefs.map((inputRef, index) => (
        <TextInput
          key={index}
          ref={inputRef}
          style={styles.otpInput}
          maxLength={1}
          placeholder="0"
          placeholderTextColor="darkgray"
          value={otp[index]}
          onChangeText={(text) => {
            let newOTP = [...otp];
            newOTP[index] = text;
            setOTP(newOTP);
            // setOTP((prev) => {
            //   let newOTP = [...prev];
            //   newOTP[index] = text;
            //   return newOTP;
            // });

            if (text && index < otpInputRefs.length - 1) {
              focusNextField(index);
            }
          }}
          keyboardType="numeric"
        />
      ))}
  
 
  </View>
    <MyButton
      title="Submit OTP"
      backgroundColor='rgb(255, 200, 0)'
      onPress={checkOTP}
      disabled={otp.length !== 5}
    />
    <Text style={styles.message}>{message}</Text>
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
    // title: {
    //   fontSize: 20,
    //   fontWeight: "bold",
    title: {
      fontSize: 0.06 * screenWidth,
      fontWeight: "bold",
      marginBottom: 0.01 * screenHeight,
      marginTop: 0.01 * screenHeight,
    },
    subHeading: {
      fontSize: 0.04 * screenWidth,
      color: "gray",
      marginBottom: 0.02 * screenHeight,
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: 0.9 * screenWidth,
      justifyContent: "space-between",
      marginVertical: 0.02 * screenHeight,
      // marginBottom: 0.05 * screenHeight,
    },
    icon: {
      width: 1 * screenWidth,
      height: 0.4 * screenHeight,
    },
    icon02: {
      width: 50,
      height: 50,
    },
    emailInput: {
      flexDirection: "row",
      alignItems: "center",
    //   borderBottomWidth: 1,
    //   borderBottomColor: "black", // Remove this line to remove the bottom border
      backgroundColor: "lightgray",
      borderLeftWidth: 3,
      borderLeftColor: "blue",
      width:0.7* screenWidth,
    },
    emailInputField: {
      flex: 1,
      fontSize: 0.04 * screenWidth,
      textAlign: "center",
   padding:5,
    },
    otpContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 0.02 * screenHeight,
    },
    otpInput: {
      width: 40,
      height: 40,
      backgroundColor: "lightgray",
      color: "black",
      fontSize: 0.04 * screenWidth,
      textAlign: "center",
      marginRight: 10,
    },
    message: {
      marginTop: 0.03 * screenHeight,
      fontSize: 0.032 * screenWidth,
    },
    backgroundContainer: {
      flex: 1,
      width: "100%",
      // height: "100%",
      height: 0.4 * screenHeight,
    },
    backgroundImage: {
      flex: 1,
      width: 1 * screenWidth,
        height: 0.5* screenHeight,
      position: "absolute",
    },
    overlayContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    icon01: {
      width: 150,
      height: 150,
    },
  });