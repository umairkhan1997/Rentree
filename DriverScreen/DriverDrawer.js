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

class DriverDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigate } = this.props.menu.navigation;
    return (
      <View
        style={{
          height: Dimensions.get("window").height,
          backgroundColor: "white"
        }}
      >
        <View
          style={{ backgroundColor: "#e1b827", height: "25%", width: "100%" }}
        >
          <Text
            style={{
              marginTop: "20%",
              marginLeft: 30,
              color: "white",
              fontSize: 18,
              fontWeight: "500"
            }}
          >
            Name :
          </Text>
          <Text
            style={{
              marginLeft: 30,
              color: "white",
              fontSize: 14,
              fontWeight: "500"
            }}
          >
            Number :
          </Text>
          <Text
            style={{
              marginLeft: 30,
              color: "white",
              fontSize: 14,
              fontWeight: "500"
            }}
          >
            Email :
          </Text>
          <Text
            style={{
              marginLeft: 30,
              color: "white",
              fontSize: 14,
              fontWeight: "500"
            }}
          >
            Address :
          </Text>
        </View>

        <View>
          <View style={{ backgroundColor: "#E9E9E9" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 10,
                marginVertical: 5,
                color: "gray"
              }}
            >
              More Options
            </Text>
          </View>
          {/* <TouchableOpacity onPress={()=>navigate('')}>
         <View style={{flexDirection:'row', marginLeft:15,marginVertical:10}}>
                <Image source={require('../images/tracking.png')} style={{width:25,height:20}} />
                <Text style={{fontSize:14, marginLeft:10}}>Track Order</Text>
         </View>
         </TouchableOpacity> */}
          {/* <View style={{borderBottomWidth:0.6,borderBottomColor:'gray'}}/>
         <TouchableOpacity onPress={()=>navigate('')}>
         <View style={{flexDirection:'row', marginLeft:15,marginVertical:10}}>
                <Image source={require('../images/heart.png')} style={{width:20,height:20}} />
                <Text style={{fontSize:14, marginLeft:10}}>My Favourite</Text>
         </View>
         </TouchableOpacity> */}
          {/* <View style={{borderBottomWidth:0.6,borderBottomColor:'gray'}}/> */}
          <TouchableOpacity onPress={() => navigate("")}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginVertical: 10
              }}
            >
              <Image
                source={require("../images/shopping-bag.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ fontSize: 14, marginLeft: 10 }}>My Orders</Text>
            </View>
          </TouchableOpacity>
          <View style={{ borderBottomWidth: 0.6, borderBottomColor: "gray" }} />
          <TouchableOpacity onPress={() => navigate("")}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginVertical: 10
              }}
            >
              <Image
                source={require("../images/rating1.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ fontSize: 14, marginLeft: 10 }}>My Reviews</Text>
            </View>
          </TouchableOpacity>
          <View style={{ borderBottomWidth: 0.6, borderBottomColor: "gray" }} />

          <View style={{ backgroundColor: "#E9E9E9" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 10,
                marginVertical: 5,
                color: "gray"
              }}
            >
              Account Settings
            </Text>
          </View>
          {/* <TouchableOpacity onPress={()=>navigate('')}>
         <View style={{flexDirection:'row', marginLeft:15,marginVertical:10}}>
                <Image source={require('../images/home.png')} style={{width:20,height:20}} />
                <Text style={{fontSize:14, marginLeft:10}}>My Address</Text>
         </View>
         </TouchableOpacity> */}
          {/* <View style={{borderBottomWidth:0.6,borderBottomColor:'gray'}}/> */}
          <TouchableOpacity onPress={() => navigate("")}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginVertical: 10
              }}
            >
              <Image
                source={require("../images/closed-lock.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ fontSize: 14, marginLeft: 10 }}>
                Change Password
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ borderBottomWidth: 0.6, borderBottomColor: "gray" }} />
          <View
            style={{ flexDirection: "row", marginLeft: 15, marginVertical: 10 }}
          >
            <Image
              source={require("../images/logout.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ fontSize: 14, marginLeft: 10 }}>Logout</Text>
          </View>
          <View style={{ borderBottomWidth: 0.6, borderBottomColor: "gray" }} />
          <View style={{ backgroundColor: "#E9E9E9" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 10,
                marginVertical: 5,
                color: "gray"
              }}
            >
              Contact Support
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", marginLeft: 10, marginVertical: 10 }}
          >
            <Image
              source={require("../images/support.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ fontSize: 14, marginLeft: 10 }}>
              Contact Support
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default DriverDrawer;
