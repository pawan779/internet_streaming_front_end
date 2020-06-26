import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import CardDetails from "../../components/CardDetails";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../store/actions/authAction";
import { changeTheme } from "../../store/actions/themeAction";

const AccountScreen = () => {
  const dispatch = useDispatch();
  const theme=useSelector(state=>state.theme)

  const handelLogOut = () => {
    Alert.alert("Are you sure ?", "You have to login again", [
      { text: "No", onPress: () => console.log("false") },
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
    <View>
      <Header headerTitle="Account" />
      <CardDetails
        title="Theme"
        twoButton={true}
        dark={theme?"dark":"light"}
        icon="white-balance-sunny"
        onPress={handleTheme}
      />
      <CardDetails
        title="Profile"
        icon="account"
        // press={() => navigation.navigate("Profile")}
      />
      <CardDetails title="Logout" icon="logout" onPress={handelLogOut} />
    </View>
  );
};

const styles = StyleSheet.create({});
export default AccountScreen;
