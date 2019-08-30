import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity, 
    BackHandler, DeviceEventEmitter} from 'react-native';
import { Icon ,Drawer, Item as FormItem,Header,Body,Card,Left,Right} from 'native-base';
import ContentView from './Drawer'
import StarRating from 'react-native-star-rating';
import ProfileTab from './ProfileTab'
import { Font } from 'expo';

class AboutUs extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5,
          
        }
        this.backPressSubscriptions = new Set()
    }
    openDrawer = () => {
        this.drawer._root.open()
    };
    closeDrawer = () => {
        this.drawer._root.close()
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

 render() {
   const {navigate}=this.props.navigation;
   return (
          
    <Drawer
    ref={(ref) => { this.drawer = ref; }}
    content={<ContentView menu={this.props}/>}
    onClose={() => this.closeDrawer()}
    openDrawerOffset={0.3}
    panCloseMask={0.3}>

<ScrollView>
     <View style={{height:Dimensions.get('window').height,marginBottom:10}}>

<View style={{ marginTop: 22 }} >
<Header style={{ backgroundColor: '#001733', }} >
                                     <Left >
                    <TouchableOpacity onPress={this.openDrawer.bind(this)}>
                    <Image    source={require('../images/menu.png')} style={{height:20,width:20}}/>
                    </TouchableOpacity>
     </Left>
   <View style={{ marginLeft:'20%',marginTop:10 }}>
                    <Image    source={require('../images/logo.png')} style={{height:50,width:120,}}/>
                    </View>
              
                {/* <TouchableOpacity onPress={()=>navigate('Cart',{id:this.props.navigation.state.params.response})}> */}
                <Right  >
                {/* <Image source={require("../images/search.png")} style={{height:25,width:25,marginTop:0}}/> */}
                </Right>
                {/* </TouchableOpacity> */}
            </Header>
      </View>

        <View style={{borderBottomColor:'#0B3669',height:60,borderBottomWidth:1,backgroundColor:'white'}}>
<Text style={{color:'#0B3669',fontFamily: 'open-sans-bold',margin:15,fontSize:16,fontWeight:'500'}}>ABOUT US</Text>
        </View>

    <View style={{backgroundColor:'#F0F0F0',height:Dimensions.get('window').height}}>
    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:16,fontWeight:'500',margin:20}}>
    WHO WE ARE 
    </Text>
    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:16,fontWeight:'400',marginLeft:20}}>
    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, 
    graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century
    </Text>

    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:16,fontWeight:'500',margin:20}}>
   WHAT WE DO
    </Text>
    <Text style={{fontFamily: 'open-sans-bold',fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:16,fontWeight:'400',marginLeft:20}}>
    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, 
    graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century
    </Text>

    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:16,fontWeight:'500',margin:20}}>
   TERMS & CONDITIONS
    </Text>
    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:16,fontWeight:'400',marginLeft:20}}>
    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, 
    graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century.
    </Text>

    </View>

</View> 
</ScrollView>
 </Drawer>
   )
 }
}
export default AboutUs;