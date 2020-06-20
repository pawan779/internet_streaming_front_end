import React from "react";
import { StyleSheet, ScrollView, Alert, FlatList } from "react-native";
import { Text, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../store/actions/authAction";
import HeaderComponent from "../../components/HeaderComponent";
import { PosterImage, Preview, Trending } from "../../components/PosterImage";
import Axios from "axios";
import { useEffect } from "react";
import { getMovie } from "../../store/actions/movieAction";

const HomeScreen = () => {
  const { token, admin } = useSelector((state) => state.auth);
  const { data} = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const handleLogout = () => {
    let action;
    action = Logout();
    dispatch(action);
  };

  //to get movie

  const allMovie = async () => {
    let action;
    action = getMovie(token);
    try {
      await dispatch(action);
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  };

  useEffect(() => {
    allMovie();
  }, []);

  return (
    <ScrollView>
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
      <Text style={styles.text}>Preview</Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return <Preview movie={item} />;
        }}
      />

      <Text style={styles.text} >Trending Now</Text>

      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return <Trending movie={item} />;
        }}
      />
      <Button onPress={() => handleLogout()}>Logout</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text:{
    fontSize:18,
    fontWeight:"bold",
    marginTop:20,
    marginHorizontal:10,
    marginBottom:5
  }
});
export default HomeScreen;
