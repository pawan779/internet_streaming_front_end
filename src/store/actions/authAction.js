import Axios from "axios";
import { SIGNUP } from "../../api/api";

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
