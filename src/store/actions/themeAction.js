export const changeTheme = () => {
  return (dispatch) => {
    dispatch({
      type: "CHANGETHEME",
    });
  };
};
