import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Entypo,Feather } from "@expo/vector-icons";
import { baseURL } from "../api/api";

const SearchResult = ({ data }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Video", { videoId: data._id });
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={{
              uri: `${baseURL}/uploads/${data.image}`,
            }}
            style={{
              width: "45%",
              height: 100,
              margin: 10,
              borderRadius: 5,
            }}
          />

          <View
            style={{
              marginTop: 10,
              flex: 1,
              marginRight: 3,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: colors.text,
              }}
              ellipsizeMode="tail"
              numberOfLines={3}
            >
              {data.name}
            </Text>

            <Text
              ellipsizeMode="tail"
              numberOfLines={3}
              style={{ color: colors.text }}
            >
              {data.description}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Feather name="eye" size={20} color={colors.text} />
              <Text style={{ color: colors.text, marginTop: 10 ,marginLeft:10}}>
                {data.views} Views
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
export default SearchResult;
