import { DefaultTheme, DarkTheme } from "react-native-paper";

export const myDarkTheme = {
  ...DarkTheme,
  colors: {
    primary: "#007acc",
    background: "#1e1e1e",
    text: "#fff",
    placeholder: "#fff",
    error:"red"
  },

};

export const myDefaultTheme = {
    ...DefaultTheme,
  colors: {
    primary: "blue",
    text: "#000",
    placeholder: "#000",
  },
};
