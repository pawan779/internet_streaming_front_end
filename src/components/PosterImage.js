import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { baseURL } from "../api/api";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-elements";

export const PosterImage = ({ movie }) => {
  console.log(movie.genre)
  return (
    <View>
      <Image
        source={{ uri: `${baseURL}/uploads/${movie.image}` }}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height * 0.6,
          zIndex: -1,
        }}
        resizeMode="stretch"
      />
      <View
        style={{
          position: "absolute",
          bottom: 40,
          padding: 10,
          zIndex: 1,
          alignSelf: "center",
        }}
      >
        <Text>{movie.name}</Text>
        <Button icon="play" mode="contained" style={{ width: 100 }}>
          Play
        </Button>
      </View>

      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 30,
          height: 100,
          backgroundColor: "#000",
          opacity: 0.5,
        }}
      ></View>
    </View>
  );
};

export const Preview = ({ movie }) => {
  return (
    <View>
      <Image
        source={{ uri: `${baseURL}/uploads/${movie.image}` }}
        style={{
          width: 100,
          height: 100,
          marginHorizontal: 7,
          borderRadius: 50,
        }}
      />
    </View>
  );
};

export const Trending = ({ movie }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Video", { item: movie })}
    >
      <Image
        source={{ uri: `${baseURL}/uploads/${movie.image}` }}
        style={{
          width: 100,
          height: 150,
          marginHorizontal: 10,
          borderRadius: 3,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
