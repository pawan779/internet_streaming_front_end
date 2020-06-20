import { DefaultTheme, DarkTheme } from "react-native-paper";


export const myDarkTheme = {
  ...DarkTheme,
  colors: {
    primary: "#007acc",
    accent:"#d50000",
    background: "#1e1e1e",
    text: "#fff",
    placeholder: "#fff",
    error:"red"
  },

};

export const myDefaultTheme = {
    ...DefaultTheme,
  colors: {
    primary: "#007acc",
    accent:"#d50000",
    text: "#000",
    placeholder: "#000",
    error:"red"
  },
};

export const errorTheme = {
  ...DefaultTheme,
  colors: {
    placeholder: "red",
    primary: "red",
  },
};
