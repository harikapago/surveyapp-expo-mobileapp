import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Footer() {
  return (
    <View style={styles.footerContainer}>
      
      <Text style={styles.footerText}>© Copyright 2023, All Rights Reserved | PagoAnalytics.</Text>
      {/* <Text style={styles.footerText}>Your feedback matters to us.</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    // backgroundColor: "lightgray",
    padding: 5,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    fontWeight: "400",
  },
});

export default Footer;
