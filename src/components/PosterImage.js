import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { baseURL } from "../api/api";

export const PosterImage = ({ movie }) => {
  console.log(movie);
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
      <Text style={{ position: "absolute", bottom: 40 }}>{movie.name}</Text>
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
          marginHorizontal:10,
          marginVertical:20,
          borderRadius: 50,
          zIndex: -1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
