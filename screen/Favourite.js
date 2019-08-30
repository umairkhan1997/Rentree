import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Card } from "native-base";
import StarRating from "react-native-star-rating";
import { Constants, MapView } from "expo";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { updateUser, updateFavourites } from "../Redux/actions/authActions";

let like_Post_id_Array = [];

class Favourite extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      loca: "LOCATION",
      ima: true,
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      locationResult: null,
      latitude: 37.78825,
      longitude: -122.4324,
      resta: [],
      loading: false
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  location() {
    if (this.state.loca === "LOCATION") {
      this.setState({
        loca: "IMAGE",
        ima: false
      });
    }
    if (this.state.loca === "IMAGE") {
      this.setState({
        loca: "LOCATION",
        ima: true
      });
    }
  }

  CrossButtonClick(post_id) {
    this.props.user &&
      this.props.user.user_ID &&
      (this.setState({
        loading: true
      }),
      fetch(
        `http://foodfella.net/Rentree/remove_favourite_item.php?user_id=${
          this.props.user.user_ID
        }&post_id=${post_id}`
      )
        .then(res => {
          res.json().then(data => {
            console.log("Rentree/remove_favourite_item >>>", data);

            if (data == "success") {
              fetch(
                `http://foodfella.net/Rentree/get_user_favourites.php?user_id=${
                  this.props.user.user_ID
                }`
              )
                .then(res => {
                  res.json().then(data => {
                    // console.log("favourites data", data);

                    if (data != "No Data Found") {
                      data.map(value => {
                        like_Post_id_Array.push(value.post_id);
                      });

                      this.props.updateFavourites({
                        favourite_Data: data,
                        like_Post_id: like_Post_id_Array
                      });
                    } else {
                      this.props.updateFavourites({
                        favourite_Data: data
                      });
                    }
                    this.setState({
                      loading: false
                    });
                  });
                })
                .catch(err => {
                  console.log("allDeal data err", err);
                  this.setState({
                    loading: false
                  });
                });
            }
          });
        })
        .catch(err => {
          console.log("allDeal data err", err);
          this.setState({
            loading: false
          });
        }));
  }

  componentDidMount() {
    // this._getLocationAsync();
    // console.log("MAP PROPS", this.props);
    this.setState({
      latitude: this.props.lat,
      longitude: this.props.lng
    });

    AsyncStorage.getItem("UID")
      .then(uid => {
        // console.log("NEW USERID", uid);
        this.setState({ user_id: uid }, () => {});

        fetch(
          `http://foodfella.net/Rentree/get_user_favourites.php?user_id=${uid}`
        )
          .then(res => {
            res.json().then(data => {
              console.log("fouvarite data",data)
              // var images = data[0].images;
              // var result;
              // result = images.split(",")
              // console.log("NO IMAGES",images);
              // console.log("IMAGES RESULT",result);
              this.setState({
                resta: data
                // images:result,
              });
              //   this.setState({

              //       resta:data,

              //   })
            });
          })
          .catch(err => {
            console.log("allDeal data err", err);
          });
      })
      .catch(err => {
        console.log("Cant Get User_id From ASYNC STORAGE", err);
      });
  }

  // _handleMapRegionChange = mapRegion => {
  //   this.setState({ mapRegion });
  // };

  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== "granted") {
  //     this.setState({
  //       locationResult: "Permission to access location was denied",
  //       location
  //     });
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   this.setState({ locationResult: JSON.stringify(location), location });
  // };

  render() {
    const { navigate } = this.props.navigation;
    let coords = {
      latitude: 37.78825,
      longitude: -122.4324
    };
    console.log(this.props.favourites.favourite_Data, "Favourites.js this.props");
    return (
      <View style={{ marginBottom: 130 }}>
        <Spinner
          visible={this.state.loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        {/* <View style={{marginLeft:'5%'}}>

    <Card style={{height:200,width:'95%',flexDirection:"row"}}>
<View style={{flex:1}}>
<Text style={{fontSize:16,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:5}}>SKETCH SNEAKERS 2.0</Text>
<View style={{flexDirection:'row',marginLeft:5}}>
            <Text style={{fontSize:16,fontWeight:'500',color:'#0B3669',marginTop:5}}>Rs. </Text>
            <Text style={{fontSize:16,fontWeight:'500',color:'#0B3669',marginTop:5}}>300</Text>
            <Text style={{fontSize:16,fontWeight:'400',color:'#0B3669',marginLeft:10,marginTop:5}}>per day</Text>
        </View>

        <View style={{width:'90%',marginTop:10,marginLeft:5}}>
        <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#19c6c0'}
        starSize={20}
      />
            </View>
            <View>
            <Text style={{fontSize:14,fontWeight:'400',color:'#0B3669',marginTop:10,marginLeft:5}}>Posted by Ahtesham</Text>

                </View>
                <View style={{flexDirection:'row'}}>

    <TouchableOpacity onPress={()=>this.location()}>
                <View style={{marginLeft:10,marginTop:15,width:100,backgroundColor:'#19c6c0',alignItems:'center' }}>
                <Text style={{fontSize:16,fontWeight:'500',color:'white',padding:10}}>{this.state.loca}</Text>
       
                    </View>
      </TouchableOpacity>
                    <View style={{marginLeft:10,marginTop:15,width:50,backgroundColor:'#19c6c0',alignItems:'center' }}>
                <Text style={{fontSize:16,fontWeight:'500',color:'white',padding:10}}>X</Text>
       
                    </View>
                    </View>
</View>

<View style={{flex:1}}>
{
    this.state.ima ?<View style={{width:'95%',backgroundColor:'#19c6c0',height:'95%',marginTop:'2%'}}>

    <Image source={require('../images/shoes.png')} style={{width:150,height:150,marginLeft:10}}/>
   
   </View> :  <View style={{marginTop:10}}>
          <MapView
            style={{ alignSelf: "stretch", height: 180,width:180 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // onRegionChange={this._handleMapRegionChange}
          >
            <MapView.Marker
              coordinate={coords}
              title="My Marker"
              description="Some description"
            />
          </MapView>

          <Text>Location: {this.state.locationResult}</Text>
        {/* </View> */}
        {/* } */}

        {/* </View> */}

        {/* </Card> */}
        {/* </View> */}
        <ScrollView>
          <View style={{ marginLeft: "2%", marginTop: 10 }}>
            {this.props.favourites &&
              this.props.favourites.favourite_Data &&
              this.props.favourites.favourite_Data != "No Data Found" &&
              this.props.favourites.favourite_Data.map(data => {
                return (
                  <TouchableOpacity
                  onPress={() =>
                    navigate("ItemShow", {
                      data: data,
                      Imagename: data.images,
                      Item_Name: data.Item_Name,
                      Item_Rent: data.Item_Rent,
                      Location: data.Location,
                      Post_Id: data.post_id,
                      Renter_Id: data.renter_id
                    })
                  }
                >
                  <Card
                    key={data.post_id}
                    style={{ height: 180, width: "98%", flexDirection: "row" }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "500",
                          color: "#0B3669",
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {data.Item_Name}
                      </Text>
                      <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        <Text
                          style={{
                            fontFamily: "open-sans-bold",
                            fontSize: 14,
                            fontWeight: "500",
                            color: "#0B3669",
                            marginTop: 5
                          }}
                        >
                          Rs.{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "open-sans-bold",
                            fontSize: 14,
                            fontWeight: "500",
                            color: "#0B3669",
                            marginTop: 5
                          }}
                        >
                          {data.Item_Rent}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "open-sans-bold",
                            fontSize: 14,
                            fontWeight: "400",
                            color: "#0B3669",
                            marginLeft: 10,
                            marginTop: 5
                          }}
                        >
                          per day
                        </Text>
                      </View>

                      <View
                        style={{ width: "70%", marginTop: 10, marginLeft: 10 }}
                      >
                        <StarRating
                          disabled={false}
                          maxStars={5}
                          rating={data.ratings}
                          selectedStar={rating =>
                            this.onStarRatingPress(rating)
                          }
                          fullStarColor={"#19c6c0"}
                          starSize={20}
                        />
                      </View>
                      <Text
                        style={{
                          fontFamily: "open-sans-bold",
                          fontSize: 14,
                          fontWeight: "400",
                          color: "#0B3669",
                          marginTop: 10,
                          marginLeft: 10
                        }}
                      >
                        Posted by {data.renter_name}
                      </Text>

                      <View style={{ flexDirection: "row",flex:1 }}>
                        <TouchableOpacity onPress={() => this.location()} style={{flex:0.7}}>
                          <View style={{  backgroundColor: "#19c6c0", marginLeft: 10,
                              marginTop: 20,}}>
 <Text
                              style={{
                                fontFamily: "open-sans-bold",
                                fontSize: 16,
                                fontWeight: "500",
                                color: "white",
                                padding: 10,textAlign:'center'
                              }}
                            >
                              {this.state.loca}
                            </Text>
                          </View>
                          {/* <View
                            style={{
                              marginLeft: 10,
                              marginTop: 20,
                              marginBottom: "5%",
                              width: "100%",
                              backgroundColor: "#19c6c0",
                              
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "open-sans-bold",
                                fontSize: 16,
                                fontWeight: "500",
                                color: "white",
                                padding: 10,textAlign:'center'
                              }}
                            >
                              {this.state.loca}
                            </Text>
                          </View> */}
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.CrossButtonClick(data.post_id)}
                          style={{flex:0.2}}
                        >
                          <View
                            style={{
                              marginLeft: 5,
                              marginTop: 20,
                              marginBottom: "5%",
                              width: "100%",
                              backgroundColor: "#19c6c0",
                              alignItems: "center"
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
                              X
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{ flex: 1 }}>
                      {this.state.ima ? (
                        <View
                          style={{
                            width: "95%",
                            height: "95%",
                            marginTop: "2%"
                          }}
                        >
                          <Image
                            source={{ uri: data.images }}
                            style={{
                              width: "100%",
                              height: "100%",
                              marginLeft: 5
                            }}
                          />
                        </View>
                      ) : (
                        <View style={{ marginTop: 5 }}>
                          <MapView
                            style={{
                              alignSelf: "stretch",
                              height: 170,
                              width: 180
                            }}
                            initialRegion={{
                              latitude: Number(data.Latitute),
                              longitude: Number(data.Longitude),
                             latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                         
                            }}
                          >
                            <MapView.Marker
                              coordinate={{
                                latitude: Number(data.Latitute),
                                longitude: Number(data.Longitude)
                              }}
                              title="My Marker"
                              description="Some description"
                            />
                          </MapView>
                        </View>
                      )}
                    </View>
                  </Card>
                  </TouchableOpacity>
                );
              })}
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => navigate("AllDeals")}>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 15,
                  width: 50,
                  height: 40,
                  backgroundColor: "#19c6c0",
                  alignItems: "center"
                }}
              >
                {/* <Text style={{fontSize:24,fontWeight:'500',color:'white',padding:10}}>+</Text> */}
                <Image
                  source={require("../images/add.png")}
                  style={{ width: 20, height: 20, marginTop: 10 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    favourites: state.authReducers.favourites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
    updateFavourites: favourites => dispatch(updateFavourites(favourites))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourite);

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
