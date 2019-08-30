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
  Card,
  Button,
  DatePicker
} from "native-base";
import StarRating from "react-native-star-rating";
import Dialog, {
  SlideAnimation,
  DialogContent
} from "react-native-popup-dialog";
import { Constants, MapView, Location, Permissions } from "expo";
import CustomMap from "./map";
import { Font } from "expo";

class ItemShow extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      visible: false,
      image: this.props.navigation.state.params.Imagename,
      Item_Name: this.props.navigation.state.params.Item_Name,
      Item_Rent: this.props.navigation.state.params.Item_Rent,
      Location: this.props.navigation.state.params.Location,
      locations: {coords: { latitude: Number(this.props.navigation.state.params.latitude), 
        longitude: Number(this.props.navigation.state.params.longitude)}},
     // images: this.props.navigation.state.params.images,
      data: this.props.navigation.state.params.data,
      reviews: [],
      chosenDate: null,
      chosenDateEnd: null,
      startDate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        1 +
        "-" +
        new Date().getDate(),
      endDate: null,
      priceResponce: [],
      user_id: "",
      daysTotal: null,
      totalRent: null
    };
    this.setDate = this.setDate.bind(this);
    this.setDateEnd = this.setDateEnd.bind(this);
  }
  //    openDrawer = () => {
  //        this.drawer._root.open()
  //    };
  //    closeDrawer = () => {
  //        this.drawer._root.close()
  //    };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  componentDidMount() {
    AsyncStorage.getItem("UID")
      .then(uid => {
        // console.log("NEW USERID",uid)
        this.setState({ user_id: uid }, () => {});
      })
      .catch(err => {
        console.log("Cant Get User_id From ASYNC STORAGE", err);
      });

    fetch(`http://foodfella.net/Rentree/reviews/${this.state.data.ad_id}`)
      .then(res => {
        res.json().then(data => {
          console.log("reviews data", data);
          this.setState({
            reviews: data
          });
        });
      })
      .catch(err => {
        console.log("reviews data err", err);
      });
  }
  setDate(newDate) {
    //  this.setState({ chosenDate: newDate });
    let val = newDate.toLocaleDateString();
    val.toString();
    // console.log("splitted",val.split("/"))
    let sec = val.split("/");
    let bec = sec[2] + "-" + sec[0] + "-" + sec[1];
    console.log("THE NEW DATE", bec);
    this.setState({ chosenDate: bec, startDate: bec });
  }

  // chatGo=()=>{
  //     setTimeout(()=>{
  //         console.log('Done some tasks for about 3 seconds')
  //         // this.setState({ currentScreen: 'Login' }),
  //         this.props.navigation.navigate('ChatEx')
  //     }, 3000)
  // }
  sentToChat = () => {
    fetch(
      `http://foodfella.net/Rentree/get_all_chats.php?user_id=${
        this.state.user_id
      }`
    )
      .then(res =>
        res.json().then(chats => {
          let { navigate } = this.props.navigation;
          console.log("ALL CHATS", chats);
          //  this.setState({chats:chats})
          navigate("ChatOpenEx", {
            seller_number: chats[0].seller_number,
            user_id: chats[0].seller_id,
            post_id: chats[0].post_id,
            chat_id: chats[0].chat_no
          });
        })
      )
      .catch(err => {
        console.log("All Chats Error", err);
      });
  };

  send_Request_For_Rent = () => {
    let renter_id = parseInt(this.props.navigation.state.params.Renter_Id);
    let requester_id = parseInt(this.state.user_id);
    let post_id = parseInt(this.props.navigation.state.params.Post_Id);

    console.log(
      "ALL DATA FOR RENT",
      typeof renter_id,
      typeof requester_id,
      typeof post_id
    );

    // fetch(`http://foodfella.net/Rentree/rent_request.php?renter_id=${renter_id}&
    // &requester_id=${requester_id}
    // &post_id=${post_id}`,{
    //     method:"POST",
    //     // headers:{"Content-Type":"application/json"},
    //     // body:JSON.stringify({
    //     //     renter_id,
    //     //     requester_id,
    //     //     post_id
    //     // })
    // }).then(res=>{
    //     let {navigate} = this.props.navigation;
    //     console.log("response for request a post",res._bodyInit)
    //     if(res._bodyInit == "SUCCESS"){
    //          this.props.navigation.navigate('Explore',{})
    //     }else{
    //         alert("Not Inserted")
    //     }

    // }).catch(err => {
    //     console.log("Request Not Posted Error ItemShow",err)
    // })

    // <TouchableOpacity onPress={() => {
    //     this.setState({ visible: false });
    //   }}>
    console.log(this.state.chosenDate,this.state.chosenDateEnd,'in function')
    if(this.state.chosenDate!=null && this.state.chosenDateEnd!=null){
    fetch(
      `http://foodfella.net/Rentree/post_chat.php?user_id=${requester_id}&post_id=${post_id}&from_date=${
        this.state.chosenDate
      }&to_date=${this.state.chosenDateEnd}&
    total_price=${this.state.Item_Rent}`,
      {
        method: "POST"
        // headers:{"Content-Type":"application/json"},
        // body:JSON.stringify({
        //     renter_id,
        //     requester_id,
        //     post_id
        // })
      }
    )
      .then(res => {
        let { navigate } = this.props.navigation;
        console.log("response for request a post", res._bodyInit);
        if (res._bodyInit != "SUCCESS") {
          this.setState({ visible: false });
          console.log("if is working");
          // this.chatGo()
          this.sentToChat();
          //navigate('ChatEx')
        } else {
          alert("Not Inserted");
        }
      })
      .catch(err => {
        console.log("Request Not Posted Error ItemShow", err);
      });
    }
    else{
      alert('Please Select Start and End Date');
    }
  };

  setDateEnd(newDate) {
    // console.log("THE NEW DATE",newDate.toDateString())
    // console.log("THE NEW DATE",newDate.toLocaleDateString())
    let val = newDate.toLocaleDateString();
    val.toString();
    // console.log("splitted",val.split("/"))
    let sec = val.split("/");
    let bec = sec[2] + "-" + sec[0] + "-" + sec[1];
    console.log("THE NEW DATE", bec);
    this.setState({ chosenDateEnd: bec });

    // let getDate =  Number(newDate)
    // console.log("AND NUMBER WALI",getDate)
    // this.setState({ chosenDateEnd: newDate });
    const { startDate, chosenDateEnd, Item_Rent } = this.state;
    let formData = new FormData();
    formData.append("startDate", startDate);
    formData.append("chosenDateEnd", chosenDateEnd);
    formData.append("Item_Rent", Item_Rent);
    // let msDiff=(Number(chosenDateEnd)).getTime() - (Number(startDate)).getTime()
    let msDiff =
      new Date(chosenDateEnd).getTime() - new Date(startDate).getTime();
    let daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    this.setState({
      daysTotal: daysTill30June2035,
      totalRent: Item_Rent * daysTill30June2035
    });
    console.log(
      startDate,
      chosenDateEnd,
      msDiff,
      daysTill30June2035,
      "days remaining "
    );

    // var msDiff = new Date("June 30, 2035").getTime() - new Date().getTime();    //Future date - current date
    // var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    // console.log(daysTill30June2035, "1",typeof(new Date("June 30, 2035").getTime()),"2",typeof(new Date("June 30, 2035")),"3",);
    //    fetch(`http://foodfella.net/Rentree/timeline.php?sdate=${this.state.startDate}&edate=${this.state.chosenDateEnd}&price=${this.state.Item_Rent}`)
    //    //fetch(`http://foodfella.net/Rentree/timeline.php?sdate=2019-05-30&edate=2019-06-30&price=600 `)
    // //    fetch(`http://foodfella.net/Rentree/timeline.php`,
    // //    {
    // //     method: "POST",
    // //     body:formData
    // //       })
    //       .then(res=>{
    //         res.json().then(data=>{
    //             console.log("priceResponce data",data)
    //             this.setState({

    //                 priceResponce:data,

    //             })
    //         })
    //     })
    //     .catch(err=>{
    //         console.log("reviews data err",err)
    //     })
  }
  render() {
    console.log(typeof this.state.chosenDate,this.state.chosenDate, this.state.chosenDateEnd, "Date");
    // console.log(this.state.data,"data")
    // console.log(this.state.startDate,"Date")
    const { navigate } = this.props.navigation;
    // console.log(this.state.visible,"visible")
    // console.log(this.props,"props itemshow")
    // console.log(this.state.data.Latitute,'item map loca')
    console.log(this.state.reviews, "item reviews");
    return (
      <View style={{ marginTop: 0, marginTop: -10 }}>
        <ScrollView>
          <View
            style={{
              //height: Dimensions.get("window").height,
              marginBottom: 150
            }}
          >
            <Card style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 0
                }}
              >
                <TouchableOpacity onPress={() => navigate("AllDeals")}>
                  <Image
                    source={require("../images/left-arrow.png")}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                  />
                </TouchableOpacity>
                {/* <Image source={require('../images/shopping-cart.png')} style={{width:20,height:20,marginRight:10}}/> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 0
                }}
              >
                <Image
                  source={{ uri: this.state.image }}
                  style={{ width: 250, height: 350 }}
                />
              </View>
            </Card>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                position: "relative",
                bottom: 40
              }}
            >
              <Card
                style={{
                  height: 200,
                  width: "80%",
                  borderColor: "#19c6c0",
                  borderWidth: 1
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#0B3669",
                      marginTop: 20
                    }}
                  >
                    {this.state.Item_Name}
                  </Text>
                </View>
                <View
                  style={{ width: "50%", marginLeft: "25%", marginTop: 10 }}
                >
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={rating => this.onStarRatingPress(rating)}
                    fullStarColor={"#0B3669"}
                    starSize={20}
                  />
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#0B3669",
                      marginTop: 10
                    }}
                  >
                    Rs .
                  </Text>
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#0B3669",
                      marginTop: 10
                    }}
                  >
                    {this.state.Item_Rent}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 16,
                      fontWeight: "400",
                      color: "#0B3669",
                      marginLeft: 10,
                      marginTop: 10
                    }}
                  >
                    per day
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10
                  }}
                >
                  <Image
                    source={require("../images/location.png")}
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#0B3669",
                      marginTop: 10
                    }}
                  >
                    {this.state.Location}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  {/* <TouchableOpacity  onPress={() => {
      this.setState({ visible: true });
    }}> */}
                  <View
                    style={{
                      marginTop: 28,
                      width: 80,
                      backgroundColor: "#19c6c0",
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ visible: true });
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 16,
                          fontWeight: "500",
                          color: "white",
                          padding: 10
                        }}
                      >
                        Book
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* </TouchableOpacity> */}
                </View>
              </Card>
            </View>
          </View>
        </ScrollView>
        <View style={styles.container}>
          <Dialog
            visible={this.state.visible}
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
            dialogAnimation={
              new SlideAnimation({
                slideFrom: "bottom"
              })
            }
          >
            <DialogContent>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%", marginBottom: 20 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ visible: false });
                    }}
                  >
                    <View
                      style={{ margin: 10, marginTop: 25, marginLeft: -2 }}
                      onPress={() => {
                        this.setState({ visible: false });
                      }}
                    >
                      <Image
                        source={require("../images/cancel.png")}
                        style={{ width: 30, height: 30 }}
                      />
                    </View>
                  </TouchableOpacity>

                  <View style={{ width: "100%", height: 200, marginTop: -10 }}>
                    <Image
                      source={{ uri: this.state.data.images }}
                      style={{ width: "100%", height: "100%" }}
                    />
                    
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "open-sans-bold",
                        color: "#0B3669",
                        fontSize: 16,
                        fontWeight: "500"
                      }}
                    >
                      {this.state.Item_Name}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginLeft: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "500",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        PRODUCT PRIZE
                      </Text>
                    </View>
                    <View style={{ marginRight: 5 }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "400",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        RS {this.state.Item_Rent} per day
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginLeft: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "500",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        PRODUCT RATING
                      </Text>
                    </View>
                    <View style={{ marginRight: 5 }}>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={rating => this.onStarRatingPress(rating)}
                        fullStarColor={"#19c6c0"}
                        starSize={20}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      marginLeft: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "500",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        LENDER NAME
                      </Text>
                    </View>
                    <View style={{ marginRight: 5 }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "400",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        {this.state.data.renter_name}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginLeft: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "500",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        LENDER RATING
                      </Text>
                    </View>
                    <View style={{ marginRight: 5 }}>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={rating => this.onStarRatingPress(rating)}
                        fullStarColor={"#19c6c0"}
                        starSize={20}
                      />
                    </View>
                  </View>

                  <View style={{ marginLeft: 5, marginTop: 20 }}>
                    <Text
                      style={{
                        fontFamily: "open-sans-bold",
                        fontSize: 14,
                        color: "#0B3669",
                        fontWeight: "500"
                      }}
                    >
                      PRODUCT DESCRIPTION{" "}
                    </Text>
                    <Text
                      style={{ fontFamily: "open-sans-bold", color: "#0B3669" }}
                    >
                      displays the image and text inside the Modal when we click
                      thedisplays the image and text inside the Modal when we
                      click the
                    </Text>
                  </View>

                  {/* map */}
                  <View style={{ borderColor: "#19c6c0", borderWidth: 1 }}>
                    {/* <CustomMap
                      Latitute={Number(this.state.data.latitude)}
                      Longitude={Number(this.state.data.longitude)}
                    /> */}
                      <View style={styles.containerss}>
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{ latitude: this.state.locations.coords.latitude, longitude: this.state.locations.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          // onRegionChange={this._handleMapRegionChange}
        >
    <MapView.Marker
      coordinate={this.state.locations.coords}
      title="My Marker"
      description="Some description"
    />
        </MapView>
      
        {/* <Text>
          Location: {this.state.locationResult}
        </Text> */}
      
      </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 0
                    }}
                  >
                    {/* <Text style={{marginRight:10,textDecorationLine:"underline"}}>Start Date</Text> */}
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date()}
                      // maximumDate={new Date(2018, 12, 31)}
                      dateFormat="YYYY-MM-DD"
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Start date"
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={this.setDate}
                      disabled={false}
                    />

                    <Text
                      style={{
                        fontFamily: "open-sans-bold",
                        marginRight: 10,
                        marginTop: 10
                      }}
                    >
                      {" "}
                      --{" "}
                    </Text>
                    {/* <Text style={{textDecorationLine:"underline"}}>End Date </Text> */}
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date()}
                      // maximumDate={new Date(2018, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="End date"
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={this.setDateEnd}
                      disabled={false}
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "500",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        PRICE x DAYS
                      </Text>
                    </View>
                    <View style={{ marginRight: 5 }}>
                      {this.state.daysTotal != null ? (
                        <Text
                          style={{
                            fontFamily: "open-sans-bold",
                            fontSize: 14,
                            fontWeight: "400",
                            marginTop: 10,
                            color: "#0B3669"
                          }}
                        >
                          {this.state.totalRent}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontFamily: "open-sans-bold",
                            fontSize: 14,
                            fontWeight: "400",
                            marginTop: 10,
                            color: "#0B3669"
                          }}
                        >
                          __
                        </Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      marginLeft: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "500",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        WEEKLY DISCOUNT
                      </Text>
                    </View>
                    <View style={{ marginRight: 5 }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "400",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        __
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginLeft: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "500",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        SERVICE FEE
                      </Text>
                    </View>
                    <View style={{ marginRight: 5 }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "400",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        __
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginLeft: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "500",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        TOTAL PRICES
                      </Text>
                    </View>
                    <View style={{ marginRight: 5 }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "400",
                          marginTop: 10,
                          color: "#0B3669"
                        }}
                      >
                        __
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Button
                      onPress={() => {
                        this.send_Request_For_Rent();
                      }}
                      style={{
                        marginTop: 30,
                        color: "white",
                        backgroundColor: "#19c6c0",
                        marginHorizontal: "0%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 0,
                        height: 30,
                        marginBottom: 0
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 14,
                          fontWeight: "500",
                          textAlign: "center"
                        }}
                      >
                        REQUEST RENT
                      </Text>
                    </Button>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: "open-sans-bold",
                        marginLeft: 5,
                        marginTop: 10,
                        fontWeight: "500",
                        fontSize: 14,
                        color: "#0B3669"
                      }}
                    >
                      PRODUCT REVIEWS
                    </Text>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    {this.state.reviews &&
                      this.state.reviews.map(data => {
                        return (
                          <View style={{ marginBottom: 5 }}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                              }}
                            >
                              <View>
                                <View style={{ flexDirection: "row" }}>
                                  <Image
                                    source={require("../images/man.jpg")}
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginRight: 5
                                    }}
                                  />
                                  <View>
                                    <Text>{data.Name}</Text>
                                    <Text>{data.date}</Text>
                                  </View>
                                </View>
                              </View>
                              <View>
                                <StarRating
                                  disabled={true}
                                  maxStars={5}
                                  rating={data.rating}
                                  selectedStar={rating =>
                                    this.onStarRatingPress(rating)
                                  }
                                  fullStarColor={"#19c6c0"}
                                  starSize={20}
                                />
                              </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                              <Text
                                style={{
                                  fontFamily: "open-sans-bold",
                                  color: "#0B3669"
                                }}
                              >
                                Review : {data.detail}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                  </View>
                </View>
              </ScrollView>
            </DialogContent>
          </Dialog>
        </View>
      </View>
    );
  }
}
export default ItemShow;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: Dimensions.get("window").height
  },
  containerss: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  containers: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    marginTop: 22
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
const styless = StyleSheet.create({});
