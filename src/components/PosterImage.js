import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { baseURL } from "../api/api";
import { useNavigation, useTheme } from "@react-navigation/native";
import { color } from "react-native-reanimated";
import { colors } from "react-native-elements";

export const PosterImage = ({ movie }) => {
  const navigation = useNavigation();
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
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            margin: 10,
            alignSelf: "center",
          }}
        >
          {movie.name}
        </Text>
        <Button
          icon="play"
          mode="contained"
          style={{ width: 100, alignSelf: "center" }}
          onPress={() => navigation.navigate("Video", { item: movie })}
        >
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

export const Genre = ({ genre }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <Card
      style={{
        borderRadius: 10,
        padding: 10,
        borderWidth: 0.5,
        margin: 5,
        borderColor: colors.text,
      }}
      onPress={() => navigation.navigate("GenreVideo", { genreId: genre._id })}
    >
      <Text style={{ fontSize: 17 }}>{genre.name}</Text>
    </Card>
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

export const Latest = ({ movie }) => {
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
