import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import GenreComponent from "./GenreComponent";
import { useTheme } from "@react-navigation/native";

const MovieButtonComponent = ({
  onGpress,
  showGenre,
  genre,
  selectedItems,
  onPress,
  picture,
  onIpress,
  video,
  onVpress,
  onSubmit,
  uploadProgress,
  loading,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
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
  return (
    <View>
      <Button
        uppercase={false}
        mode="outlined"
        icon={showGenre ? "arrow-up-drop-circle" : "arrow-down-drop-circle"}
        onPress={onGpress}
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
                  onPress={() => onPress(item)}
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
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={selectedItems}
            keyExtractor={(items) => items._id}
            renderItem={({ item }) => {
              return <Text style={{ margin: 5 }}> {item.name} </Text>;
            }}
          />
        </View>
      )}

      {picture ? (
        <Text>{picture}</Text>
      ) : (
        <Button
          onPress={onIpress}
          mode="contained"
          style={{ margin: 5 }}
          icon="image"
          loading={loading}
        >
          Upload Image
        </Button>
      )}
      {video ? (
        <Text>{video}</Text>
      ) : (
        <Button
          onPress={onVpress}
          mode="contained"
          style={{ margin: 5 }}
          icon="video"
        >
          Upload Movies
        </Button>
      )}

      <View style={{ flexDirection: "row" }}>
        {uploadProgress ? (
          <Text style={{ justifyContent: "center" }}>
            Upload: {uploadProgress}%
          </Text>
        ) : null}
      </View>

      <Button
        onPress={onSubmit}
        mode="contained"
        style={{ margin: 5 }}
        icon="upload"
      >
        Save
      </Button>
    </View>
  );
};

export default MovieButtonComponent;
