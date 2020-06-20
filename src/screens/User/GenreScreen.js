import React from "react";
import {
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  View,
} from "react-native";
import {
  CreateGenre,
  GetGenre,
  DeleteGenre,
  UpdateGenre,
} from "../../store/actions/genreAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import CardDetails from "../../components/CardDetails";
import Header from "../../components/Header";
import Fab from "../../components/Fab";
import { useState } from "react";
import InputModal from "../../components/InputModal";

const GenreScreen = () => {
  const { token, admin } = useSelector((state) => state.auth);
  const { genre } = useSelector((state) => state.genre);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [title, setTitle] = useState("Save");
  const [uId, setId] = useState();

  const dispatch = useDispatch();

  const getGenre = async () => {
    let action;

    action = GetGenre(token);
    try {
      await dispatch(action);
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Are you sure", "Genre will be deleted", [
      { text: "Yes", onPress: () => confirmDelete(id) },
      { text: "No", style: "cancel" },
    ]);
  };
  const confirmDelete = async (id) => {
    let action;
    action = DeleteGenre(id, token);
    try {
      await dispatch(action);
      //for refreshing the genre
      getGenre();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setId(item._id);
    setTitle("Update");
    setModal(true);
  };
  const handleFab = () => {
    setName("");
    setTitle("Save");
    setModal(true);
  };
  const handleUpdate = async (uId) => {
    let action;
    action = UpdateGenre(name, uId, token);
    try {
      await dispatch(action);
      setModal(false);
      //for refreshing the genre
      getGenre();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleChange = () => {
    if (title === "Save") {
      createGenre();
      setTitle("Save");
    } else {
      handleUpdate(uId);
      setTitle("Update");
    }
  };

  const createGenre = async () => {
    let action;
    action = CreateGenre(name, token);
    try {
      await dispatch(action);
      setModal(false);
      setName("");
      //for refreshing the genre
      getGenre();
    } catch (err) {
      setError(err.response.data.error);
    }
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
      {admin ? <Fab onPress={() => handleFab()} /> : null}
      <FlatList
        data={genre}
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return (
            <CardDetails
              title={item.name}
              editable={admin ? true : false}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item._id)}
            />
          );
        }}
      />
      <Modal
        visible={modal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModal(false)}
      >
        <InputModal
          onClose={() => setModal(false)}
          value={name}
          onChange={setName}
          title={title}
          onPress={() => handleChange()}
          error={error}
        />
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
