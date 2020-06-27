import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import { getProfile } from "../../store/actions/authAction";
import Loading from "../../components/Loading";

const ProfileScreen = ({ navigation }) => {
  const [incomplete, setIncomplete] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { token, data } = useSelector((state) => state.auth);
  console.log(token, data);

  const dispatch = useDispatch();

  const handleCheck = () => {
    if (!data.name || !data.image|| !data.address || !data.phone) {
      setIncomplete("Please update your details. The user data is incomplete");
    }
  };

  const getProfileDetails = async () => {
    setIsLoading(true);
    let action;
    action = getProfile(token);
    try {
      await dispatch(action);
      handleCheck();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>
    );
  }
  return (
    <View>
      <Header back headerTitle="Profile" noImage />
      <Profile
        data={data}
        onPress={() => navigation.navigate("ProfileUpdate", { data: data })}
      />
      {incomplete ? (
        <Text style={{ color: "red", fontSize: 17 }}>{incomplete}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});
export default ProfileScreen;
