import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Auth from "./src/screens/auth";
import Router from "./src/navigation/router";
import { DefaultTheme, Provider as PaperProvider, DarkTheme } from 'react-native-paper';
import { myTheme, myDefaultTheme, myDarkTheme } from "./src/colors/theme";

export default function App() {
  return (
    <View style={styles.container}>
    <PaperProvider theme={myDefaultTheme}>
      <Router />
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
