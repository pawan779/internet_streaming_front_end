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
          width: "100%",
          position: "absolute",
          bottom: 40,
          backgroundColor: "#e4e4e4",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text>{movie.name}</Text>
        <Button icon="play" mode="contained" style={{ width: 100 }}>
          Play
        </Button>
      </View>
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
      onPress={() => navigation.navigate("Video", { videoId: movie._id })}
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
