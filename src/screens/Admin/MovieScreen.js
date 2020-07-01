import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SearchResult from "../../components/SearchResult";
import { getMovie } from "../../store/actions/movieAction";
import Header from "../../components/Header";
import Fab from "../../components/Fab";
import { useState } from "react";
import Loading from "../../components/Loading";
import { useTheme } from "@react-navigation/native";

const MovieScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.movies);
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();

  const showAllMovie = async () => {
    setIsLoading(true);
    let action;
    action = getMovie(token);
    try {
      await dispatch(action);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const addMovie = () => {
    navigation.navigate("Create");
  };
  useEffect(() => {
    showAllMovie();
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
      <Header back noImage headerTitle="Movies" />
      <Fab onPress={() => addMovie()} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={showAllMovie}
            title="Pull to refresh"
            tintColor={colors.text}
            titleColor={colors.text}
          />
        }
        data={data}
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return <SearchResult data={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MovieScreen;
