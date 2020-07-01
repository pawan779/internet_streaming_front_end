import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-paper";
import Header from "../../components/Header";
import { getFavouriteMovie } from "../../store/actions/favouritesAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Trending } from "../../components/PosterImage";
import SearchResult from "../../components/SearchResult";
import Loading from "../../components/Loading";
import { useTheme } from "@react-navigation/native";

const RecommendationScreen = () => {
  const dispatch = useDispatch();
  const fav = useSelector((state) => state.favourite);
  const { token } = useSelector((state) => state.auth);
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(true);

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
  useEffect(() => {
    favourite();
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
      <Header headerTitle="Recommended" />

      {fav.length ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={favourite}
              title="Pull to refresh"
              tintColor={colors.text}
              titleColor={colors.text}
            />
          }
          data={fav}
          keyExtractor={(items) => items._id}
          renderItem={({ item }) => {
            return <SearchResult data={item} />;
          }}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={favourite}
              title="Pull to refresh"
              tintColor={colors.text}
              titleColor={colors.text}
            />
          }
        >
          <Text>No Recommendation for you!!</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default RecommendationScreen;
