import React from "react";
import {
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { getGemre } from "../../store/actions/genreAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import CardDetails from "../../components/CardDetails";
import Header from "../../components/Header";
import Fab from "../../components/Fab";
import { CREATEGENRE } from "../../api/api";
import { useState } from "react";
import InputModal from "../../components/InputModal";

const GenreScreen = () => {
  const { token, admin } = useSelector((state) => state.auth);
  const { genre } = useSelector((state) => state.genre);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const getGenre = async () => {
    let action;
    action = getGemre(token);
    try {
      await dispatch(action);
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  };

  const createGenre = async () => {
    let action;
  };
  useEffect(() => {
    getGenre();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      style={styles.container}
    >
      <Header headerTitle="Genre" back />
      {admin ? <Fab onPress={() => setModal(true)} /> : null}
      <FlatList
        data={genre}
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return <CardDetails title={item.name} />;
        }}
      />
      <Modal
        visible={modal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModal(false)}
      >
        <InputModal onClose={() => setModal(false)}/>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default GenreScreen;
