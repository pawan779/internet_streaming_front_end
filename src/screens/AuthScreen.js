import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput, Button, HelperText, Text, Card } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { errorTheme } from "../colors/theme";

const AuthScreen = () => {
  const [mode, setMode] = useState("SignIn");
  const [change, setChange] = useState("Don't have account? SignUp Here");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [cpasssword, setcPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpaswordError, setcpasswordError] = useState("");
  const [checkedError, setCheckedError] = useState("");
  const [isEmailError, setisEmailError] = useState(true);
  const [isPasswordError, setisPasswordError] = useState(true);
  const [iscPasswordError, setiscPasswordError] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  const emailValidation = () => {
    let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const valid = reg.test(email);
    if (!valid) {
      setEmailError("Invalid email format");
      setisEmailError(true);
    } else {
      setEmailError("");
      setisEmailError(false);
    }
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
    setPassword(text);
  };
  const confirmPasswordValidation = () => {
    if (password !== cpasssword) {
      setcpasswordError("Password donot match");
      setiscPasswordError(true);
    } else {
      setcpasswordError("");
      setiscPasswordError(false);
    }
  };

  const confirmPassword = () =>
    mode === "SignUp" ? (
      <View>
        <TextInput
          secureTextEntry
          onSelectionChange={confirmPasswordValidation}
          label="Confirm Password"
          mode="outlined"
          value={cpasssword}
          onChangeText={setcPassword}
        />
        <HelperText type="error" visible={cpaswordError}>
          {cpaswordError}
        </HelperText>
        <Card style={{ marginTop: 10 }} onPress={() => setChecked(!checked)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!checked ? (
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={24}
                color="black"
              />
            ) : (
              <Ionicons name="md-checkbox-outline" size={24} color="black" />
            )}
            <Text style={{ marginLeft: 5 }}>
              I agree all the Terms and conditions.
            </Text>
          </View>
          <HelperText type="error" visible={checkedError}>
            {checkedError}
          </HelperText>
        </Card>
      </View>
    ) : null;

  const handelScreen = () => {
    if (mode === "SignIn") {
      setMode("SignUp");
      setChange("Already have an account? SingIn here");
    } else {
      setMode("SignIn");
      setChange("Don't have an account? SignUp Here");
    }
  };

  const handleSubmit = () => {
    let action;
    if (mode === "SignUp") {
      setisLoading(true);
      if (
        isEmailError ||
        isPasswordError ||
        iscPasswordError ||
        checked === false
      ) {
        setisLoading(false);
        setCheckedError("Please checked the box");
        return Alert.alert("Invalid");
      }
      
      
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.container}
    >
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 28,
            alignSelf: "center",
            margin: 20,
          }}
        >
          {mode}
        </Text>

        <TextInput
          onBlur={emailValidation}
          label="Email"
          mode="outlined"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          theme={emailError && errorTheme}
        />
        <HelperText type="error" visible={emailError}>
          {emailError}
        </HelperText>
        <TextInput
          secureTextEntry
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={(text) => passswordValidation(text)}
          theme={passwordError && errorTheme}
        />
        <HelperText type="error" visible={passwordError}>
          {passwordError}
        </HelperText>

        {confirmPassword()}

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <Button
          onPress={() => handleSubmit()}
          mode="contained"
          uppercase={false}
        >
          {mode}
        </Button>

        <Button onPress={() => handelScreen()} uppercase={false}>
          {change}
        </Button>
        <ActivityIndicator animating={isLoading} size="large" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
});
export default AuthScreen;
