import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  TextInput,
  DefaultTheme,
  DarkTheme,
  HelperText,
} from "react-native-paper";
import { color } from "react-native-reanimated";
import { myTheme } from "../colors/theme";

const InputComponent = ({
  value,
  onChange,
  label,
  mode,
  keyboard,
  secure,
  visible,
  onBlur,
  multiline,
  onFocus,
  onEnd,
}) => {
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
        onFocus={onFocus}
        onEndEditing={onEnd}
        value={value}
        onChangeText={onChange}
        label={label}
        mode={mode}
        multiline={multiline}
        keyboardType={keyboard}
        secureTextEntry={isPassword()}
        style={{ marginVertical: 5 }}
      />
      {visible && (
        <HelperText type="error" visible={visible}>
          {label} is invalid
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
export default InputComponent;
