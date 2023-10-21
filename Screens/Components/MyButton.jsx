import React from "react";
import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function MyButton({ onPress, name, color, title, backgroundColor, borderColor, iconSize, disabled, borderRadius }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed
            ? "#CCCCCC"
            : disabled
            ? "lightgray"
            : backgroundColor,
          borderRadius: borderRadius || 10, // Use the provided borderRadius prop or default to 10
        },
        Platform.OS === "android" && pressed && styles.androidPressed,
        Platform.OS === "ios" && pressed && styles.iosPressed,
      ]}
      accessibilityLabel={title}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    marginBottom: 10,
    // backgroundColor:'yellow'
  },
  iconContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    color:"white",
    padding:5,
    // backgroundColor:'rgb(255, 200, 0)'
  },
  androidPressed: {
    elevation: 1,
  },
  iosPressed: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default MyButton;


{/* <MyButton
  title="My Button"
  backgroundColor="blue"
  borderRadius={20} // Customize border radius
  onPress={handleButtonPress}
/> */}