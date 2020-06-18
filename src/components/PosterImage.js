import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { baseURL } from "../api/api";

const PosterImage = ({ movie }) => {
    console.log(movie)
  return (
    <View>
      <Image
        source={{ uri: `${baseURL}/uploads/${movie}` }}
        style={{ height: 300, width: 300,zIndex:-1 }}
      />
      <Text>{movie}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default PosterImage;
