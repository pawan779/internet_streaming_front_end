import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "react-native-elements";
import { Title, Button } from "react-native-paper";
import CardDetails from "./CardDetails";
import Loading from "./Loading";
import { baseUrl, UPLOAD } from "../api/api";
import { useSelector } from "react-redux";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Profile = ({ data, onPress }) => {
  const { colors } = useTheme();

  return (
    <View>
      {data.image ? (
        <Image
          source={{ uri: `${UPLOAD}/${data.image}` }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            marginTop: 50,
            alignSelf: "center",
          }}
        />
      ) : (
        <MaterialIcons
          name="account-circle"
          size={100}
          color={colors.text}
          style={{ alignSelf: "center", marginTop: 75 }}
        />
      )}

      {data.name && <CardDetails title="Full Name:" value={data.name} />}
      {data.address && <CardDetails title="Address:" value={data.address} />}
      {data.phone && <CardDetails title="Phone:" value={data.phone} />}
      {data.email && <CardDetails title="Email:" value={data.email} />}

      <Button mode="contained" onPress={onPress}>
        Update
      </Button>

      {/* <LinearGradient colors={["#ff0000", "#ff8000"]} style={{ height: 200 }} /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
export default Profile;
