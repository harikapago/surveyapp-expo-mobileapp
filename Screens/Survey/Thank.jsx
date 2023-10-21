import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import MyButton from "../Components/MyButton";

const Thank = ({ navigation,route }) => {
  const { agentId } = route.params;
  return (
    <View style={styles.container}>
        <Image
        source={require("../../assets/screens/image06.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/screens/thank002.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>THANKYOU!</Text>
      <Text style={styles.subtitle}>You have Succefully completed the Survey. </Text>
      <Text style={styles.subtitle}>Thank You for participating</Text>
      {/* <Text style={styles.subtitle}>Your feedback is valuable to us.</Text> */}
      <View style={styles.line}></View>
      {/* <Button
        title="Go to Main Page"
        onPress={() => navigation.navigate("Welcome")}
        style={styles.buttonStyle}
      /> */}
      <MyButton
      title="Go to Main Screen"
      borderRadius={22}
      color="white"
      backgroundColor='rgb(255, 200, 0)'
      borderColor="white"
      onPress={() => navigation.navigate("Welcome",{agentId})}
      style={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor:'white'
  },
  image: {
    width: 225,
    height: 130 ,
    // marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  line: {
    width: "90%", // Set the width of the line
    borderBottomWidth: 2, // Border width
    borderBottomColor: "gray", // Border color
    marginBottom: 40, // Adjust the margin as needed
  },
  buttonStyle:{
    marginTop:20,
  }
});

export default Thank;
