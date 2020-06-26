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
import { Logout } from "../../store/actions/authAction";
import HeaderComponent from "../../components/HeaderComponent";
import { PosterImage, Preview, Trending } from "../../components/PosterImage";
import { useEffect } from "react";
import { getMovie } from "../../store/actions/movieAction";
import Loading from "../../components/Loading";
import { getFavouriteMovie } from "../../store/actions/favouritesAction";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { token, admin } = useSelector((state) => state.auth);
  const fav = useSelector((state) => state.favourite);

  const { data } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const handleLogout = () => {
    let action;
    action = Logout();
    dispatch(action);
  };

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
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
    favourite();
    allMovie();
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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 5,
  },
});
export default HomeScreen;
