import Axios from "axios";
import { GETMOVIE, GETGENRE, CREATEGENRE } from "../../api/api";

export const createGenre = (name, token) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "POST",
      url: CREATEGENRE,
      data: {
        name,
      },
      headers: {
        authorization: token,
      },
    });
    const data = await response.data;
    console.log(data);
  };
};

export const getGemre = (token) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "get",
      url: GETGENRE,
      headers: {
        authorization: token,
      },
    });
    const data = await response.data;
    dispatch({
      type: "GETGENRE",
      payload: data,
    });
  };
};
