import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { UPLOAD } from "../api/api";

const UserDetails = ({ data }) => {
  const { colors } = useTheme();
  return (
    <View >
      <Card
        style={{
          width: "100%",
          height: 150,
          padding: 20,
          borderBottomWidth: 0.8,
          borderColor: colors.text,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            {data.image ? (
              <Image
                source={{ uri: `${UPLOAD}/${data.image}` }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  alignSelf: "center",
                }}
              />
            ) : (
              <MaterialIcons
                name="account-circle"
                size={100}
                color={colors.text}
                style={{ alignSelf: "center" }}
              />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text>Name:{data.name}</Text>
            <Text>Email:{data.email}</Text>
            <Text>Address:{data.address}</Text>
            <Text>Phone:{data.phone}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});
export default UserDetails;
