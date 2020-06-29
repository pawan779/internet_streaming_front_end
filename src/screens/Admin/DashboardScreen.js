import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import Header from "../../components/Header";
import CardDetails from "../../components/CardDetails";
import { Logout } from "../../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../store/actions/themeAction";

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const handleLogOut = () => {
    Alert.alert("Are you sure ?", "You have to login again", [
      { text: "No" },
      { text: "Yes", onPress: logOut },
    ]);
  };

  const logOut = () => {
    let action = Logout();
    dispatch(action);
  };

  const handleTheme = async () => {
    let action;
    action = changeTheme();
    try {
      await dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Header headerMode={false} />
      <CardDetails
        title="Theme"
        twoButton={true}
        dark={theme ? "dark" : "light"}
        icon="white-balance-sunny"
        onPress={handleTheme}
      />
      <CardDetails
        title="Movies"
        icon="movie"
        onPress={() => navigation.navigate("Movie")}
      />

      <CardDetails
        title="Genre"
        icon="movie"
        onPress={() => navigation.navigate("Genre")}
      />
      <CardDetails title="Users" icon="account" />

      <CardDetails
        title="LogOut"
        onPress={() => handleLogOut()}
        icon="logout"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default DashboardScreen;
