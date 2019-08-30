import React from 'react';
import { Text, View,Image } from 'react-native';
import { Icon ,Drawer, Item as FormItem} from 'native-base';
import { createMaterialTopTabNavigator, createAppContainer,createStackNavigator,createSwitchNavigator } from 'react-navigation';
import YourDeals from './YourDeals'
import Favourite from './Favourite'
import { Font } from 'expo';



const ProfileTab= createMaterialTopTabNavigator({
    YourDeals:{
        screen:YourDeals,
        navigationOptions: {
            tabBarLabel: "Your Deals",
            color:"#1A5CAD",
            //tabBarActiveTintColor
            // tabBarIcon: ({ tintColor }) => (
            // //   <Icon name="search" size={20} style={{ color: "black" }} />
            // <Image source={require('../images/explore.png')} style={{height:20,width:20}}/>
            // )
          }
    },
    Favourite:{
        screen:Favourite,
        navigationOptions: {
            tabBarLabel: "Favourite",
            color:"#1A5CAD",
            //tabBarActiveTintColor
            // tabBarIcon: ({ tintColor }) => (
            // //   <Icon name="search" size={20} style={{ color: "black" }} />
            // <Image source={require('../images/explore.png')} style={{height:20,width:20}}/>
            // )
          }
    },
   
},{
    tabBarOptions: {
      labelStyle: { fontSize: 14 },
      activeTintColor: "#0B3669",
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
        height:50
        
        
      },
      indicatorStyle: {
        backgroundColor: '#0B3669',
    },
      //showLabel: false
      
    },
    
    initialRouteName: 'YourDeals'
    }
      )

      export default createAppContainer(ProfileTab);