import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, Modal, FlatList } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import {
  deleteMovie,
  updateViews,
  trendingMovie,
} from "../../store/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import { Overlay, Rating } from "react-native-elements";
import VideoPlayer from "../../components/VideoPlayer";
import Loading from "../../components/Loading";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import ReviewDetails from "../../components/ReviewDetails";
import Review from "../../components/Review";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { getUserById } from "../../store/actions/authAction";
import GenreVideoScreen from "./GenreVideoScreen";
import { Trending, Latest } from "../../components/PosterImage";

const VideoScreen = ({ route }) => {
  const item = route.params.item;

  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token, admin } = useSelector((state) => state.auth);
  const { movie, trending } = useSelector((state) => state.movies);
  // let rating = parseFloat(movie.rating).toFixed(2);

  const getVideo = async () => {
    setIsLoading(true);
    let action;
    action = updateViews(token, item);
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
    action = deleteMovie(movie._id, token);
    try {
      await dispatch(action);
      navigation.navigate("Movie");
    } catch (err) {
      Alert.alert(err.response.data.error);
      setIsLoading(false);
    }
  };

  const trendingMovies = async () => {
    setIsLoading(true);
    let action;
    action = trendingMovie(token);
    try {
      await dispatch(action);
      setIsLoading(false);
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
      <VideoPlayer videoId={movie.video} />
      {!showReview ? (
        <View style={{ padding: 10,flex:1 }}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  padding: 10,
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {movie.name}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Rating
                  type="custom"
                  imageSize={20}
                  startingValue={movie.rating}
                  readonly
                  fractions={2}
                  ratingBackgroundColor="#1e1e1e"
                  ratingColor="orange"
                  tintColor={colors.secondary}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                borderBottomWidth: 0.17,
                borderColor: colors.text,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Feather name="eye" size={20} color={colors.text} />
                <Text style={{ marginLeft: 10 }}>{movie.views} Views</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton uppercase={false} icon="calendar-month-outline" />
                <Text>{movie.release}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton uppercase={false} icon="camera-timer" />
                <Text>{movie.duration} minutes</Text>
              </View>
            </View>
            <Text style={{ marginVertical: 10 }}>Actor: {movie.actor}</Text>

            {admin ? (
              <View
                flexDirection="row"
                style={{ justifyContent: "space-around" }}
              >
                <Button
                  icon="circle-edit-outline"
                  onPress={() => navigation.navigate("Edit", { video: movie })}
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
                {movie.description}
              </Text>
            ) : (
              <Text
                style={{ padding: 10, fontSize: 15 }}
                ellipsizeMode="tail"
                numberOfLines={2}
                style={{ color: colors.text }}
              >
                {movie.description}
              </Text>
            )}

            <Button
              icon={more ? "chevron-up" : "chevron-down"}
              onPress={() => setMore(!more)}
              uppercase={false}
            >
              {more ? (
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", marginTop: 10 }}
                >
                  View Less
                </Text>
              ) : (
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", marginTop: 10 }}
                >
                  View More
                </Text>
              )}
            </Button>

            <Button
              mode="contained"
              icon="comment-text-multiple"
              onPress={() => setShowReview(true)}
            >
              Reviews ({movie.review.length})
            </Button>
            <Text style={styles.text}>People also Watch</Text>

            <FlatList
              data={trending.filter((i) => i._id !== item._id).slice(0, 5)}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(items) => items._id}
              renderItem={({ item }) => {
                return <Trending movie={item} />;
              }}
            />
          </ScrollView>
        </View>
      ) : (
        <>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="md-arrow-back"
              size={30}
              color={colors.text}
              style={{
                marginHorizontal: 10,
                alignSelf: "center",
              }}
              onPress={() => setShowReview(false)}
            />
            <Button
              uppercase={false}
              mode="contained"
              icon="comment-text-multiple"
              onPress={() => setModal(true)}
              style={{ flex: 1 }}
            >
              Write a review
            </Button>
          </View>
          <Overlay isVisible={modal} onBackdropPress={() => setModal(false)}>
            <Review id={movie._id} back={setModal} refresh={getVideo} />
          </Overlay>

          <FlatList
            data={movie.review}
            keyExtractor={(items) => items._id}
            renderItem={({ item }) => {
              return <ReviewDetails value={item} />;
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 5,
  },
});
export default VideoScreen;
