import React from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import {} from "react-native-paper";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";

const MovieComponent = ({
  imodal,
  onIcancel,
  iValue,
  onIload,
  onInotLoad,
  vmodal,
  onVcancel,
  vValue,
  onVload,
  onVnotLoad,
  progress
}) => {
  return (
    <View>
      <Modal
        visible={imodal}
        animationType="slide"
        transparent={true}
        // onRequestClose={() => setModal(false)}
      >
        <ImageComponent
          onCancel={onIcancel}
          value={iValue}
          load={onIload}
          notLoad={onInotLoad}
        />
      </Modal>
      <Modal
        visible={vmodal}
        animationType="slide"
        transparent={true}
        // onRequestClose={() => setModal(false)}
      >
        <VideoComponent
          onCancel={onVcancel}
          value={vValue}
          load={onVload}
          progress={progress}
          notLoad={onVnotLoad}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});
export default MovieComponent;
