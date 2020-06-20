import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import Header from "../../components/Header";
import CardDetails from "../../components/CardDetails";
import { Logout } from "../../store/actions/authAction";
import { useDispatch } from "react-redux";

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    let action;
    action = Logout();
    dispatch(action);
  };

  return (
    <View style={styles.container}>
      <Header headerMode={false} />
      <CardDetails
        title="Movies"
        icon="movie"
        onPress={() => navigation.navigate("Movie")}
      />
      <CardDetails title="Users" icon="" />
      <CardDetails
        title="Genre"
        icon="movie"
        onPress={() => navigation.navigate("Genre")}
      />
      <CardDetails title="LogOut" onPress={() => handleLogout()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default DashboardScreen;
