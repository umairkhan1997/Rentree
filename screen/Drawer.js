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
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  Icon,
  Drawer,
  Item as FormItem,
  Header,
  Body,
  Card
} from "native-base";
import { Font } from "expo";

class ContentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      user_info: [],
      userId: null

      ///user_id:this.props.menu.navigation.state.params.response,
    };
  }

  // console.log(this.props.menu.navigation.state.params.response[0].Id)
  // this.setState({
  //     userId:this.props.menu.navigation.state.params.response[0].Id
  // })
  componentDidMount() {
    AsyncStorage.getItem("UID")
      .then(uid => {
        console.log("NEW USERID", uid);
        this.setState({ user_id: uid }, () => {});
        fetch(`http://foodfella.net/Rentree/profile.php?user_id=${uid}`)
          .then(res => {
            res.json().then(data => {
              console.log("user_ads data", data);
              this.setState({
                name: data[0].user_name
                // profile:data,
                //item_id:data.Id
              });
            });
          })
          .catch(err => {
            console.log("categories data err", err);
          });
      })
      .catch(err => {
        console.log("Cant Get User_id From ASYNC STORAGE", err);
      });
  }

  logOut = () => {
    AsyncStorage.clear()
      .then(() => {
        this.props.menu.navigation.navigate("SignIn");
      })
      .catch(err => {
        alert("Can't clear the storage");
      });
  };

  render() {
    //   console.log("responce home :", this.state.user_id, this.props.menu.navigation.state.params.response)
    const { navigate } = this.props.menu.navigation;
    // console.log("responce drawer :",this.props.menu.navigation);

    return (
      <View
        style={{
          height: Dimensions.get("window").height,
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            flex: 0.8,
            backgroundColor: "#001733",
            height: "25%",
            width: "100%"
          }}
        >
          <Image
            source={require("../images/logo.png")}
            style={{
              marginTop: "5%",
              width: 150,
              height: 150,
              marginLeft: "20%"
            }}
          />
          <Text
            style={{
              fontFamily: "open-sans-bold",
              marginTop: -40,
              fontSize: 18,
              fontWeight: "500",
              color: "white",
              marginLeft: "20%"
            }}
          >
            Welcome {this.state.name} !
          </Text>
        </View>

        <View style={{ flex: 1.8 }}>
          <TouchableOpacity
            onPress={() => navigate("History", { userId: this.state.userId })}
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginVertical: 10
              }}
            >
              <Image
                source={require("../images/history-clock-button.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 18,
                  marginLeft: 10
                }}
              >
                History
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 0.9,
              borderBottomColor: "#0B3669",
              width: "90%",
              marginLeft: "5%"
            }}
          />

          <TouchableOpacity onPress={() => navigate("AboutUs")}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginVertical: 10
              }}
            >
              <Image
                source={require("../images/icon.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                  marginLeft: 10
                }}
              >
                ABOUT US
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              borderBottomWidth: 0.9,
              borderBottomColor: "#0B3669",
              width: "90%",
              marginLeft: "5%"
            }}
          />

          <TouchableOpacity onPress={() => navigate("Help")}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginVertical: 10
              }}
            >
              <Image
                source={require("../images/question-mark.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                  marginLeft: 10
                }}
              >
                HELP
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 0.9,
              borderBottomColor: "#0B3669",
              width: "90%",
              marginLeft: "5%"
            }}
          />

          <TouchableOpacity onPress={() => navigate("Setting")}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginVertical: 10
              }}
            >
              <Image
                source={require("../images/setting.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                  marginLeft: 10
                }}
              >
                SETTINGS
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 0.9,
              borderBottomColor: "#0B3669",
              width: "90%",
              marginLeft: "5%"
            }}
          />

          <TouchableOpacity onPress={() => navigate("Timeline")}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginVertical: 10
              }}
            >
              <Image
                source={require("../images/timeline.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                  marginLeft: 10
                }}
              >
                TIMELINE
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={{position:'relative',zIndex:1,top:100}}> */}
        <View style={{ flex: 0.4 }}>
          <TouchableOpacity
            onPress={() => {
              this.logOut();
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginVertical: 10
              }}
            >
              <Image
                source={require("../images/signout.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                  marginLeft: 10
                }}
              >
                LOG OUT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ContentView;
