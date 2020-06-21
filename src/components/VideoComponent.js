import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Axios from "axios";
import { VIDEOUPLOAD } from "../api/api";

const VideoComponent = ({ onCancel, value, load, notLoad, progress }) => {
  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("You need permision");
    }
  };

  const pickFromCamers = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("You need permision");
    }
  };

  const handelProgress = (event) => {
    progress(Math.round((event.loaded * 100) / event.total));
  };

  const handleUpload = (image) => {
    load();
    const xhr = new XMLHttpRequest();
    const fdata = new FormData();
    fdata.append("video", image);
    xhr.upload.addEventListener("progress", handelProgress);
    xhr.addEventListener("load", () => {
      progress(100);

      var data = xhr.responseText;
      var jasonresponse = JSON.parse(data);
      value(jasonresponse.filename);

      notLoad();
      onCancel();
    });

    xhr.open("POST", `${VIDEOUPLOAD}`);
    xhr.send(fdata);
  };

  return (
    <View style={styles.viewStyle}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button mode="contained" icon="camera" onPress={pickFromCamers}>
          Camera
        </Button>
        <Button mode="contained" icon="image-area" onPress={pickFromGallery}>
          Gallery
        </Button>
      </View>
      <Button mode="outlined" icon="cancel" onPress={onCancel}>
        Cancel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    position: "absolute",
    width: "100%",
    bottom: 10,
  },
});

export default VideoComponent;
