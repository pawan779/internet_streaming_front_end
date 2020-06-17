import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/User/HomeScreen";
import { useSelector } from "react-redux";
import CategoryScreen from "../screens/User/CategoryScreen";
import AccountScreen from "../screens/User/AccountScreen";
import {MaterialIcons} from '@expo/vector-icons'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootHome = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Account") {
            iconName = "account-circle";
          } else if (route.name === "Category") {
            iconName = "subscriptions";
          }
          return <MaterialIcons name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.secondaryIcon,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const Router = () => {
  const { token, admin } = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {token ? (
          <Stack.Screen name="Root" component={RootHome}/>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default Router;
