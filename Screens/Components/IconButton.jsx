import React from "react";
import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ onPress, name, color, title, backgroundColor, borderColor, iconSize,disabled, titleColor }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed ? "#CCCCCC" : disabled ? "lightgray" : backgroundColor }, // Change background color when pressed or disabled
        Platform.OS === "android" && pressed && styles.androidPressed,
        Platform.OS === "ios" && pressed && styles.iosPressed,
      ]}
      accessibilityLabel={title}
    >
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      <View style={styles.iconContainer}>
        <Ionicons name={name} size={iconSize} color={disabled ? "gray" : color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "white",
    // borderColor: "#000",
    marginBottom: 10,
   
  },
  iconContainer: {
    marginLeft: 10, // Add margin to create space between text and icon
  },
  title: {
    fontSize: 16,
    height:30,
    fontWeight:'bold'
  },
  androidPressed: {
    elevation: 1, // Add elevation for Android shadow effect
  },
  iosPressed: {
    shadowColor: "black", // Add shadow for iOS shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default IconButton;


/// Wahy to use
{/* <IconButton
  onPress={handleButtonPress}
  name="checkmark-circle"
  color="green"
  title="Next"
  backgroundColor="#007BFF"
  borderColor="white"
  iconSize={30}
  disabled={false}
  titleColor="white" // Specify the title text color
/> */}

    