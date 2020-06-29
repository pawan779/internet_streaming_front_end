import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Rating } from "react-native-elements";
import Axios from "axios";
import { ADDREVIEW } from "../api/api";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";

const Review = ({ id, back, refresh }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const token = useSelector((state) => state.auth.token);
  const { colors } = useTheme();

  const ratingCompleted = (rating) => {
    setRating(rating);
  };
  const handleSubmit = async () => {
    if (rating === 0 || review === "") {
      Alert.alert("Rating and Review is needed");
      return;
    }
    try {
      const response = await Axios({
        method: "post",
        url: `${ADDREVIEW}/${id}`,
        data: {
          message: review,
          rating,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      Alert.alert("Sucess");
      back(false);
      refresh();
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Rating
        type="custom"
        ratingBackgroundColor={colors.text}
        ratingColor="orange"
        showRating
        ratingCount={5}
        startingValue={0}
        onFinishRating={ratingCompleted}
        style={{ paddingVertical: 10 }}
      />
      <TextInput
        label="Write a review"
        mode="flat"
        returnKeyType="done"
        value={review}
        onChangeText={setReview}
        onEndEditing={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
  },
});
export default Review;
