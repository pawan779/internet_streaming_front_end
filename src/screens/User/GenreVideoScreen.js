import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import { getMovieByGenre } from "../../store/actions/movieAction";
import { useSelector, useDispatch } from "react-redux";
import SearchResult from "../../components/SearchResult";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

const GenreVideoScreen = ({ route }) => {
  const { genreId } = route.params;

  const { colors } = useTheme();

  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const genre = useSelector((state) => state.movies.genre);
  const dispatch = useDispatch();

  const getMovie = async () => {
    setLoading(true);
    let action;
    action = getMovieByGenre(genreId, token);
    try {
      await dispatch(action);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>
    );
  }
  return (
    <View>
      <Header noImage back />
      {!genre.length ? (
        <Text style={{ color: colors.error }}>{"Category is empty!!"}</Text>
      ) : null}
      <FlatList
        data={genre}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getMovie}
            title="Pull to refresh"
            tintColor={colors.text}
            titleColor={colors.text}
          />
        }
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return <SearchResult data={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default GenreVideoScreen;
