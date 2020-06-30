import Axios from "axios";
import {
  SIGNUP,
  SIGNIN,
  USERDETAILS,
  UPDATEUSER,
  GETUSERBYID,
  GETALLUSERS,
  UPDATEUSERBYID,
  CHANGEPASSWORD,
} from "../../api/api";

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
export const updateProfile = (token, user) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "put",
      url: UPDATEUSER,
      data: user,
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

export const updateProfileById = (token, user, id) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "put",
      url: `${UPDATEUSERBYID}/${id}`,
      data: user,
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

export const getAllUsers = (token) => {
  return async (dispatch) => {
    const response = await Axios({
      method: "get",
      url: GETALLUSERS,
      headers: {
        authorization: token,
      },
    });

    const data = await response.data;
    dispatch({
      type: "GETALLUSERS",
      payload: data,
    });
  };
};

export const changePassword = (token, items) => {
  console.log(items);
  return async (dispatch) => {
    const response = await Axios({
      method: "post",
      url: CHANGEPASSWORD,
      data: items,
      headers: {
        authorization: token,
      },
    });
  };
};
// export const getUserById = (token, id) => {
//   return async (dispatch) => {
//     const response = await Axios({
//       method: "get",
//       url: `${GETUSERBYID}/${id}`,
//       headers: {
//         authorization: token,
//       },
//     });

//     const data = await response.data;
//     dispatch({
//       type: "GETUSERBYID",
//       payload: data,
//     });
//   };
// };
