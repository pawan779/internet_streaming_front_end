import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { getProfile } from "../../store/actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "../../components/Header";
import Profile from "../../components/Profile";

const ProfileScreen = () => {
  const [incomplete, setIncomplete] = useState(true);

  const { token, data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const getDetails = async () => {
    let action;
    action = getProfile(token);
    try {
      await dispatch(action);
      handleCheck();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = () => {
    if (!data.name || !data.image || !data.address || !data.phone) {
      setIncomplete("Please update your details. The user data is incomplete");
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <View>
      <Header back headerTitle="Profile" noImage />
      <Profile data={data} />
      {incomplete ? (
        <Text style={{ color: "red", fontSize: 17 }}>{incomplete}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});
export default ProfileScreen;
