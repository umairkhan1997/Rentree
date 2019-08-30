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
  BackHandler,
  DeviceEventEmitter,
  Linking,
  Platform,
  AsyncStorage
} from "react-native";
import {
  Icon,
  Drawer,
  Item,
  Input,
  Header,
  Body,
  Card,
  Left,
  Right
} from "native-base";
import ContentView from "./Drawer";
import StarRating from "react-native-star-rating";
import ProfileTab from "./ProfileTab";
import Communications from "react-native-communications";
import { Font } from "expo";

class ChatOpen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      request: true,
      lastChat: null,
      chatMessage: "",
      user_id: "",
      post_id: "",
      chat_id: "",
      user_ids: null,
      strDate: "",
      firstUser: "",
      chatLength: null
    };
    this.backPressSubscriptions = new Set();
  }
  openDrawer = () => {
    this.drawer._root.open();
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  //   BackAndroid.addEventListener("hardwareBackPress", () => {
  //     if (navigator.getCurrentRoutes().length > 1) {
  //       navigator.pop()
  //       return true // do not exit app
  //     } else {
  //       return false // exit app
  //     }
  //   })
  //   componentDidMount = () => {
  //     DeviceEventEmitter.removeAllListeners('hardwareBackPress')
  //     DeviceEventEmitter.addListener('hardwareBackPress', () => {
  //       let invokeDefault = true
  //       const subscriptions = []

  //       this.backPressSubscriptions.forEach(sub => subscriptions.push(sub))

  //       for (let i = 0; i < subscriptions.reverse().length; i += 1) {
  //         if (subscriptions[i]()) {
  //           invokeDefault = false
  //           break
  //         }
  //       }

  //       if (invokeDefault) {
  //         BackHandler.exitApp()
  //       }
  //     })

  //     this.backPressSubscriptions.add(this.handleHardwareBack)
  //   }

  //   componentWillUnmount = () => {
  //     DeviceEventEmitter.removeAllListeners('hardwareBackPress')
  //     this.backPressSubscriptions.clear()
  //   }

  //   handleHardwareBack = () => {
  //       this.props.navigation.navigate('AllDeal')
  //    }

  componentDidMount() {
    AsyncStorage.getItem("UID")
      .then(uid => {
        console.log("NEW USERID", uid);
        this.setState({ user_ids: uid }, () => {});
      })
      .catch(err => {
        console.log("Cant Get User_id From ASYNC STORAGE", err);
      });
    this.setState(
      {
        user_id: this.props.navigation.state.params.user_id,
        post_id: this.props.navigation.state.params.post_id,
        chat_id: this.props.navigation.state.params.chat_id
      },
      () => {
        this.getLastChat();
      }
    );
    // console.log("CHAT CHAT ", this.props.navigation.state.params)
  }

  getLastChat = () => {
    fetch(
      `http://foodfella.net/Rentree/get_all_messages.php?chat_id=${
        this.state.chat_id
      }`
    )
      .then(res =>
        res.json().then(lastChat => {
          // var startDate =lastChat.rply;
          // var result;
          // result = startDate.split("start date ",10)
          this.setState({
            lastChat: lastChat,
            firstUser: lastChat[0].userid,
            chatLength: lastChat.length
            //  strDate:result
          });
          // this.setState({lastChat,
          //   chatId:lastChat.chat_id

          // })
          console.log(lastChat.length, " lengthhhhhhhhhhhh");
        })
      )
      .catch(err => {
        console.log("Last Chat Error ", err);
      });
  };

  postChat = (user_ids, post_ids, chatMessages) => {
    let user_id = parseInt(user_ids);
    let post_id = parseInt(post_ids);
    let chat_id = parseInt(this.state.chat_id);
    console.log("details", user_id, post_id, chatMessages, chat_id);
    fetch(
      `http://foodfella.net/Rentree/post_chat.php?user_id=${user_id}&post_id=${post_id}&chat_id=${chat_id}&reply=${chatMessages}`,
      {
        method: "POST"
        // headers:{"Content-Type":"application/json"},
        // body:JSON.stringify({
        //   user_id:user_id,
        //   post_id:post_id,
        //   chat_id:this.state.chat_id,
        //   reply:chatMessage
        // })
      }
    )
      .then(res => {
        console.log("POSTING CHAT RESPONSE", res);
        if (res._bodyInit != "success") {
          this.setState({
            chatMessage: ""
          });
          //alert("message sent")
          this.getLastChat();
        } else {
          alert("message not sent");
        }
      })
      .catch(err => {
        console.log("Chat Posting  Message Error ", err);
      });
  };
  Accept = () => {
    fetch(
      `http://foodfella.net/Rentree/update_request.php?post_id=${
        this.state.post_id
      }&user_id=${this.state.user_id}`
    )
      .then(res => {
        console.log("Rentree/update_request");

        if (res._bodyInit == '"success"') {
          alert("Request Accepted");
          this.setState({
            accpetState: 1
          });
        }
        if (res._bodyInit != '"success"') {
          alert("Request Not Accepted");
          this.setState({
            accpetState: 0
          });
        }
      })
      .catch(err => {
        console.log(err, "error occur");
      });
  };

  Reject = () => {
    fetch(
      `http://foodfella.net/Rentree/reject_request.php?post_id=${
        this.state.post_id
      }&user_id=${this.state.user_id}&chat_id=${
        this.state.chat_id
      }&from_date=2019-07-25&to_date=2019-07-31`
    )
      .then(res => {
        if (res._bodyInit == '"success"') {
          alert("Request Accepted");
          this.setState({
            accpetState: 1
          });
        }
        if (res._bodyInit != '"success"') {
          alert("Request Not Accepted");
          this.setState({
            accpetState: 0
          });
        }
      })
      .catch(err => {
        console.log(err, "error occur");
      });
  };

  callNumber = phone => {
    console.log("callNumber ----> ", phone);
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { navigate } = this.props.navigation;
    console.log(
      this.state.strDate,
      this.state.firstUser,
      this.state.chatLength,
      " start date "
    );

    // console.log(this.state.chatLength, "this.state.chatLength");

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
        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
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

              <Right>
                <TouchableOpacity onPress={() => navigate("Chat")}>
                  <Image
                    source={require("../images/left-arrow.png")}
                    style={{ height: 25, width: 25, marginTop: 0 }}
                  />
                </TouchableOpacity>
              </Right>
            </Header>
          </View>

          <View
            style={{
              borderBottomColor: "#0B3669",
              height: 60,
              borderBottomWidth: 1,
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: this.props.navigation.state.params.seller_name }}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <Text style={{ marginTop: 20, fontSize: 14, fontWeight: "500" }}>
                {this.props.navigation.state.params.seller_name}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginRight: 10, marginTop: 10 }}
            >
              {/* <Image source={require('../images/videocam-filled-tool.png')} style={{width:20,height:20,margin:10}}/> */}
              <TouchableOpacity
                onPress={() =>
                  this.callNumber(
                    this.props.navigation.state.params.seller_number
                  )
                }
              >
                <Image
                  source={require("../images/phone-receiver.png")}
                  style={{ width: 20, height: 20, margin: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* STARTS OF REQUESTED */}
          {this.state.chatLength > 1 ? (
            <View>
              {this.state.user_ids == this.state.firstUser ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "#EBEBEB"
                  }}
                >
                  <View
                    style={{
                      width: 100,
                      backgroundColor: "#0B3669",
                      marginTop: -10
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "open-sans-bold",
                        color: "white",
                        marginLeft: 10
                      }}
                    >
                      REQUESTED
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "#EBEBEB"
                  }}
                >
                  <TouchableOpacity onPress={() => this.Accept()}>
                    <View
                      style={{
                        width: 100,
                        backgroundColor: "#0B3669",
                        marginTop: -10,
                        justifyContent: "center",
                        flexDirection: "row",
                        marginRight: 10
                      }}
                    >
                      <Text
                        style={{ fontFamily: "open-sans-bold", color: "white" }}
                      >
                        ACCEPTED
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 100,
                      backgroundColor: "#0B3669",
                      marginTop: -10,
                      justifyContent: "center",
                      flexDirection: "row",
                      marginLeft: 10
                    }}
                  >
                    <Text
                      style={{ fontFamily: "open-sans-bold", color: "white" }}
                    >
                      REJECTED
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ) : null}
          {/* HEADER ENDS */}
          <View
            style={{
              backgroundColor: "#EBEBEB",
              flex: 1.7,
              justifyContent: "center"
            }}
          >
            <ScrollView>
              {this.state.lastChat &&
                this.state.lastChat.map((lastChat, i) => {
                  return (
                    <View>
                      {this.state.user_ids == lastChat.userid ? (
                        <View
                          style={{
                            width: "90%",
                            marginLeft: "7%",
                            backgroundColor: "#0B3669",
                            marginTop: 10
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "open-sans-bold",
                              fontSize: 12,
                              color: "white",
                              paddingLeft: 10,
                              paddingTop: 10
                            }}
                          >
                            {lastChat.rply}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-end"
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "open-sans-bold",
                                fontSize: 12,
                                color: "white",
                                margin: 5
                              }}
                            >
                              {lastChat.date_time}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View
                          style={{
                            width: "90%",
                            marginLeft: "3%",
                            backgroundColor: "#FFFFFF",
                            marginTop: 10
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "open-sans-bold",
                              fontSize: 12,
                              color: "#0B3669",
                              paddingLeft: 10,
                              paddingTop: 10
                            }}
                          >
                            {lastChat.rply}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-end"
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "open-sans-bold",
                                fontSize: 12,
                                color: "#0B3669",
                                margin: 5
                              }}
                            >
                              {lastChat.date_time}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
            </ScrollView>
          </View>

          <View
            style={{
              backgroundColor: "#EBEBEB",
              flex: 0.3,
              justifyContent: "flex-end"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "center",
                  borderWidth: 0.5,
                  borderRadius: 5,
                  width: "80%",
                  marginLeft: "5%",
                  height: 35,
                  backgroundColor: "#E8EAED",
                  marginBottom: 10
                }}
              >
                <Item style={{ width: "90%" }}>
                  <Input
                    placeholder="Type a message ..."
                    value={this.state.chatMessage}
                    onChangeText={chatMessage => this.setState({ chatMessage })}
                  />
                  {/* <Image
                    source={require("../images/frame-landscape.png")}
                    style={{ width: 20, height: 20 }}
                  />
                  <TouchableOpacity onPress={() => this.search()}>
                    <Image
                      source={require("../images/microphone-black-shape.png")}
                      style={{ width: 20, height: 20, marginLeft: 5 }}
                    />
                  </TouchableOpacity> */}
                </Item>
              </View>
              <View style={{ marginLeft: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.postChat(
                      this.state.user_ids,
                      this.state.post_id,
                      this.state.chatMessage
                    );
                  }}
                >
                  <Image
                    source={require("../images/right-arrow.png")}
                    style={{
                      marginTop: 12,
                      width: 20,
                      height: 20,
                      marginLeft: 5
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Drawer>
    );
  }
}
export default ChatOpen;
