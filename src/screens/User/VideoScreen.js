import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { getMovieById, deleteMovie } from "../../store/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import { Overlay, Rating } from "react-native-elements";
import VideoPlayer from "../../components/VideoPlayer";
import Loading from "../../components/Loading";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";

const VideoScreen = ({ route }) => {
  const videoId = route.params.videoId;

  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token, admin } = useSelector((state) => state.auth);
  const { movie } = useSelector((state) => state.movies);
  // let rating = parseFloat(movie.data.rating).toFixed(2);
  const getVideo = async () => {
    setIsLoading(true);
    let action;
    action = getMovieById(token, videoId);
    try {
      await dispatch(action);
      setIsLoading(false);
    } catch (err) {
      Alert.alert(err.response.data.error);
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert("Do you want to delete the Movie", "Movie will be deleted", [
      { text: "Yes", onPress: () => confirmDelete() },
      { text: "No", style: "cancel" },
    ]);
  };

  const confirmDelete = async () => {
    let action;
    action = deleteMovie(movie.data._id, token);
    try {
      await dispatch(action);
      navigation.navigate("Movie");
    } catch (err) {
      Alert.alert(err.response.data.error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VideoPlayer videoId={movie.data.video} />

      <View>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              padding: 10,
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            {movie.data.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Rating
              type="custom"
              imageSize={20}
              startingValue={movie.data.rating}
              readonly
              fractions={2}
              ratingBackgroundColor={colors.text}
              ratingColor="orange"
              tintColor={colors.secondary}
            />
            <Text style={{ fontSize: 18, marginLeft: 5 }}></Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginVertical: 5,
            }}
          >
            <Feather name="eye" size={20} color={colors.text} />
            <Text style={{ marginTop: 10, marginLeft: 15 }}>
              {movie.data.views} Views
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton uppercase={false} icon="calendar-month-outline" />
              <Text>{movie.data.release}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton uppercase={false} icon="camera-timer" />
              <Text>{movie.data.duration} minutes</Text>
            </View>
          </View>
          {admin ? (
            <View
              flexDirection="row"
              style={{ justifyContent: "space-around" }}
            >
              <Button
                icon="circle-edit-outline"
                onPress={() =>
                  navigation.navigate("Edit", { video: movie.data })
                }
              >
                Edit
              </Button>
              <Button icon="delete" onPress={() => handleDelete()}>
                Delete
              </Button>
            </View>
          ) : null}

          {more ? (
            <Text style={{ padding: 10, fontSize: 15, color: colors.text }}>
              {movie.data.description}
            </Text>
          ) : (
            <Text
              style={{ padding: 10, fontSize: 15 }}
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{ color: colors.text }}
            >
              {movie.data.description}
            </Text>
          )}

          <Button
            icon={more ? "chevron-up" : "chevron-down"}
            onPress={() => setMore(!more)}
            uppercase={false}
          >
            {more ? (
              <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 10 }}>
                View Less
              </Text>
            ) : (
              <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 10 }}>
                View More
              </Text>
            )}
          </Button>

          <Button
            mode="contained"
            icon="comment-text-multiple"
            onPress={() => setShowReview(true)}
          >
            Reviews ({movie.data.review.length})
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default VideoScreen;
