import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Font } from "expo";
import Main from "./Main";
import { store, persistor } from "./Redux/store";

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      "open-sans-bold": require("./assets/fonts/segoeui.ttf")
    });
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
