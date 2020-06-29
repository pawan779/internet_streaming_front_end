import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme, useNavigation } from "@react-navigation/native";
import { UPLOAD } from "../api/api";

const UserDetails = ({ data }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={{ padding: 20 }}>
      <Card
        style={{
          width: "100%",
          height: 150,
          padding: 10,
          backgroundColor: colors.dim,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            {data.image ? (
              <Image
                source={{ uri: `${UPLOAD}/${data.image}` }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  alignSelf: "center",
                }}
              />
            ) : (
              <MaterialIcons
                name="account-circle"
                size={100}
                color={colors.text}
                style={{ alignSelf: "center" }}
              />
            )}
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View>
              {data.name ? (
                <Text style={styles.text}>Name: {data.name}</Text>
              ) : null}
              {data.address ? (
                <Text style={styles.text}>Address: {data.address}</Text>
              ) : null}
              {data.phone ? (
                <Text style={styles.text}>Phone: {data.phone}</Text>
              ) : null}
              <Text style={styles.text}>Email: {data.email}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <IconButton
                icon="square-edit-outline"
                color="#ff8000"
                size={30}
                onPress={() => navigation.navigate("ProfileUpdate", { data })}
              />
              <IconButton icon="delete" color="#ff0000" size={30} />
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 3,
    fontSize: 15,
    marginLeft: 10,
  },
});
export default UserDetails;
