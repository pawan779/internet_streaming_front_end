import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { token, admin } = useSelector((state) => state.auth);
  return (
    <View>
      <Text>Welcome to Home Page {token}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
