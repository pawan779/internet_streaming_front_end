import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { TextInput, Button, ActivityIndicator, Text } from "react-native-paper";
import Header from "../../components/Header";

import { useSelector, useDispatch } from "react-redux";
import ImageComponent from "../../components/ImageComponent";
import VideoComponent from "../../components/VideoComponent";
import { GetGenre } from "../../store/actions/genreAction";
import GenreComponent from "../../components/GenreComponent";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import { addMovie } from "../../store/actions/movieAction";
import MovieComponent from "../../components/MovieComponent";
import MovieButtonComponent from "../../components/MovieButtonComponent";
import InputComponent from "../../components/InputComponent";

const CreateScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [imodal, setiModal] = useState(false);
  const [vmodal, setvModal] = useState(false);
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [actor, setActor] = useState("");
  const [actorMessage, setActorMessage] = useState("");
  const [duration, setDuration] = useState("");
  const [release, setRelease] = useState("");
  const [showGenre, setShowGenre] = useState(false);
  const [loading, setLoading] = useState(false);
  const [UploadProgress, setUploadProgress] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

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

  const selectedItemChange = () => {
    setSelectedItem({ selectedItem: selectedItem });
    console.log(selectedItem);
  };

  const getGenre = async () => {
    let action;

    action = GetGenre(token);
    try {
      await dispatch(action);
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  };

  //for selecting genre
  const selectGenre = (item) => {
    const index = selectedItems.findIndex((i) => i.name == item.name);
    if (index === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      selectedItems.splice(index, 1);
      setSelectedItems([...selectedItems]);
    }
  };

  const handleSubmit = async () => {
    if (picture === "") {
      return Alert.alert("No empty image");
    }
    if (video === "") {
      return Alert.alert("No empty video");
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
    action = addMovie(token, items);
    try {
      await dispatch(action);
      navigation.navigate("Movie");
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  };

  useEffect(() => {
    getGenre();
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
          <View>
            <InputComponent
              value={name}
              onChange={setName}
              label="Movie Name"
            />
            <InputComponent
              label="Description"
              value={des}
              onChange={setDes}
              multiline={true}
            />

            <InputComponent
              label="Actor"
              value={actor}
              onChange={setActor}
              onFocus={() =>
                setActorMessage("For multiple actor separate with ,")
              }
              onEnd={() => setActorMessage("")}
            />

            {actorMessage ? (
              <Text style={{ margin: 5 }}>{actorMessage}</Text>
            ) : null}

            <InputComponent
              label="Duration (min)"
              value={duration}
              keyboard="number-pad"
              onChange={setDuration}
            />
            <InputComponent
              label="Release Date"
              value={release}
              keyboard="number-pad"
              onChange={setRelease}
            />

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

export default CreateScreen;
