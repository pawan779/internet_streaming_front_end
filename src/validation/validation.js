export const emailValidation = ({email}) => {
    let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const valid = reg.test(email);
    if (!valid) {
      setEmailError("Invalid email format");
      setisEmailError(true);
    } else {
      setEmailError("");
      setisEmailError(false);
    }
  };
