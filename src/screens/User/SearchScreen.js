import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Axios from "axios";
import { SEARCH } from "../../api/api";
import { useSelector } from "react-redux";
import SearchResult from "../../components/SearchResult";

const SearchScreen = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    const response = await Axios({
      method: "get",
      url: `${SEARCH}/${value}`,
      headers: {
        authorization: token,
      },
    });
    const data = await response.data;
    setResult(data);
  };
  return (
    <View style={styles.container}>
      <SearchBar
        value={value}
        onChange={setValue}
        onSubmit={() => handleSubmit()}
      />

      <FlatList
        data={result}
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
export default SearchScreen;
