import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constant from "expo-constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../api/api";

export default Header = ({ headerMode, back, title, headerTitle }) => {
  const dispathch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const profile = useSelector((state) => state.auth.profile);
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        marginBottom: 15,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          marginTop: Constant.statusBarHeight,
          height: 60,
          flexDirection: "row",
          justifyContent: "space-between",
          elevation: 4,
          padding: 5,
          alignItems: "center",

          // for ios shadow
          shadowOffset: { width: 1, height: 1 },
          shadowColor: "#212121",
          shadowOpacity: 0.2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 5,
            flex: 1,
          }}
        >
          {back ? (
            <Ionicons
              name="md-arrow-back"
              size={27}
              color="#fff"
              style={{
                marginHorizontal: 10,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ) : null}

          <Image
            source={require("../../assets/icon.png")}
            style={{
              marginLeft: 15,
              height: 50,
              width: 50,
            }}
          />
          <Text
            style={{
              fontSize: 22,
              marginLeft: 7,
              color: colors.icon,
              fontWeight: "bold",
            }}
          >
            {title ? title : <Text>{headerTitle || "MovieFlix"}</Text>}
          </Text>
        </View>
        {headerMode ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 100,
            }}
          >
            <Ionicons
              name="md-search"
              size={30}
              color="#e4e4e4"
              onPress={() => {
                navigation.navigate("Search");
              }}
            />
            {profile.image ? (
              <Image
                source={{ uri: `${baseUrl}/uploads/${profile.image}` }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            ) : (
              <MaterialIcons name="account-circle" size={30} color="#e4e4e4" />
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
