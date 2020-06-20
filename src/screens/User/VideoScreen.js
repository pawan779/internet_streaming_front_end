import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import { getMovieById } from "../../store/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "../../components/VideoPlayer";
import Loading from "../../components/Loading";

const VideoScreen = ({ route }) => {
  const videoId = route.params.videoId;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { movie } = useSelector((state) => state.movies);
  console.log(movie);
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
    <View style={styles.container}>
      {movie.data ? <VideoPlayer videoId={movie.data.video} /> : <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default VideoScreen;
