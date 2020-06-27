import React, { useEffect } from "react";
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
import Loading from "../../components/Loading";
import CardDetails from "../../components/CardDetails";
import Header from "../../components/Header";
import Fab from "../../components/Fab";
import { useState } from "react";
import InputModal from "../../components/InputModal";
import { IconButton } from "react-native-paper";
import { addFavourites } from "../../store/actions/favouritesAction";
import { GETFAVOURITES } from "../../api/api";
import Axios from "axios";
import { colors } from "react-native-elements";

const GenreScreen = () => {
  const { token, admin } = useSelector((state) => state.auth);
  const { genre } = useSelector((state) => state.genre);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [title, setTitle] = useState("Save");
  const [uId, setId] = useState();
  const [selectedFav, setSelectedFav] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const getGenre = async () => {
    setIsLoading(true);
    let action;

    action = GetGenre(token);
    try {
      await dispatch(action);
      setIsLoading(false);
    } catch (err) {
      Alert.alert(err.response.data.error);
      setIsLoading(false);
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

  const handleFav = (item) => {
    const index = selectedFav.findIndex((i) => i._id == item._id);
    if (index === -1) {
      setSelectedFav([...selectedFav, item]);
    } else {
      selectedFav.splice(index, 1);
      setSelectedFav([...selectedFav]);
    }
  };

  const addFav = () => {
    addFavourites(token, selectedFav);
  };

  const createGenre = async () => {
    let action;
    action = CreateGenre(name, token);
    try {
      await dispatch(action);
      setModal(false);
      setName("");
      setError("");
      //for refreshing the genre
      getGenre();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const getFav = async () => {
    setIsLoading(true);
    const response = await Axios({
      method: "get",
      url: GETFAVOURITES,
      data,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    setSelectedFav(data.genre);
    setIsLoading(false);
  };
  useEffect(() => {
    getGenre();
    getFav();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>
    );
  }
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
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flex: 1 }}>
                <CardDetails
                  title={item.name}
                  editable={admin ? true : false}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item)}
                />
              </View>
              {!admin && (
                <IconButton
                  icon={
                    selectedFav.findIndex((i) => i._id == item._id) > -1
                      ? "star"
                      : "star-outline"
                  }
                  color={
                    selectedFav.findIndex((i) => i._id == item._id) > -1
                      ? "red"
                      : colors.text
                  }
                  style={{ marginLeft: -40 }}
                  onPress={() => handleFav(item)}
                  onPressOut={() => addFav()}
                />
              )}
            </View>
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
