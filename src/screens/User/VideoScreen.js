import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import { getMovieById } from "../../store/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "../../components/VideoPlayer";

const VideoScreen = ({ route }) => {
  const videoId = route.params.videoId;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { movie } = useSelector((state) => state.movies);
  const getVideo = async () => {
    let action;
    action = getMovieById(token, videoId);
    try {
      await dispatch(action);
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);
  return (
    <View>
      <VideoPlayer videoId={movie.data.video} />
    </View>
  );
};

const styles = StyleSheet.create({});
export default VideoScreen;
