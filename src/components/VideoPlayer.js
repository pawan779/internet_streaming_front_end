import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Video } from "expo-av";
import { useTheme } from "@react-navigation/native";
import { baseURL } from "../api/api";

const VideoPlayer = ({ videoId }) => {
  const { colors } = useTheme();
  return (
    <View>
      <Video
        source={{ uri: `${baseURL}/uploads/${videoId}` }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay
        progressUpdateIntervalMillis={1000}
        useNativeControls
        style={{
          width: "100%",
          height: 300,
          borderBottomColor: colors.border,
          borderBottomWidth: 0.3,
        }}
      />
    </View>
  );
};

export default VideoPlayer;
