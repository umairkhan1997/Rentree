import React from "react";
import { Text, View, Image } from "react-native";
import { Icon, Drawer, Item as FormItem } from "native-base";
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import AllDeals from "./AllDeals";
import Favourite from "./Favourite";
import Categories from "./Categories";
import ItemShow from "./ItemShow";
import CategoryItem from "./CategoryItem";
import ChatEx from "./ChatEx";
import ChatOpenEx from "./ChatOpenEx";

const AllDeal = createStackNavigator({
  AllDeals: AllDeals,
  ItemShow: ItemShow,
  ChatEx: ChatEx,
  ChatOpenEx: ChatOpenEx
});

const AllCategories = createStackNavigator({
  Categories: Categories,
  CategoryItem: CategoryItem
});

const Tab = createMaterialTopTabNavigator(
  {
    AllDeals: {
      screen: AllDeal,
      navigationOptions: {
        tabBarLabel: "All Deals",
        color: "#1A5CAD"
        //tabBarActiveTintColor
        // tabBarIcon: ({ tintColor }) => (
        // //   <Icon name="search" size={20} style={{ color: "black" }} />
        // <Image source={require('../images/explore.png')} style={{height:20,width:20}}/>
        // )
      }
    },

    Categories: {
      screen: AllCategories,
      navigationOptions: {
        tabBarLabel: "Categories",
        color: "#1A5CAD"

        //tabBarActiveTintColor
        // tabBarIcon: ({ tintColor }) => (
        // //   <Icon name="search" size={20} style={{ color: "black" }} />
        // <Image source={require('../images/explore.png')} style={{height:20,width:20}}/>
        // )
      }
    },
    Favourite: {
      screen: Favourite,
      navigationOptions: {
        tabBarLabel: "Favourites",
        color: "#1A5CAD"
        //tabBarActiveTintColor
        // tabBarIcon: ({ tintColor }) => (
        // //   <Icon name="search" size={20} style={{ color: "black" }} />
        // <Image source={require('../images/explore.png')} style={{height:20,width:20}}/>
        // )
      }
    }
  },
  {
    tabBarOptions: {
      labelStyle: { fontSize: 14 },
      activeTintColor: "#0B3669",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "white",
        height: 45,
        marginBottom: 10
      },
      indicatorStyle: {
        backgroundColor: "#0B3669"
      }
      //showLabel: false
    },

    initialRouteName: "AllDeals"
  }
);

export default createAppContainer(Tab);
