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
  Item,
  Header,
  Body,
  Card,
  Content,
  Input,
  Left,
  Right
} from "native-base";
import StarRating from "react-native-star-rating";
import ContentView from "./Drawer";
import { Font } from "expo";

class Chat extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      chats: null,
      user_id: "",
      search:""
    };
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

  componentDidMount() {
    AsyncStorage.getItem("UID")
      .then(uid => {
       // console.log("NEW USERID", uid);
        this.setState({ user_id: uid }, () => {
          this.showAllChats();
        });
      })
      .catch(err => {
        console.log("Cant Get User_id From ASYNC STORAGE", err);
      });
  }

  showAllChats = () => {
    fetch(
      `http://foodfella.net/Rentree/get_all_chats.php?user_id=${
        this.state.user_id
      }`
    )
      .then(res =>
        res.json().then(chats => {
         // console.log("ALL CHATS", chats);
          this.setState({ chats: chats });
        })
      )
      .catch(err => {
        console.log("All Chats Error", err);
      });
  };

chatSearch =()=>{
  let formData = new FormData();

  formData.append("user_id", this.state.user_id);
  formData.append("name", this.state.search);

  fetch(
    `http://foodfella.net/Rentree/search_chats.php?`, {
      method: "POST",
      body: formData
    }
  )
    .then(res =>
      res.json().then(chats => {
        if(chats != null){
        console.log("search CHATS", chats);
        this.setState({ chats: chats });
      }
      else{
        alert('No chat of this name')
      }
      })
    )
    .catch(err => {
      console.log("search CHATS", err);
    });
}


  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.chats, "chats state in render");
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
            <Header style={{ backgroundColor: "#001733", height: 60 }}>
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
                {/* <Image
                  source={require("../images/search.png")}
                  style={{ height: 25, width: 25, marginTop: 0 }}
                /> */}
              </Right>
              {/* </TouchableOpacity> */}
            </Header>
          </View>

          <View style={{ height: Dimensions.get("window").height }}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="SEARCH MESSAGE"
                style={{
                  flex:0.85,
                  fontFamily: "open-sans-bold",
                  height: 32,
                  //width: "80%",
                  marginBottom: 10,
                  marginTop: '5%',
                  marginLeft: 10,
                  marginRight: 10,
                  paddingLeft: 10,
                  borderColor: "#001733",
                  borderWidth: 1
                }}
                value={this.state.search}
                onChangeText={search => this.setState({ search })}
              />
              <View
                style={{
flex:0.12,
                  // width: 50,
                  height: 34  ,
                  backgroundColor: "#19c6c0",
                  marginTop: "5%"
                }}
              >
                <TouchableOpacity onPress={()=>this.chatSearch()}>
                <Image
                  source={require("../images/searchs.png")}
                  style={{ width: 20, height: 20, margin: 5, marginLeft: 10 }}
                />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginBottom: 50 }}>
              <ScrollView>
                {this.state.chats &&
                  this.state.chats.map((chat, i) => {
                    console.log("chat in map ", chat);
                    return (
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            navigate("ChatOpen", {
                              seller_name: chat.seller_name,
                              seller_image: chat.seller_image,
                              seller_number: chat.seller_number,
                              user_id: chat.seller_id,
                              post_id: chat.post_id,
                              chat_id: chat.chat_no
                            })
                          }
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              height: 40,
                              marginBottom: 30,width:'100%'
                              // justifyContent:'space-between'
                            }}
                          >
                            <View style={{flexDirection:'row',width:'15%'}}>

                            <Image
                              source={{ uri: chat.seller_image }}
                              style={{ width: 50, height: 50, marginLeft: 10 }}
                              />
                              </View>
                              <View style={{marginLeft:10,width:'85%'}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                                <View style={{flexDirection:'row',}}>
                              {chat.is_new == "no" ? (
                                    <Text
                                      style={{
                                        fontFamily: "open-sans-bold",
                                        fontSize: 14,
                                        fontWeight: "400"
                                      }}
                                    >
                                      {chat.seller_name}{" "}
                                    </Text>
                                  ) : (
                                    <Text
                                      style={{
                                        fontFamily: "open-sans-bold",
                                        fontSize: 14,
                                        fontWeight: "500"
                                      }}
                                    >
                                      {chat.seller_name}{" "}
                                    </Text>
                                  )}
                                  
                              <View
                                    style={{
                                      backgroundColor: "#19c6c0",
                                      width: 20,
                                      borderRadius: 20,
                                      marginLeft: 5,
                                      height:20
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontFamily: "open-sans-bold",
                                        marginLeft: 5,
                                        fontWeight: "500",
                                        color: "#001733"
                                      }}
                                    >
                                      1
                                    </Text>
                                  </View>

                                  </View>

                                {/* DATE */}
                                <View style={{ marginRight: 0 }}>
                                  <Text
                                    style={{
                                      fontFamily: "open-sans-bold",
                                      color: "gray",
                                      fontSize: 12,marginRight:20
                                    }}
                                  >
                                    {chat.date_time}
                                  </Text>
                                </View>
                                  </View>
                                  <View style={{width:'80%'}}>
                                    {chat.is_new == "no" ? (
                                      <Text
                                        style={{
                                          fontFamily: "open-sans-bold",
                                          marginTop: 10,
                                          fontWeight: "400",
                                        }}
                                        // ellipsizeMode='tail'
                                        // numberOfLines={01}
                                      >

                                        {/* {chat.Item_Name}asdasdasdasdsadsad sadsd asdasd asd */}
                                        {chat.rply != null &&
                                         chat.rply.length < 35
                                        ? `${chat.rply}`
                                        : `${chat.rply.substring(0, 32)}...`}
 

                                      </Text>
                                    ) : (
                                      <Text
                                        style={{
                                          fontFamily: "open-sans-bold",
                                          marginTop: 10,
                                          fontWeight: "500"
                                        }}
                                      >
                                        {/* {chat.rply} */}
                                        {chat.rply != null &&
                                         chat.rply.length < 35
                                        ? `${chat.rply}`
                                        : `${chat.rply.substring(0, 32)}...`}
                                      </Text>
                                    )}
                                    </View>
                              </View>

                              </View>

                            {/* <View style={{ marginLeft: 10 }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between"
                                }}
                              >
                                <View style={{ flexDirection: "row" }}>
                                  

                                
                                </View>

                              </View>

                              
                            </View> */}

                                  {/* DATE  */}
                                 

                          {/* </View> */}
                        </TouchableOpacity>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}
export default Chat;
