import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constant from "expo-constants";
import { useNavigation, useTheme } from "@react-navigation/native";


const SearchBar = ({ value, onChange, onSubmit }) => {
  const navigation = useNavigation();
const {colors}=useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      width: "100%",
      height: 100,
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          elevation: 4,
          height: 60,
          alignItems: "center",
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowColor: "#212121",
          shadowOpacity: 0.2,
          marginTop: Constant.statusBarHeight,
        }}
      >
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
        <TextInput
          value={value}
          placeholder="Search movie"
          placeholderTextColor="#d0d0d0"
          keyboardType="web-search"
          autoFocus={true}
          onChangeText={onChange}
          style={{
            flex: 1,
            fontSize: 18,
            color: "#fff",
            borderBottomWidth:.4,
            borderColor:"#d0d0d0",
            paddingBottom:5
          }}
          onEndEditing={onSubmit}
        />

        <MaterialIcons name="keyboard-voice" size={27} color="#fff" />
      </View>
    </View>
  );
};


export default SearchBar;
