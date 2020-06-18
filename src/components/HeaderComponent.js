import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import Constant from "expo-constants";

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image
          source={require("../../assets/icon.png")}
          style={{ height: 60, width: 70 }}
        />
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "#000",
          height: 60,
          position: "absolute",
          opacity: 0.1,
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    zIndex:1
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
});

export default HeaderComponent;
