import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  Image,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Icon,
  Drawer,
  Item as FormItem,
  Header,
  Body,
  Card
} from "native-base";
import DriverDrawer from "./DriverDrawer";
import DriverMaps from "./Map";
class DriverHome extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  openDrawer = () => {
    this.drawer._root.open();
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<DriverDrawer menu={this.props} />}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.3}
        panCloseMask={0.3}
      >
        <View style={{ marginTop: 22 }}>
          <Header style={{ backgroundColor: "#e1b827" }}>
            <Body
              style={{
                flex: 1,
                justifyContent: "flex-start",
                flexDirection: "row",
                marginLeft: 8
              }}
            >
              <View>
                <TouchableOpacity onPress={this.openDrawer.bind(this)}>
                  <Image
                    source={require("../images/menus.png")}
                    style={{ height: 15, width: 15, marginTop: 2 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text
                  style={{
                    marginLeft: "42%",
                    fontSize: 20,
                    color: "white",
                    fontWeight: "500"
                  }}
                >
                  Affro Eat
                </Text>
              </View>
            </Body>
            <TouchableOpacity onPress={() => navigate("")}>
              <View
                style={{
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  marginTop: 20
                }}
              >
                <Image
                  source={require("../images/cart.png")}
                  style={{ height: 25, width: 25, marginTop: -5 }}
                />
              </View>
            </TouchableOpacity>
          </Header>
        </View>

        <DriverMaps />
      </Drawer>
    );
  }
}

export default DriverHome;
