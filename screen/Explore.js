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
  Card,
  Left,
  Right
} from "native-base";

import Tab from "./ExploreTab";
import ContentView from "./Drawer";

class Explore extends React.Component {
  static navigationOptions = {
    header: null
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    // console.log("explore ", this.props);
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<ContentView menu={this.props} />}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.3}
        panCloseMask={0.3}
      >
        <View>
          <View style={{ marginTop: 22 }}>
            <Header style={{ backgroundColor: "#001733" }}>
              <Left>
                <TouchableOpacity onPress={this.openDrawer.bind(this)}>
                  <Image
                    source={require("../images/menu.png")}
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>
              </Left>
              <View style={{ marginLeft: "20%", marginTop: 10 }}>
                <Image
                  source={require("../images/logo.png")}
                  style={{ height: 50, width: 120 }}
                />
              </View>

              {/* <TouchableOpacity onPress={()=>navigate('Cart',{id:this.props.navigation.state.params.response})}> */}
              <Right>
                <TouchableOpacity onPress={() => navigate("Search")}>
                  <Image
                    source={require("../images/search.png")}
                    style={{ height: 25, width: 25, marginTop: 0 }}
                  />
                </TouchableOpacity>
              </Right>
              {/* </TouchableOpacity> */}
            </Header>
          </View>
          <View
            style={{
              height: Dimensions.get("window").height,
              backgroundColor: "white"
            }}
          >
            <Tab />
          </View>
        </View>
      </Drawer>
    );
  }
}
export default Explore;
