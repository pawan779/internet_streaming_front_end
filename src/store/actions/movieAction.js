const { default: Axios } = require("axios");
const { GETMOVIE } = require("../../api/api");

export const getMovie = (token) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "get",
      url: GETMOVIE,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    dispatch({
      type: "GETMOVIE",
      payload: data,
    });
  };
};
