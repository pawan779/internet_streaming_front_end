import React from "react";
import { StyleSheet, View, Alert, FlatList } from "react-native";
import { Text } from "react-native-paper";
import Header from "../../components/Header";
import { getAllUsers } from "../../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserDetails from "../../components/UserDetails";

const UserScreen = () => {
  const dispatch = useDispatch();
  const { users, token } = useSelector((state) => state.auth);
  const getUser = async () => {
    let action;
    action = getAllUsers(token);
    try {
      await dispatch(action);
    } catch (err) {
      Alert.alert("Something went wrong!!");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      <Header back noImage headerTitle="Users" />
      <FlatList
        data={users}
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return <UserDetails data={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default UserScreen;
