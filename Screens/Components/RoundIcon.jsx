import React from "react";
import { Pressable, View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function RoundIcon({ onPress, name, color, backgroundColor, borderColor, iconSize, disabled, style }) {
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
      <View style={styles.iconContainer}>
        <Ionicons name={name} size={iconSize} color={disabled ? "gray" : color} />
      </View>
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
  iconContainer: {
    // Center the icon in the circle
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

export default RoundIcon;

