import Axios from "axios";
import { SIGNUP, SIGNIN, USERDETAILS } from "../../api/api";

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "POST",
      url: SIGNUP,
      data: {
        email,
        password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      const data = await response.data;
      console.log(data);
      dispatch({
        type: "AUTH",
        payload: {
          token: data.token,
          admin: data.admin,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "POST",
      url: SIGNIN,
      data: {
        email,
        password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      const data = await response.data;
      dispatch({
        type: "AUTH",
        payload: {
          token: data.token,
          admin: data.isAdmin,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const Logout = () => {
  return (dispach) => {
    dispach({ type: "LOGOUT" });
  };
};

export const getProfile = (token) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "get",
      url: USERDETAILS,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    dispatch({
      type: "GETDETAILS",
      payload: data,
    });
  };
};
export const updateProfile = (token, data) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "put",
      url: USERDETAILS,
      data,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    dispatch({
      type: "GETDETAILS",
      payload: data,
    });
  };
};
