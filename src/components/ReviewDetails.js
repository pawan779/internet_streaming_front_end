import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useUserDetails } from "../hooks/useUserDetails";
import { Card, DarkTheme, Button } from "react-native-paper";
import { Overlay, Rating } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const ReviewDetails = ({ value }) => {
  const { colors } = useTheme();
  const [userDetails, result] = useUserDetails();

  useEffect(() => {
    const id = value.userId;
    userDetails(id);
  }, []);
  return (
    <View>
      <Card
        style={{
          backgroundColor: colors.secondary,
          padding: 10,
          marginVertical: 5,
          borderBottomColor: colors.border,
          borderBottomWidth: 0.2,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="account-circle"
            size={60}
            color="#e4e4e4"
            style={{ marginRight: 10 }}
            // onPress={() => {
            //   dispathch({ type: "CHANGE_THEME", payload: !currentTheme });
            // }}
          />
          <View>
            <Text style={{ color: colors.text }}>{result.email}</Text>
            <Rating
              type="custom"
              imageSize={15}
              startingValue={value.rating}
              readonly
              fractions={2}
              ratingBackgroundColor={colors.text}
              ratingColor="orange"
              tintColor={colors.secondary}
              // style={{ alignItem: "flex-start" }}
            />
            <Text style={{ color: colors.text }}>{value.message}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ReviewDetails;
