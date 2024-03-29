import { DarkTheme, DefaultTheme } from "@react-navigation/native";


export const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#d50000",
    secondary: "#ffffff",
    icon: "#Fff",
    secondaryIcon: "#e80000",
    text: "#000",
    border:"#fff",
    opposite:"#1e1e1e",
    card:"#fff",
    error:"#d50000",
    dim:"#d7d7d7",
    nav:"#1e1e1e"
  },
};

export const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#1e1e1e",
    secondary: "#000",
    icon: "#d50000",
    secondaryIcon: "#d50000",
    text: "#fff",
    border:"#dbdbdb",
    opposite:"#d50000",
    card:"#1e1e1e",
    error:"#d50000",
    dim:"#1e1e1e",
    nav:"#fff"
  },
};
