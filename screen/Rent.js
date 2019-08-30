import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Picker,
  AsyncStorage,PermissionsAndroid,Platform
} from "react-native";
import { Drawer, Header, Left, Right, Textarea, Button } from "native-base";
import ContentView from "./Drawer";
import { ImagePicker } from "expo";
import { ImageBrowser, CameraBrowser } from "expo-multiple-imagepicker";
import {Constants, MapView, Permissions, Location } from "expo";
import {  updatePostData } from "../Redux/actions/authActions";
import { connect } from "react-redux";

class Rent extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      language: undefined,
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      locationResult: null,
      location: {
        coords: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      },
      geocode: "",
      text: "",
      cat: [{ Id: "12", Name: "PHONES" }],
      CNIC: false,
      Secs: true,
      image: null,
      TITLE: "",
      DESCRIPTION: "",
      pricePerday: null,
      depoCnic: null,
      imageBrowserOpen: false,
      cameraBrowserOpen: false,
      photos: [],
      imageSelect: "",
      Cnics: null,
      user_id: null,
      images: null,
      errorMessage: null,

    };
  }

  state = {
    mapRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } }
  };

  // componentDidMount() {
  //   this._getLocationAsync();
  // }

  // _handleMapRegionChange = mapRegion => {
  //   this.setState({ mapRegion });
  // };

  imageBrowserCallback = callback => {
    callback
      .then(photos => {
        // console.log(photos);
        this.setState({
          imageBrowserOpen: false,
          imageSelect: "done",
          photos
        });
      })
      .catch(e => console.log(e));
  };

  renderImage(item, i) {
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item.file }}
        key={i}
      />
    );
  }

  openDrawer = () => {
    this.drawer._root.open();
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    // this._getLocationAsync();
    // this._askForLocationServices();
    AsyncStorage.getItem("UID")
      .then(uid => {
        console.log("NEW USERID", uid);
        this.setState({ user_id: uid }, () => {});
      })
      .catch(err => {
        console.log("Cant Get User_id From ASYNC STORAGE", err);
      });

    fetch(`http://foodfella.net/Rentree/adcategories`)
      .then(res => {
        res.json().then(data => {
          console.log("categories data", data);
          this.setState({
            cat: data
          });
        });
      })
      .catch(err => {
        console.log("categories data err", err);
      });
  }

  // componentWillMount() {
  //   this._getLocationAsync();
  // }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  // _askForLocationServices() {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
  //     'title': 'question',
  //     'message': 'gimme that location',
  //   }).then((granted) => {
  //     console.log('granted', granted);
  //     // always returns never_ask_again
  //   })
  // }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
        location
      });
    }
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    // .then(granted => {
    //   console.log(granted,'granted in map ')
    //   this.setState({ paddingTop: 0,location });
    // });
    let location = await Location.getCurrentPositionAsync({});
    let geocode = await Location.reverseGeocodeAsync(location.coords);
    this.setState({
      locationResult: JSON.stringify(location),
      location,
      geocode: geocode
    });
  };

  Sec = () => {
    if (this.state.Secs === true) {
      this.setState({
        Secs: false,
        CNIC: true
      });
    }
    if (this.state.Secs === false) {
      this.setState({
        Secs: true,
        CNIC: false
      });
    }
  };
  CNIC = () => {
    if (this.state.CNIC == true) {
      this.setState({
        Secs: true,
        CNIC: false
      });
    }
    if (this.state.CNIC == false) {
      this.setState({
        Secs: false,
        CNIC: true
      });
    }
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      imageSelect: "done",
      aspect: [4, 3]
    });

    // console.log(result);

    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      // tempArr.push({ uri: localUri, name: filename, type});
      this.setState({
        images: { uri: localUri, name: filename, type }
      });
    }
  };
  AllDealsItem() {
    fetch(`http://foodfella.net/Rentree/allads`)
      .then(res => {
        res.json().then(data => {
          // console.log("allads >>>", data);

          if (data != "No Ads Available") {

            this.props.updatePostData({
              post_data: data
            })

            // this.setState({
            //   resta: data
            // });
          }
        });
      })
      .catch(err => {
        console.log("allads Error >>>", err);
      });
  }


  PostAdd = () => {
    const {
      images,
      user_id,
      language,
      TITLE,
      pricePerday,
      depoCnic,
      Cnics,
      DESCRIPTION,
      text
    } = this.state;

    const { latitude, longitude } = this.state.location.coords;

    console.log("TITLE >>>>>>>>>>", TITLE);
    console.log("pricePerday >>>>>>>>>>", pricePerday);
    console.log("depoCnic >>>>>>>>>>", depoCnic);
    console.log("Cnics >>>>>>>>>>", Cnics);
    console.log("DESCRIPTION >>>>>>>>>>", DESCRIPTION);
    console.log("text >>>>>>>>>>", text);
    console.log("latitude >>>>>>>>>>", latitude);
    console.log("longitude >>>>>>>>>>", longitude);
    console.log("language >>>>>>>>>>", language);
    console.log("user_id >>>>>>>>>>", user_id);
    console.log("images >>>>>>>>>>", images);
    //console.log("catid >>>>>>>>>>", language);

    let formData = new FormData();
    formData.append("name", TITLE);
    formData.append("price", pricePerday);
    formData.append("deposit", depoCnic);
    formData.append("cnic", Cnics);
    formData.append("description", DESCRIPTION);
    formData.append("location", text);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("catid", language);
    formData.append("userid", user_id);
    formData.append("Image", images);
    if(TITLE==='' ){
      alert('Fill the Title First !')
    }
    else if( pricePerday===null ){
      alert('Enter The Price per Day')
    }
    else if(depoCnic===null && Cnics===null ){
      alert('Fill Deposit or Cnic Field ')
    }
    else if(DESCRIPTION==="" ){
      alert('Fill Descriptio first')
    }
    else if(text==="" ){
      alert('Location Field is not fill')
    }
    else if(images===null){
      alert('Select Image Before Post. ')
    }
    else{
    fetch(`http://foodfella.net/Rentree/Post_ad.php`, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData
    })
      .then(res => res.json())
      .then(response => {
        console.log("reponse Post_ad >>>", response);
        if (response == "success") {
          //  console.log("reponse Signin 1", response);
          this.AllDealsItem();
          alert("Post Add Successfully");
          this.props.navigation.navigate("Explore");
          this.setState({
            TITLE: "",
            pricePerday: null,
            depoCnic: null,
            Cnics: null,
            DESCRIPTION: "",
            text: "",
            language: undefined,
            photos: [],
            latitude: null,
            longitude: null
          });
        }
        if (response == "fail") {
          console.log("post ad ", response);
          alert("Post Not Add Successfully");
          this.setState({
            TITLE: "",
            pricePerday: null,
            depoCnic: null,
            Cnics: null,
            DESCRIPTION: "",
            text: "",
            language: undefined,
            photos: [],
            latitude: null,
            longitude: null
          });

          // this.props.navigation.navigate("Home", { response });
        }
      })
      .catch(error => {
        console.log("error", error);
      });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    let coords = {
      latitude: 37.78825,
      longitude: -122.4324
    };
    console.log(this.state.errorMessage, "errorMessage in render");
    console.log(this.state.language, "language");
    // console.log(this.state.imageBrowserOpen, "imageBrowserOpen");
    // console.log(this.state.geocode, "geocode state rent");
    // console.log(this.state.photos, "geocode state rent");
    // console.log(
    //   this.state.TITLE,
    //   this.state.pricePerday,
    //   this.state.depoCnic,
    //   this.state.Cnics,
    //   this.state.DESCRIPTION,
    //   this.state.text,
    //   this.state.language,
    //   this.state.user_id,
    //   // typeof( this.state.photos[0].file),
    //   // typeof( this.state.photos[0].uri),
    //   typeof this.state.images,
    //   this.state.images,
    //   this.state.uri,
    //   "all data"
    // );
    let { image } = this.state;
    if (this.state.imageBrowserOpen) {
      return <ImageBrowser max={10} callback={this.imageBrowserCallback} />;
    } else if (this.state.cameraBrowserOpen) {
      return <CameraBrowser max={10} callback={this.imageBrowserCallback} />;
    }
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
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.15, marginTop: 22 }}>
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
                {/* <TouchableOpacity onPress={()=>this._pickImage()}> */}
                {/* <Image
                  source={require("../images/search.png")}
                  style={{ height: 25, width: 25, marginTop: 0 }}
                /> */}
                {/* </TouchableOpacity> */}
              </Right>
              {/* </TouchableOpacity> */}
            </Header>
          </View>
          <ScrollView style={{ flex: 0.85 }}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: "80%",
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: "black",
                    height: 30,
                    position: "relative",
                    zIndex: 1,
                    top: 0,
                    left: 15
                  }}
                />
                <View
                  style={{
                    width: "9%",
                    marginTop: 10,
                    backgroundColor: "#19c6c0",
                    height: 30,
                    position: "relative",
                    zIndex: -1,
                    top: 0,
                    // left: "80%"
                    left:30
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: -40
                }}
              >
                <Picker
                  selectedValue={this.state.language}
                  textStyle={{ fontSize: 8 }}
                  style={{
                    height: 50,
                    width: "95%",
                    color: "gray",
                    marginLeft: "2%"
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  {this.state.cat.map(v => {
                    return (
                      <Picker.Item key={v.Id} label={v.Name} value={v.Id} />
                    );
                  })}
                </Picker>
              </View>
            </View>

            <View>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 12,
                  color: "gray",
                  marginLeft: "6%",
                  marginTop: 5
                }}
              >
                AD TITLE *
              </Text>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#001733",
                  width: "90%",
                  marginLeft: "5%"
                }}
              >
                <TextInput
                  style={{ height: 40, fontSize: 16 }}
                  onChangeText={TITLE => this.setState({ TITLE })}
                  value={this.state.TITLE}
                  // placeholder="Random Title xyz"
                  placeholderTextColor="#001733"
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 12,
                  color: "gray",
                  marginLeft: "6%",
                  marginTop: 5
                }}
              >
                AD DESCRIPTION *
              </Text>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#001733",
                  width: "90%",
                  marginLeft: "5%",
                  marginTop: 10
                }}
              >
                <Textarea
                  style={{ height: 60, fontSize: 16 }}
                  onChangeText={DESCRIPTION => this.setState({ DESCRIPTION })}
                  value={this.state.DESCRIPTION}
                  //placeholder="Very competitve multi day price. Will come fully charged with 2 batteries and in a fightcase ."
                  // placeholderTextColor="#001733"
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 12,
                  color: "gray",
                  marginLeft: "6%",
                  marginTop: 5
                }}
              >
                PRICE (PER DAY) *
              </Text>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#001733",
                  width: "90%",
                  marginLeft: "5%",
                  flexDirection: "row"
                }}
              >
                <Text
                  style={{
                    fontFamily: "open-sans-bold",
                    fontSize: 16,
                    color: "gray",
                    marginTop: 10
                  }}
                >
                  RS
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    fontSize: 16,
                    marginLeft: 5,
                    width: "100%"
                  }}
                  onChangeText={pricePerday => this.setState({ pricePerday })}
                  value={this.state.pricePerday}
                  placeholder=" 1000 RS"
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 12,
                  color: "gray",
                  marginLeft: "6%",
                  marginTop: 5
                }}
              >
                ENTER OR PIN LOCATION *
              </Text>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#001733",
                  width: "90%",
                  marginLeft: "5%",
                  flexDirection: "row"
                }}
              >
                <TextInput
                  style={{
                    height: 40,
                    fontSize: 16,
                    marginLeft: 5,
                    width: "100%"
                  }}
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  placeholder="H.NO. 374 Phase 5, Defence, xyz"
                  //  placeholderTextColor="#001733"
                />
              </View>
            </View>

            <View
              style={{
                marginTop: 10,
                marginLeft: "5%",
                width: "90%",
                borderWidth: 1,
                borderColor: "#19c6c0"
              }}
            >
              {/* <MapView
            style={{ alignSelf: "stretch", height: 180,width:'100%',borderWidth:2,borderColor:'#19c6c0' }}
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
          </MapView> */}
              {/* <MapView
          style={{ alignSelf: "stretch", height: 180,width:'100%',borderWidth:2,borderColor:'#19c6c0' }}
          region={{ latitude: this.state.location&&this.state.location.coords.latitude, longitude:this.state.location && this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        
        >
    <MapView.Marker
      coordinate={this.state.location && this.state.location.coords}
      title="My Marker"
      description="Some description"
  
    >
      <Image
                  source={require('../images/location.png')}
                  
                 style={{width:20,height:20}}
                />
      </MapView.Marker>
        </MapView> */}

              {/* <CustomMap /> */}

              {/* <View style={styles.container}> */}
              <MapView
                style={{ alignSelf: "stretch", height: 200 }}
                region={{
                  latitude: this.state.location.coords.latitude,
                  longitude: this.state.location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
                // onRegionChange={this._handleMapRegionChange}
              >
                <MapView.Marker
                  coordinate={this.state.location.coords}
                  title="My Marker"
                  description="Some description"
                />
              </MapView>

              {/* <Text>
          Location: {this.state.locationResult}
        </Text> */}
            </View>
            {/* <Text>Location: {this.state.locationResult}</Text> */}
            {/* </View> */}

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                  color: "gray",
                  marginLeft: "6%",
                  marginTop: 0
                }}
              >
                SECURITY DEPOSIT{" "}
              </Text>
              {/* <TouchableOpacity onPress={()=>this.Sec()}>
        <CheckBox checked={this.state.Secs} />
        </TouchableOpacity> */}
              <TouchableOpacity onPress={() => this.Sec()}>
                {this.state.Secs ? (
                  <View>
                    <Image
                      source={require("../images/selectedbox.png")}
                      style={{ width: 20, height: 20, marginLeft: 10 }}
                    />
                  </View>
                ) : (
                  <Image
                    source={require("../images/uncheck.png")}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                  />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                  color: "gray",
                  marginLeft: "4%",
                  marginTop: 0
                }}
              >
                CNIC{" "}
              </Text>
              {/* <TouchableOpacity onPress={()=>this.CNIC()}>
        <CheckBox checked={this.state.CNIC} style={{marginLeft:20}}/>
        </TouchableOpacity> */}
              <TouchableOpacity onPress={() => this.CNIC()}>
                {this.state.CNIC ? (
                  <View>
                    <Image
                      source={require("../images/selectedbox.png")}
                      style={{ width: 20, height: 20, marginLeft: 10 }}
                    />
                  </View>
                ) : (
                  <Image
                    source={require("../images/uncheck.png")}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View>
              {this.state.Secs ? (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#001733",
                    width: "90%",
                    marginLeft: "5%",
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 16,
                      color: "gray",
                      marginTop: 10
                    }}
                  >
                    RS :{" "}
                  </Text>
                  <TextInput
                    style={{
                      fontFamily: "open-sans-bold",
                      height: 40,
                      fontSize: 16,
                      marginLeft: 5,
                      width: "100%"
                    }}
                    onChangeText={depoCnic => this.setState({ depoCnic })}
                    value={this.state.depoCnic}
                    placeholderTextColor="#001733"
                  />
                </View>
              ) : (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#001733",
                    width: "90%",
                    marginLeft: "5%",
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 16,
                      color: "gray",
                      marginTop: 10
                    }}
                  >
                    CNIC :{" "}
                  </Text>
                  <TextInput
                    style={{ fontFamily: "open-sans-bold",width:'100%',height: 40, fontSize: 16, marginLeft: 5 }}
                    onChangeText={Cnics => this.setState({ Cnics })}
                    value={this.state.Cnics}
                    placeholderTextColor="#001733"
                  />
                </View>
              )}
            </View>

            {/* IMAGES PICKER */}

            {this.state.images != null && (
              <ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 5
                  }}
                >
                  {/* { */}
                  {/* this.state.photos.map((item,i) => this.renderImage(item,i)) */}
                  {/* } */}
                  <View style={{ width: 200, height: 200 }}>
                    <Image
                      source={{ uri: this.state.images.uri }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                </View>
              </ScrollView>
            )}

            {
              // this.state.images == null &&
              <TouchableOpacity
                // onPress={() => {
                //   this.setState({imageBrowserOpen: true})}
                // }
                onPress={() => this._pickImage()}
              >
                <View
                  style={{
                    width: "90%",
                    height: 60,
                    borderWidth: 1,
                    borderColor: "#001733",
                    marginLeft: "5%",
                    marginTop: 5
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: "5%"
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "open-sans-bold",
                        fontSize: 14,
                        color: "#001733",
                        fontWeight: "500"
                      }}
                    >
                      UPLOAD IMAGE(S)
                    </Text>

                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        marginLeft: "3%",
                        marginBottom: "3%"
                      }}
                      source={require("../images/picture.png")}
                    />
                  </View>
                  {/* <View style={{flexDirection:'row',justifyContent:'center'}}> */}
                  {/* </View> */}
                </View>
              </TouchableOpacity>
            }

            <Button
              onPress={() => this.PostAdd()}
              style={{
                marginTop: 30,
                color: "white",
                backgroundColor: "#19c6c0",
                marginHorizontal: "5%",
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  color: "white",
                  fontSize: 18,
                  fontWeight: "500"
                }}
              >
                POST AD
              </Text>
            </Button>
          </ScrollView>
        </View>
      </Drawer>
    );
  }
}
const mapStateToProps = state => {
  return {
   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePostData: postData => dispatch(updatePostData(postData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rent);

// export default Rent;
