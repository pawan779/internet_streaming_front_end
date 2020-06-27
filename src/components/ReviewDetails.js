import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useUserDetails } from "../hooks/useUserDetails";
import { Card, DarkTheme, Button } from "react-native-paper";
import { Overlay, Rating } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { UPLOAD } from "../api/api";

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
          {result.image ? (
            <Image
              source={{ uri: `${UPLOAD}/${result.image}` }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginRight: 10,
              }}
            />
          ) : (
            <MaterialIcons
              name="account-circle"
              size={60}
              color="#e4e4e4"
              style={{ marginRight: 10 }}
            />
          )}
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ color: colors.text, fontWeight: "bold", fontSize: 17,marginRight:5 }}
              >
                {result.name || result.email}
              </Text>
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
            </View>
            <Text style={{ color: colors.text }}>{value.message}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ReviewDetails;
