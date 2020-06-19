import React, { useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { getMovieById } from "../../store/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";

const VideoScreen = ({ route }) => {
  const videoId = route.params.videoId;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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
  return <View></View>;
};

const styles = StyleSheet.create({});
export default VideoScreen;
