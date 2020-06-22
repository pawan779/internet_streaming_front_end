import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Button, DefaultTheme } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

const GenreComponent = ({ data, onPress, icon }) => {
  const { colors } = useTheme();
  return (
    <View>
      <Button
        uppercase={false}
        style={{
          fontSize: 18,
        }}
        icon={icon}
        color={colors.text}
        onPress={onPress}
      >
        {data.name}
      </Button>
    </View>
  );
};

export default GenreComponent;
