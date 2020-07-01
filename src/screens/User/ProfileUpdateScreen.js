import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Modal, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { UPLOAD } from "../../api/api";
import { Card, ActivityIndicator, Button } from "react-native-paper";
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

  const handleSubmit = async () => {
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
      <Header
        back
        noImage
        headerTitle="Update Profile"
      />
      <ScrollView style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => setModal(true)}>
          {data.image ? (
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
        <InputComponent label="address" value={address} onChange={setAddress} />
        <InputComponent
          label="phone"
          value={phone}
          onChange={setPhone}
          keyboard="phone-pad"
        />

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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ProfileUpdateScreen;
