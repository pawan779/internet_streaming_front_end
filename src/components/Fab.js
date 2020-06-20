import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FAB } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

const Fab = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <FAB icon="plus" color={colors.secondary} theme />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
});
export default Fab;
