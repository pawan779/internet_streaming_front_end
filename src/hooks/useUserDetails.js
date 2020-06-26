import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Axios from "axios";
import { USERDETAILS } from "../api/api";
import { useSelector } from "react-redux";

export const useUserDetails = () => {
  const [result, setResult] = useState("");
  const { token } = useSelector((state) => state.auth);
  const UserDetails = async (id) => {
    const response = await Axios({
      method: "get",
      url: USERDETAILS,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    setResult(data);
  };

  return [UserDetails, result];
};
