import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Alert } from "react-native";
import { Text, HelperText } from "react-native-paper";
import Header from "../../components/Header";

import { useSelector, useDispatch } from "react-redux";
import { GetGenre } from "../../store/actions/genreAction";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import { editMovie } from "../../store/actions/movieAction";
import MovieComponent from "../../components/MovieComponent";
import MovieButtonComponent from "../../components/MovieButtonComponent";
import InputComponent from "../../components/InputComponent";
import { errorTheme } from "../../colors/theme";

const EditScreen = ({ navigation, route }) => {
  const data = route.params.video;

  const [name, setName] = useState(data.name);
  const [des, setDes] = useState(data.description);
  const [imodal, setiModal] = useState(false);
  const [vmodal, setvModal] = useState(false);
  const [picture, setPicture] = useState(data.image);
  const [video, setVideo] = useState(data.video);
  const [actor, setActor] = useState(data.actor);
  const [actorMessage, setActorMessage] = useState("");
  const [duration, setDuration] = useState(data.duration);
  const [release, setRelease] = useState(data.release);
  const [showGenre, setShowGenre] = useState(true);
  const [nameError, setNameError] = useState("");
  const [desError, setDesError] = useState("");
  const [actorError, setActorError] = useState("");
  const [durError, setDurError] = useState("");
  const [releaseError, setReleaseError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [UploadProgress, setUploadProgress] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [genreName, setGenreName] = useState();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    view: {
      padding: 20,
    },
  });

  const token = useSelector((state) => state.auth.token);
  const { genre } = useSelector((state) => state.genre);
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
  const getName = (item) => {
    var compare = genre.find((i) => i._id == item._id);
    setGenreName(compare);
    console.log(compare);
  };

  //for selecting genre
  const selectGenre = (item) => {
    const index = selectedItems.findIndex((i) => i._id == item._id);
    if (index === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      selectedItems.splice(index, 1);
      setSelectedItems([...selectedItems]);
    }
  };

  const validation = () => {
    if (!name) {
      setNameError("Name is empty");
      return setIsValid(false);
    } else if (!des) {
      setDesError("Description is empty");
      setNameError("");
      return setIsValid(false);
    } else if (!actor) {
      setActorError("Actor name is empty");
      setDesError("");
      return setIsValid(false);
    } else if (!duration || duration > 1000) {
      setDurError("Duration is invalid");
      setActorError("");
      return setIsValid(false);
    } else if (!release || release > 2020 || release < 1900) {
      setReleaseError("Release date is not valide");
      setDurError("");
      return setIsValid(false);
    } else if (!selectedItems.length) {
      setGenreError("Select genre");
      setReleaseError("");
      return setIsValid(false);
    } else if (picture === "") {
      Alert.alert("No empty image");
      setGenreError("");
      return setIsValid(false);
    } else if (video === "") {
      Alert.alert("No empty video");
      return setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async () => {
    validation();
    if (!isValid) {
      return;
    }

    const items = {
      name,
      description: des,
      actor,
      image: picture,
      video,
      duration,
      release,
      genre: selectedItems,
    };

    let action;
    let id = data._id;
    action = editMovie(id, token, items);
    try {
      await dispatch(action);
      navigation.navigate("Movie");
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  };

  useEffect(() => {
    getGenre();
    setSelectedItems(data.genre);
  }, []);
  return (
    <View style={styles.container}>
      <Header back headerTitle="Add Movie" noImage />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.view}
      >
        <ScrollView>
          <View style={styles.container}>
            <InputComponent
              value={name}
              onChange={setName}
              label="Movie Name"
              theme={nameError && errorTheme}
            />
            {nameError ? (
              <HelperText type="error" visible={nameError}>
                {nameError}
              </HelperText>
            ) : null}

            <InputComponent
              label="Description"
              value={des}
              onChange={setDes}
              multiline={true}
              theme={desError && errorTheme}
            />
            {desError ? (
              <HelperText type="error" visible={desError}>
                {desError}
              </HelperText>
            ) : null}

            <InputComponent
              label="Actor"
              value={actor}
              onChange={setActor}
              onFocus={() =>
                setActorMessage("For multiple actor separate with ,")
              }
              onEnd={() => setActorMessage("")}
              theme={actorError && errorTheme}
            />
            {actorError ? (
              <HelperText type="error" visible={actorError}>
                {actorError}
              </HelperText>
            ) : null}

            {actorMessage ? (
              <Text style={{ margin: 5 }}>{actorMessage}</Text>
            ) : null}

            <InputComponent
              label="Duration (min)"
              value={duration}
              keyboard="number-pad"
              onChange={setDuration}
              theme={durError && errorTheme}
            />
            {durError ? (
              <HelperText type="error" visible={durError}>
                {durError}
              </HelperText>
            ) : null}
            <InputComponent
              label="Release Date"
              value={release}
              keyboard="number-pad"
              onChange={setRelease}
              theme={nameError && errorTheme}
            />
            {releaseError ? (
              <HelperText type="error" visible={releaseError}>
                {releaseError}
              </HelperText>
            ) : null}

            {genreError ? (
              <HelperText type="error" visible={genreError}>
                {genreError}
              </HelperText>
            ) : null}

            <MovieButtonComponent
              onGpress={() => setShowGenre(!showGenre)}
              showGenre={showGenre}
              genre={genre}
              selectedItems={selectedItems}
              onPress={selectGenre}
              picture={picture}
              onIpress={() => setiModal(true)}
              video={video}
              onVpress={() => setvModal(true)}
              onSubmit={() => handleSubmit()}
              uploadProgress={UploadProgress}
              loading={loading}
            />

            <MovieComponent
              imodal={imodal}
              onIcancel={() => setiModal(false)}
              iValue={setPicture}
              onIload={() => setLoading(true)}
              onInotLoad={() => setLoading(false)}
              vmodal={vmodal}
              onVcancel={() => setvModal(false)}
              vValue={setVideo}
              onVload={() => setLoading(true)}
              onVnotLoad={() => setLoading(false)}
              progress={setUploadProgress}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditScreen;
