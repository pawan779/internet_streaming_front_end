import Axios from "axios";
import { GETMOVIE, GETGENRE, CREATEGENRE, DELETEGENRE } from "../../api/api";

export const CreateGenre = (name, token) => {
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
    dispatch({
      type: "GENRE",
      payload: data,
    });
  };
};

export const GetGenre = (token) => {
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

export const DeleteGenre = (id, token) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "delete",
      url: `${DELETEGENRE}/${id}`,
      headers: {
        authorization: token,
      },
    });
    const data = await response.data;
  };
};
