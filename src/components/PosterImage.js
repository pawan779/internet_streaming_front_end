import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { baseURL } from "../api/api";
import { useNavigation } from "@react-navigation/native";

export const PosterImage = ({ movie }) => {
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
          marginHorizontal: 10,
          marginVertical: 20,
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
      onPress={(() => navigation.navigate("Video", { videoId: movie._id }))}
    >
      <Image
        source={{ uri: `${baseURL}/uploads/${movie.image}` }}
        style={{
          width: 100,
          height: 150,
          marginHorizontal: 10,
          marginVertical: 20,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
