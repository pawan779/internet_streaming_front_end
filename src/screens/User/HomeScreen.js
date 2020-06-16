import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../store/actions/authAction";

const HomeScreen = () => {
  const { token, admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    let action;
    action = Logout();
    dispatch(action);
  };
  return (
    <View>
      <Text>Welcome to Home Page {token}</Text>
      <Button onPress={() => handleLogout()}>Logout</Button>
    </View>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
