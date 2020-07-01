import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import { Text } from "react-native-paper";
import Header from "../../components/Header";
import { getAllUsers } from "../../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserDetails from "../../components/UserDetails";
import { useTheme } from "@react-navigation/native";
import Loading from "../../components/Loading";

const UserScreen = () => {
  const dispatch = useDispatch();
  const { users, token } = useSelector((state) => state.auth);
  const { colors } = useTheme();
  const [isLoading, setLoading] = useState(true);

  const getUser = async () => {
    setLoading(true);
    let action;
    action = getAllUsers(token);
    try {
      await dispatch(action);
      setLoading(false);
    } catch (err) {
      Alert.alert("Something went wrong!!");
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header back noImage headerTitle="Users" />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getUser}
            title="Pull to refresh"
            tintColor={colors.text}
            titleColor={colors.text}
          />
        }
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
