import React from "react";
import { Pressable, View, Text, StyleSheet, Platform } from "react-native";

function RoundTextButton({ onPress, text, color, backgroundColor, borderColor, iconSize, disabled, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        style, // Apply the custom style prop
        { backgroundColor: pressed ? "#CCCCCC" : disabled ? "lightgray" : backgroundColor },
        Platform.OS === "android" && pressed && styles.androidPressed,
        Platform.OS === "ios" && pressed && styles.iosPressed,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 10,
  },
  text: {
    // Style for the button text
  },
  androidPressed: {
    elevation: 5,
  },
  iosPressed: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default RoundTextButton;


{/* <RoundIcon
  text="SUBMIT" // Text to be displayed in place of an icon
  color="white" // Text color
  backgroundColor="#007BFF" // Button background color
  onPress={submitFunction} // Your submit function
  disabled={false} // Button state
/> */}