import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Icon, Drawer, Item as FormItem } from "native-base";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import Home from "./screen/Home";
import SignUp from "./screen/SignUp";
import SignIn from "./screen/SignIn";
import AboutUs from "./screen/AboutUs";
import ChatOpen from "./screen/ChatOpen";
import Timeline from "./screen/Timeline";
import Help from "./screen/Help";
import History from "./screen/History";
import Setting from "./screen/Setting";
import Search from "./screen/Search";
import ItemShow from "./screen/ItemShow";
import MyAddEdit from "./screen/MyAddEdit";
import ProfileEdit from "./screen/ProfileEdit";

import Chat from "./screen/Chat";
import Explore from "./screen/Explore";
import Profile from "./screen/Profile";
import Rent from "./screen/Rent";
import MyAdds from "./screen/MyAdds";

// import Main from "./Main";

const AppNavigator = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        tabBarLabel: "SignUp"
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        //   tabBarIcon: ({ tintColor }) => (
        //     <Icon name="ios-home" size={20} style={{ color: "white" }} />
        //   )
      }
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        tabBarLabel: "SignIn"
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        //   tabBarIcon: ({ tintColor }) => (
        //     <Icon name="ios-home" size={20} style={{ color: "white" }} />
        //   )
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" size={20} style={{ color: "white" }} />
        )
      }
    }
    // Main: {
    //   screen: Main,
    //   navigationOptions: {
    //     tabBarLabel: "Main",
    //     // color:"#1A5CAD",
    //     //tabBarActiveTintColor
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="ios-home" size={20} style={{ color: "white" }} />
    //     )
    //   }
    // }
    // // AllDeals:{
    //   screen:AllDeals,
    //   navigationOptions: {
    //       tabBarLabel: "AboutUs",
    //       // color:"#1A5CAD",
    //       //tabBarActiveTintColor
    //       tabBarIcon: ({ tintColor }) => (
    //         <Icon name="ios-home" size={20} style={{ color: "white" }} />
    //       )
    //     }
    // }
  },
  {
    tabBarOptions: {
      activeTintColor: "#91C322",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "white"
      }
    },

    initialRouteName: "SignIn"
  }
);

const ExploreTab = createStackNavigator({
  Explore: { screen: Explore },
  AboutUs: { screen: AboutUs },
  Timeline: { screen: Timeline },
  Help: { screen: Help },
  History: { screen: History },
  Setting: { screen: Setting },
  Search: { screen: Search },
  ItemShow: { screen: ItemShow }
});

const ProfileTab = createStackNavigator({
  Profile: { screen: Profile },
  ProfileEdit: { screen: ProfileEdit }
});
const ChatTab = createStackNavigator({
  Chat: { screen: Chat },
  ChatOpen: { screen: ChatOpen }
});

const MyAddEditTab = createStackNavigator({
  MyAdds: { screen: MyAdds },
  MyAddEdit: { screen: MyAddEdit }
});

const mainTab = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreTab,
      navigationOptions: {
        //tabBarLabel: "Explore",
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        tabBarIcon: ({ tintColor }) => (
          //   <Icon name="search" size={20} style={{ color: "black" }} />
          <Image
            source={require("./images/compass.png")}
            style={{ height: 20, width: 20 }}
          />
        )
      }
    },
    Profile: {
      screen: ProfileTab,
      navigationOptions: {
        // tabBarLabel: "Profile",
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("./images/profile.png")}
            style={{ height: 20, width: 20 }}
          />
          // <Icon name="profile" size={20} style={{ color: "black" }} />
        )
      }
    },
    Rent: {
      screen: Rent,
      navigationOptions: {
        //   tabBarLabel: "Rent",
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("./images/cart.png")}
            style={{ height: 20, width: 20 }}
          />
          // <Icon name="profile" size={20} style={{ color: "black" }} />
        )
      }
    },

    Chat: {
      screen: ChatTab,
      navigationOptions: {
        // tabBarLabel: "Chat",
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("./images/email.png")}
            style={{ height: 20, width: 20 }}
          />
          //<Icon name="ios-home" size={20} style={{ color: "black" }} />
        )
      }
    },
    MyAddEditTab: {
      screen: MyAddEditTab,
      navigationOptions: {
        //  tabBarLabel: "My Adds",
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("./images/megaphone.png")}
            style={{ height: 20, width: 20 }}
          />
          // <Icon name="profile" size={20} style={{ color: "black" }} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "gray",
      activeBackgroundColor: "lightgray",
      style: {
        backgroundColor: "white"
      },
      showLabel: false
    },

    initialRouteName: "Rent"
  }
);

// const DriverTab=createStackNavigator({
//   DriverHome:DriverHome,
//   DriverMaps:DriverMaps,
// })
// const mainTab=createSwitchNavigator({
//   AppNavigator:AppNavigator,
//   DriverTab:DriverTab
// })
const main = createSwitchNavigator({
  AppNavigator: AppNavigator,
  mainTab: mainTab
});

export default createAppContainer(main);
