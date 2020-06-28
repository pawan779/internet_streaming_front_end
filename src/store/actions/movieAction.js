const { default: Axios } = require("axios");
const {
  GETMOVIE,
  ADDMOVIE,
  EDITMOVIE,
  DELETEMOVIE,
  UPDATEVIEWS,
  GETMOVIEBYGENRE,
  TRENDINGMOVIE,
  LATESTMOVIE
} = require("../../api/api");

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
    console.log(data);
    dispatch({
      type: "GETMOVIESBYID",
      payload: data,
    });
  };
};

export const editMovie = (id, token, items) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "put",
      url: `${EDITMOVIE}/${id}`,
      data: items,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    dispatch({
      type: "EDITMOVIE",
      payload: data,
    });
  };
};

export const deleteMovie = (id, token) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "delete",
      url: `${DELETEMOVIE}/${id}`,
      headers: {
        authorization: token,
      },
    });
  };
};

export const updateViews = (token, item) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "put",
      url: `${UPDATEVIEWS}/${item._id}`,
      data: {
        views: item.views + 1,
      },
      headers: {
        authorization: token,
      },
    });
    const data = await response.data;
    dispatch({
      type: "GETMOVIESBYID",
      payload: data,
    });
  };
};

export const getMovieByGenre = (id, token) => {
  console.log(id);
  return async (dispatch) => {
    const response = await Axios({
      method: "get",
      url: `${GETMOVIEBYGENRE}/${id}`,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    dispatch({
      type: "GETMOVIEBYGENRE",
      payload: data,
    });
  };
};

export const trendingMovie = (token) => {

  return async (dispatch) => {
    const response = await Axios({
      method: "get",
      url: TRENDINGMOVIE,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    dispatch({
      type: "TRENDINGMOVIE",
      payload: data,
    });
  };
};

export const getLatestMovie = (token) => {

  return async (dispatch) => {
    const response = await Axios({
      method: "get",
      url: LATESTMOVIE,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    dispatch({
      type: "LATESTMOVIE",
      payload: data,
    });
  };
};

export const recentlyWatched = (data) => {
  console.log("data is" + data);
  return async (dispatch) => {
    dispatch({
      type: "RECENTLYWATCHED",
      payload: data,
    });
  };
};
