import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  DarkTheme,
} from "react-native-paper";
import { createStore, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./src/store/reducers";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import Router from "./src/navigation/router";
import { myDefaultTheme, myDarkTheme } from "./src/colors/theme";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "movie", "theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

const persistedStore = persistStore(store);

const App = () => {
  const theme = useSelector((state) => state.theme);
  return (
    <View style={styles.container}>
      <PaperProvider theme={theme ? myDarkTheme : myDefaultTheme}>
        <Router />
      </PaperProvider>
    </View>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
