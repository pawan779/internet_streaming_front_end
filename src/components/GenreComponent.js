import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Button, DefaultTheme } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

const GenreComponent = ({ data }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: 200,
      width: 200,
      alignSelf: "center",
      padding: 10,
      backgroundColor: colors.card,
      overflow: "scroll",
      borderRadius: 20,
    },
  });

  const selectGenre=(item)=>{
      
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(items) => items._id}
        renderItem={({ item }) => {
          return (
            <Button
              uppercase={false}
              style={{
                fontSize: 18,
              }}
              color={colors.text}
              onPress={()=>selectGenre(item)}
            >
              {item.name}
            </Button>
          );
        }}
      />
    </View>
  );
};

export default GenreComponent;
