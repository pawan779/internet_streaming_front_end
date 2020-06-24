import Axios from "axios";
import { ADDFAVOURITES, GETFAVOURITES } from "../../api/api";

export const addFavourites = async (token, data) => {
  const response = await Axios({
    method: "post",
    url: ADDFAVOURITES,
    data,
    headers: {
      authorization: token,
    },
  });
};

// export const getFavourites = (token) => {
//   return async (dispatch) => {
//     const response = await Axios({
//       method: "get",
//       url: GETFAVOURITES,
//       data,
//       headers: {
//         authorization: token,
//       },
//     });

//     const data = await response.data;
//     dispatch({
//       type: "GETFAVOURITES",
//       payload: data,
//     });
//   };
// };
