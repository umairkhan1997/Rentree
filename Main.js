import React, { Component } from "react";
import AppNavigator from "./Navigation";
import Splash from "./screen/Splash";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { currentScreen: "Splash" };

    setTimeout(() => {
      this.setState({ currentScreen: "Login" });
    }, 7000);
  }

  render() {
    const { currentScreen } = this.state;
    let mainScreen = currentScreen === "Splash" ? <Splash /> : <AppNavigator />;
    return mainScreen;
  }
}

export default Main;
