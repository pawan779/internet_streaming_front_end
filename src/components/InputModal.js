import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";

const InputModal = ({ onClose, value, onChange, onPress, error, title }) => {
  return (
    <View style={styles.viewStyle}>
      <TextInput
        label="Add Genre"
        value={value}
        onChangeText={onChange}
      />
      {error ? (
        <HelperText type="error" visible={error}>
          {error}
        </HelperText>
      ) : null}
      <Button mode="contained" style={{ margin: 10 }} onPress={onPress}>
        {title}
      </Button>
      <Button onPress={onClose} mode="outlined">
        Cancel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    position: "absolute",
    width: "80%",
    top: Dimensions.get("window").height * 0.25,
    justifyContent: "center",
    marginLeft: "10%",
    height: Dimensions.get("window").height * 0.3,
    padding: 20,
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
  },
});
export default InputModal;
