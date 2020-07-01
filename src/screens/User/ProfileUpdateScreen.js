import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { UPLOAD } from "../../api/api";
import {
  Card,
  ActivityIndicator,
  Button,
  HelperText,
} from "react-native-paper";
import ImageComponent from "../../components/ImageComponent";
import InputComponent from "../../components/InputComponent";
import {
  updateProfile,
  updateProfileById,
} from "../../store/actions/authAction";
import { colors } from "react-native-elements";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
import Header from "../../components/Header";

const ProfileUpdateScreen = ({ navigation, route }) => {
  const data = route.params.data;
  const { colors } = useTheme();
  const { token, admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(data.name);
  const [address, setAddress] = useState(data.address);
  const [phone, setPhone] = useState(data.phone);
  const [image, setImage] = useState(data.image);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState();
  const [adError, setAdError] = useState();
  const [phoneError, setPhoneError] = useState();
  const [isValid, setIsValid] = useState(false);

  const validation = () => {
    if (!name) {
      setNameError("Name is empty");
      setAdError("");
      setPhoneError("");
      return setIsValid(false);
    } else if (!address) {
      setAdError("Address is empty");
      setNameError("");
      setPhoneError("");
      setIsValid(false);
    } else if (!phone || phone.length !== 10) {
      setPhoneError("10 digit phone number");
      setNameError("");
      setAdError("");
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async () => {
    validation();
    if (!isValid) {
      return;
    }

    let action;
    const data1 = {
      name,
      address,
      phone,
      image,
    };
    {
      admin
        ? (action = updateProfileById(token, data1, data._id))
        : (action = updateProfile(token, data1));
    }

    try {
      await dispatch(action);
      navigation.goBack();
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header back noImage headerTitle="Update Profile" />

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={{ flex: 1, padding: 20 }}
      >
        <TouchableOpacity onPress={() => setModal(true)}>
          {image ? (
            <Image
              source={{ uri: `${UPLOAD}/${image}` }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                marginTop: 10,
                alignSelf: "center",
              }}
            />
          ) : (
            <MaterialIcons
              name="account-circle"
              size={100}
              color={colors.text}
              style={{ alignSelf: "center", marginTop: 10 }}
            />
          )}
          <Button uppercase={false}>Click here to Change Profile</Button>
          <ActivityIndicator animating={loading} size="small" />
        </TouchableOpacity>
        <InputComponent label="name" value={name} onChange={setName} />
        {nameError ? (
          <HelperText type="error" visible={nameError}>
            {nameError}
          </HelperText>
        ) : null}
        <InputComponent label="address" value={address} onChange={setAddress} />
        {adError ? (
          <HelperText type="error" visible={adError}>
            {adError}
          </HelperText>
        ) : null}
        <InputComponent
          label="phone"
          value={phone}
          onChange={setPhone}
          keyboard="phone-pad"
        />
        {phoneError ? (
          <HelperText type="error" visible={phoneError}>
            {phoneError}
          </HelperText>
        ) : null}

        <Modal
          visible={modal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModal(false)}
        >
          <ImageComponent
            onCancel={() => setModal(false)}
            value={setImage}
            load={() => setLoading(true)}
            notLoad={() => setLoading(false)}
          />
        </Modal>

        <Button onPress={() => handleSubmit()} mode="contained">
          Update
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ProfileUpdateScreen;
