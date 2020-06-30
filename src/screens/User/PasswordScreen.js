import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import Header from "../../components/Header";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useState } from "react";
import { errorTheme } from "../../colors/theme";

const PasswordScreen = () => {
  const [oldPwd, setOldPwd] = useState();
  const [newPwd, setNewPwd] = useState();
  const [cPwd, setCpwd] = useState();
  const [oPasswordError, setoPasswordError] = useState();
  const [isOpasswordError, setisOpasswordError] = useState(true);
  const [passwordError, setPasswordError] = useState();
  const [isPasswordError, setisPasswordError] = useState(true);
  const [cPasswordError, setcpasswordError] = useState();
  const [isCpasswordError, setiscPasswordError] = useState(true);

  const currentPasswordValidation = () => {
    if (!oldPwd) {
      return setoPasswordError("Password cannot be empty");
    }
    setoPasswordError("");
    setisOpasswordError(false);
  };

  const passswordValidation = (text) => {
    const rgx = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    const pwdvalid = rgx.test(text);
    if (!pwdvalid) {
      setPasswordError(
        "Weak Password" +
          "\n" +
          "atleast Two uppercase letter" +
          "\n" +
          "atleast one special character !@#$&*" +
          "\n" +
          "at least Two number form 0-9" +
          "\n" +
          "at least 8 character"
      );
      setisPasswordError(true);
    } else {
      setPasswordError("");
      setisPasswordError(false);
    }
    setNewPwd(text);
  };
  const confirmPasswordValidation = () => {
    if (newPwd !== cPwd) {
      setcpasswordError("Password donot match");
      setiscPasswordError(true);
    } else {
      setcpasswordError("");
      setiscPasswordError(false);
    }
  };

  const handleChangePassword = () => {};

  return (
    <View style={styles.container}>
      <Header back noImage headerTitle="Change Password" />
      <View style={{ padding: 20 }}>
        <TextInput
          onBlur={currentPasswordValidation}
          label="Current Password"
          secureTextEntry
          mode="outlined"
          value={oldPwd}
          onChangeText={setOldPwd}
          theme={oPasswordError && errorTheme}
        />
        <HelperText type="error" visible={oPasswordError}>
          {oPasswordError}
        </HelperText>
        <TextInput
          label="New Password"
          secureTextEntry
          mode="outlined"
          value={newPwd}
          onChangeText={(text) => passswordValidation(text)}
          theme={passwordError && errorTheme}
        />
        <HelperText type="error" visible={passwordError}>
          {passwordError}
        </HelperText>
        <TextInput
          label="Confirm Password"
          onSelectionChange={confirmPasswordValidation}
          secureTextEntry
          mode="outlined"
          value={cPwd}
          onChangeText={setCpwd}
          theme={cPasswordError && errorTheme}
        />

        <HelperText type="error" visible={cPasswordError}>
          {cPasswordError}
        </HelperText>

        <Button
          uppercase={false}
          mode="contained"
          icon="content-save"
          disabled={
            isPasswordError || isOpasswordError || isCpasswordError
              ? true
              : false
          }
          onPress={() => handleChangePassword()}
        >
          Change Password
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default PasswordScreen;
