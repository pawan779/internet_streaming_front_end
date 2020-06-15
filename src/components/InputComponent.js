import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, DefaultTheme, DarkTheme, HelperText } from "react-native-paper";
import { color } from "react-native-reanimated";
import { myTheme } from "../colors/theme";

const InputComponent = ({ value, onChange, label, mode, keyboard, secure,visible,onBlur }) => {
  const isPassword = () => {
    if (secure) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <View>
      <TextInput
      onBlur={onBlur}
        value={value}
        onChangeText={onChange}
        label={label}
        mode={mode}
        keyboardType={keyboard}
        secureTextEntry={isPassword()}
        style={{marginVertical:5}}
      />
      <HelperText type="error" visible={visible}>{label} is invalid</HelperText>
    </View>
  );
};

const styles = StyleSheet.create({});
export default InputComponent;
