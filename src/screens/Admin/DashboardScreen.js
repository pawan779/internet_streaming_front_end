import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import Header from "../../components/Header";
import CardDetails from "../../components/CardDetails";

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header headerMode={false} />
      <CardDetails
        title="Movies"
        icon="movie"
        onPress={() => navigation.navigate("Movie")}
      />
      <CardDetails title="Users" icon="" />
      <CardDetails
        title="Genre"
        icon="movie"
        onPress={() => navigation.navigate("Genre")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default DashboardScreen;
