import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Auth from "./src/screens/auth";
import Router from "./src/navigation/router";

export default function App() {
  return (
    <View style={styles.container}>
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
