const { default: Axios } = require("axios");
const { GETMOVIE, ADDMOVIE } = require("../../api/api");

export const addMovie = (token, items) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "post",
      url: ADDMOVIE,
      data: items,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    dispatch({
      type: "ADDMOVIE",
      payload: data,
    });
  };
};

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

export const getMovieById = (token, videoId) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "get",
      url: `${GETMOVIE}/${videoId}`,
      headers: {
        authorization: token,
      },
    });
    const data = await response.data;
    console.log(data)
    dispatch({
      type: "GETMOVIESBYID",
      payload: data,
    });
  };
};
