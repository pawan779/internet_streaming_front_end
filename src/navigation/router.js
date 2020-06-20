import React, { Fragment } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/User/HomeScreen";
import { useSelector } from "react-redux";
import AccountScreen from "../screens/User/AccountScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { customDarkTheme, customDefaultTheme } from "../colors/colors";
import SearchScreen from "../screens/User/SearchScreen";
import GenreScreen from "../screens/User/GenreScreen";
import VideoScreen from "../screens/User/VideoScreen";
import DashboardScreen from "../screens/Admin/DashboardScreen";
import MovieScreen from "../screens/Admin/MovieScreen";

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
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Account") {
            iconName = "account-circle";
          } else if (route.name === "Genres") {
            iconName = "movie-filter";
          }
          return <MaterialIcons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.secondaryIcon,
        inactiveTintColor: "#1e1e1e",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Genres" component={GenreScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const Router = () => {
  const { token, admin } = useSelector((state) => state.auth);
  return (
    <NavigationContainer theme={customDefaultTheme}>
      <Stack.Navigator headerMode="none">
        {token ? (
          <>
            {admin ? (
              <>
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Movie" component={MovieScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Root" component={RootHome} />
                <Stack.Screen name="Video" component={VideoScreen} />
              </>
            )}
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default Router;
