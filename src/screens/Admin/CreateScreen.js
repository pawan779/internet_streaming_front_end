import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  Alert,
  TouchableHighlight,
} from "react-native";
import { TextInput, Button, ActivityIndicator, Text } from "react-native-paper";
import Header from "../../components/Header";
import { baseURL } from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import ImageComponent from "../../components/ImageComponent";
import VideoComponent from "../../components/VideoComponent";
import { GetGenre } from "../../store/actions/genreAction";
import GenreComponent from "../../components/GenreComponent";
import { useTheme } from "@react-navigation/native";

const CreateScreen = () => {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [imodal, setiModal] = useState(false);
  const [vmodal, setvModal] = useState(false);
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
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
    modal: {
      padding: 20,
      position: "absolute",
      bottom: 0,
      height: 150,
      width: "100%",
      backgroundColor: "#d7d7d7",
    },
    combo: {
      height: 200,
      width: 200,
      alignSelf: "center",
      padding: 10,
      backgroundColor: colors.card,
      overflow: "scroll",
      borderRadius: 20,
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
    try {
      const response = await Axios({
        method: "post",
        url: `${baseURL}/movie`,
        data: {
          name,
          description: des,
          image: picture,
          video,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      console.log(data);
      navigation.navigate("Dashboard");
    } catch (err) {
      console.log(err);
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
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={{ margin: 5 }}
        />

        <TextInput
          label="Description"
          value={des}
          onChangeText={setDes}
          style={{ margin: 5 }}
        />

        <FlatList
          data={genre}
          keyExtractor={(items) => items._id}
          renderItem={({ item }) => {}}
        />

        <Button
          uppercase={false}
          mode="text"
          icon={showGenre ? "arrow-up-drop-circle" : "arrow-down-drop-circle"}
          onPress={() => setShowGenre(!showGenre)}
        >
          Select Genre
        </Button>

        {showGenre && (
          <View style={styles.combo}>
            <FlatList
              data={genre}
              keyExtractor={(items) => items._id}
              renderItem={({ item }) => {
                return (
                  <GenreComponent
                    data={item}
                    onPress={() => selectGenre(item)}
                    value={selectedItems}
                    icon={
                      selectedItems.findIndex((i) => i.name == item.name) > -1
                        ? "check-box-outline"
                        : "checkbox-blank-outline"
                    }
                  />
                );
              }}
            />
          </View>
        )}

        {selectedItems && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={selectedItems}
            keyExtractor={(items) => items._id}
            renderItem={({ item }) => {
              return <Text style={{ margin: 5 }}> {item.name} </Text>;
            }}
          />
        )}

        {picture ? (
          <Text>{picture}</Text>
        ) : (
          <Button
            onPress={() => setiModal(true)}
            mode="contained"
            style={{ margin: 5 }}
            icon="image"
          >
            Upload Image
          </Button>
        )}
        {video ? (
          <Text>{video}</Text>
        ) : (
          <Button
            onPress={() => setvModal(true)}
            mode="contained"
            style={{ margin: 5 }}
            icon="video"
          >
            Upload Movies
          </Button>
        )}
        <Button
          onPress={() => handleSubmit()}
          mode="contained"
          style={{ margin: 5 }}
          icon="upload"
        >
          Save
        </Button>

        <View style={{ flexDirection: "row" }}>
          {UploadProgress ? (
            <Text style={{ justifyContent: "center" }}>
              Upload: {UploadProgress}%
            </Text>
          ) : null}
          <ActivityIndicator animating={loading} size="small" />
        </View>

        <Modal
          visible={imodal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModal(false)}
        >
          <ImageComponent
            onCancel={() => setiModal(false)}
            value={setPicture}
            load={() => setLoading(true)}
            notLoad={() => setLoading(false)}
          />
        </Modal>
        <Modal
          visible={vmodal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModal(false)}
        >
          <VideoComponent
            onCancel={() => setvModal(false)}
            value={setVideo}
            load={() => setLoading(true)}
            progress={setUploadProgress}
            notLoad={() => setLoading(false)}
          />
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateScreen;
