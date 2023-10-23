
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import IconButton from "../Components/IconButton";
import MyButton from "../Components/MyButton";

function Welcome({ route, navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const { agentId } = route.params;
  // const email = "myDemoEmail@gmail.com"

  async function verifyPermission() {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const PermissionResponse = await requestPermission();
      return PermissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location Permission to use this app"
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    const { coords } = location;
    if (coords) {
      const { latitude, longitude } = coords;
      setUserLocation({ latitude, longitude });
      console.log({ latitude, longitude });
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/screens/image05.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>to the Survey App</Text>
      {/* <View style={styles.languageSection}>
        <View >
          <Text style={styles.languageHeading}>Select a Language </Text>
          <Text style={styles.languageHeading}>ఒక భాషను ఎంచుకోండి </Text>
        </View>
       
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Telugu" value="Telugu" />
        </Picker>
      
      </View> */}
      <View style={styles.languageSection}>
  <View style={styles.labelContainer}>
    {/* <Text style={styles.languageHeading}>Select a Language</Text>
    <Text style={styles.languageSubHeading}>ఒక భాషను ఎంచుకోండి</Text> */}
    <Text style={styles.languageHeading}>Select a Language / ఒక భాషను ఎంచుకోండి</Text>
    {/* <Text style={styles.languageSubHeading}>ఒక భాషను ఎంచుకోండి</Text> */}
  </View>

  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="ENGLISH" value="English" />
      <Picker.Item label="TELUGU" value="Telugu" />
    </Picker>
  </View>
</View>
      {/* {userLocation && (
        <Text style={styles.locationText}>
          User's Location: Latitude: {userLocation.latitude}, Longitude:{" "}
          {userLocation.longitude}
        </Text>
      )} */}
      {/* <Button title="My Location" onPress={getLocationHandler} /> */}
      {/* <Text style={styles.subtitle}>Your feedback matters to us.</Text> */}
      {/* <Button
        title="Start Survey"
        onPress={() => navigation.navigate("Question", { selectedLanguage })}
      /> */}
      <MyButton
      title="START SURVEY"
       borderRadius={22}
      color="white"
      backgroundColor='rgb(255, 200, 0)'
      borderColor="white"
      onPress={() => navigation.navigate("Survey", { selectedLanguage,agentId })}
      />
      <View style={styles.buttonLine}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 350,
    height: 250,
  },
  title: {
    fontSize: 30,
    // fontWeight: "bold",
    fontWeight: '600',
    textAlign: "center",
    // marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: '400',
  },
  // languageSection: {
  //   marginBottom: 20,
  //   flexDirection: "row",
  //   // justifyContent: "center",
  //   alignItems: "center",
  // },
  pickerContainer: {
    borderColor: "gray", // Border color for the container
    borderWidth: 1, // Border width for the container
    padding: 10, // Padding for the container
    // marginBottom:50,
  },
  // languageHeading: {
  //   fontSize: 18,
  //   marginBottom: 10,
  //   color: "#333",
  //   marginRight: 10,
  // },
  // picker: {
  //   flex: 1,
  //   backgroundColor: "#FFF",
  // },
  labelContainer: {
    marginBottom: 10,
  },
  languageHeading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  languageSubHeading: {
    fontSize: 14,
    color: "gray",
  },
  pickerContainer: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: "100%",
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonLine: {
    width: 100, // Adjust the width of the line
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
    marginBottom: 20, // Adjust the margin as needed
    marginTop: 20, // Adjust the margin as needed
  },

});

export default Welcome;
