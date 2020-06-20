import Axios from "axios";
import { GETMOVIE, GETGENRE } from "../../api/api";

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
