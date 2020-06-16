import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/User/HomeScreen";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const Router = () => {
  const { token, admin } = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {token ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default Router;
