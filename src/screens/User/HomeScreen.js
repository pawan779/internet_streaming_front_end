import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import HeaderComponent from "../../components/HeaderComponent";
import {
  PosterImage,
  Trending,
  Genre,
  Latest,
} from "../../components/PosterImage";
import { useEffect } from "react";
import {
  getMovie,
  trendingMovie,
  getLatestMovie,
} from "../../store/actions/movieAction";
import Loading from "../../components/Loading";
import { getFavouriteMovie } from "../../store/actions/favouritesAction";
import { useTheme } from "@react-navigation/native";
import { GetGenre } from "../../store/actions/genreAction";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();
  const { token, admin } = useSelector((state) => state.auth);
  const fav = useSelector((state) => state.favourite);
  const { genre } = useSelector((state) => state.genre);

  const { data, trending, latest } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  //to get movie

  const allMovie = async () => {
    setIsLoading(true);
    let action;
    action = getMovie(token);
    try {
      await dispatch(action);
      setIsLoading(false);
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

  const latestMovies = async () => {
    setIsLoading(true);
    let action;
    action = getLatestMovie(token);
    try {
      await dispatch(action);
      setIsLoading(false);
    } catch (err) {
      Alert.alert(err.response.data.error);
      setIsLoading(false);
    }
  };

  const allGenre = async () => {
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
  const favourite = async () => {
    setIsLoading(true);
    let action;
    action = getFavouriteMovie(token);
    try {
      await dispatch(action);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    favourite();
    allMovie();
    allGenre();
    trendingMovies();
    latestMovies();
    setRefreshing(false);
  };

  useEffect(() => {
    favourite();
    allMovie();
    allGenre();
    trendingMovies();
    latestMovies();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          title="Pull to refresh"
          tintColor={colors.text}
          titleColor={colors.text}
        />
      }
    >
      <HeaderComponent />
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return <PosterImage movie={item} />;
        }}
      />
      <Text style={styles.text}>Genre</Text>
      <FlatList
        data={genre}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return <Genre genre={item} />;
        }}
      />

      {fav == "" ? null : (
        <View>
          <Text style={styles.text}>Recommended</Text>

          <FlatList
            data={fav}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(items) => items._id}
            renderItem={({ item }) => {
              return <Trending movie={item} />;
            }}
          />
        </View>
      )}

      <Text style={styles.text}>Trending Now</Text>

      <FlatList
        data={trending}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return <Trending movie={item} />;
        }}
      />

      <Text style={styles.text}>Latest Movies</Text>

      <FlatList
        data={latest}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return <Latest movie={item} />;
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 5,
  },
});
export default HomeScreen;
