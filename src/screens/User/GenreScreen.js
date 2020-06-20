import React from "react";
import { StyleSheet, View, Text, Alert, FlatList } from "react-native";
import { getGemre } from "../../store/actions/genreAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import CardDetails from "../../components/CardDetails";
import Header from "../../components/Header";
import Fab from "../../components/Fab";

const GenreScreen = () => {
  const { token, admin } = useSelector((state) => state.auth);
  const { genre } = useSelector((state) => state.genre);
  const dispatch = useDispatch();
  const getGenre = async () => {
    let action;
    action = getGemre(token);
    try {
      await dispatch(action);
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  };
  useEffect(() => {
    getGenre();
  }, []);
  return (
    <View style={styles.container}>
      {genre.length ? (
        <View style={styles.container}>
          <Header headerTitle="Genre" back />
          {admin ? <Fab /> : null}
          <FlatList
            data={genre}
            keyExtractor={(items) => items._id}
            renderItem={({ item }) => {
              return <CardDetails title={item.name} />;
            }}
          />
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default GenreScreen;
