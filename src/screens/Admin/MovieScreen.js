import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SearchResult from "../../components/SearchResult";
import { getMovie } from "../../store/actions/movieAction";
import Header from "../../components/Header";
import Fab from "../../components/Fab";

const MovieScreen = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.movies);

  const showAllMovie = () => {
    let action;
    action = getMovie(token);
    dispatch(action);
  };

  const addMovie=()=>{
    
  }
  useEffect(() => {
    showAllMovie();
  }, []);
  return (
    <View style={styles.container}>
      <Header headerMode={false} back={true} />
      <Fab onPress={() => addMovie()} />
      <FlatList
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
