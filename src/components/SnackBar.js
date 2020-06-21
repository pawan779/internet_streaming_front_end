import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Snackbar } from "react-native-paper";

const SnackBar = ({ message }) => {
    console.log(message)
  return (
    <View>
      <Snackbar visible={true}>{message}</Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({});
export default SnackBar;
