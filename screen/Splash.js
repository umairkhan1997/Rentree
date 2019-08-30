import React from "react";
import { ImageBackground } from "react-native";

class Splash extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require("../images/splashs.jpg")}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}

export default Splash;
