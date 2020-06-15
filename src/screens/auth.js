import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { TextInput, Button } from "react-native-paper";
import InputComponent from "../components/InputComponent";
import { emailValidation } from "../validation/validation";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [type, setType] = useState("Login");
  const [mode, setMode] = useState("Don't have an account? Signup Here");

  const handleScreen = () => {
    if (type === "Login") {
      setMode("Already have an account? Login Here");
      setType("SignUp");
    } else {
      setMode("Don't have an account? Signup Here");
      setType("Login");
    }
  };

  const confirmPassword = () =>
    type === "SignUp" ? (
      <InputComponent
        value={cpassword}
        onChange={setCpassword}
        label="confirm password"
        mode="outlined"
        secure
      />
    ) : null;

  const hasError = () => {
    if (!email.includes("@")) {
      return true;
    }
  };

  const handleEmail = () => {
    <emailValidation email={email} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{type}</Text>

      <InputComponent
        onBlur={handleEmail}
        value={email}
        onChange={setEmail}
        label="email"
        mode="outlined"
        visible={hasError}
      />
      <InputComponent
        value={password}
        onChange={setPassword}
        label="password"
        mode="outlined"
        secure
      />
      {confirmPassword()}
      <Button mode="contained">{type}</Button>
      <Button uppercase={false} onPress={() => handleScreen()}>
        {mode}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
export default Auth;
