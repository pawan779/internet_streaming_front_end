import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import SearchBar from "../../components/SearchBar";
import Axios from "axios";
import { SEARCH } from "../../api/api";
import { useSelector } from "react-redux";
import SearchResult from "../../components/SearchResult";
import { useEffect } from "react";

const SearchScreen = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    const response = await Axios({
      method: "get",
      url: `${SEARCH}/${value}`,
      headers: {
        authorization: token,
      },
    });
    try {
      const data = await response.data;
      setError("");
      if (data == "") {
        setError(`Search Result for ${value}: Not found`);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err.response.data.error);
      console.log(err.response.data.error);
    }
  };
  useEffect(() => {
    setResult("");
  }, []);
  return (
    <View style={styles.container}>
      <SearchBar
        value={value}
        onChange={setValue}
        onSubmit={() => handleSubmit()}
      />
      {error ? (
        <Text style={{ color: "red" }}>{error}</Text>
      ) : (
        <FlatList
          data={result}
          keyExtractor={(items) => items._id}
          renderItem={({ item }) => {
            return <SearchResult data={item} />;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SearchScreen;
