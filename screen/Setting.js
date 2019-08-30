import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity, 
    BackHandler, DeviceEventEmitter,Linking,AsyncStorage} from 'react-native';
import { Icon ,Drawer, Item as FormItem,Header,Body,Card,Left,Right} from 'native-base';
import ContentView from './Drawer'
import { Font } from 'expo';


class Setting extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5,
          user_id:""
        }
        this.backPressSubscriptions = new Set()
    }
    openDrawer = () => {
        this.drawer._root.open()
    };
    closeDrawer = () => {
        this.drawer._root.close()
    };
 
    handleClick = ()=> {
        Linking.canOpenURL('https://play.google.com/store/apps/details?id=com.wanda.wanda_book').then(supported => {
            supported && Linking.openURL('https://play.google.com/store/apps/details?id=com.wanda.wanda_book');
        }, (err) => console.log(err));
    }
    componentDidMount(){
        AsyncStorage.getItem("UID").then((uid)=>{
             console.log("NEW USERID",uid)
            this.setState({user_id:uid},()=>{
              
            })
        }).catch(err=>{
            console.log("Cant Get User_id From ASYNC STORAGE",err)
        })
          
      }

deleteAccount=()=>{
    fetch(`http://foodfella.net/Rentree/delete_account.php?user_id=${this.state.user_id}`)
    .then(
        res=>res.json()
    .then(
        res=>{
            alert("Account Deleted")
           this.props.navigation.navigate('SignIn')
        }))
    .catch(err=>{
        console.log("All Chats Error",err)
    })
}

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
<Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',margin:15,fontSize:16,fontWeight:'500'}}>SETTINGS </Text>
        </View>

    <View style={{backgroundColor:'#F0F0F0',height:Dimensions.get('window').height}}>

<View >
<Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',marginTop:15,marginLeft:15,fontSize:16,fontWeight:'500'}}>Notifications</Text>
<View style={{borderBottomColor:'gray',borderBottomWidth:0.8,width:'90%', marginLeft:'5%',marginVertical:5}}/>
</View>


<View >
<Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',marginTop:15,marginLeft:15,fontSize:16,fontWeight:'500'}}>Payment Methods</Text>
<View style={{borderBottomColor:'gray',borderBottomWidth:0.8,width:'90%', marginLeft:'5%',marginVertical:5}}/>
</View>

<View >
    <TouchableOpacity onPress={()=>this.handleClick()}>
        
<Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',marginTop:15,marginLeft:15,fontSize:16,fontWeight:'500'}}>Rate the App</Text>
    </TouchableOpacity>
<View style={{borderBottomColor:'gray',borderBottomWidth:0.8,width:'90%', marginLeft:'5%',marginVertical:5}}/>
</View>

<View >
<Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',marginTop:15,marginLeft:15,fontSize:16,fontWeight:'500'}}>Delete Account</Text>
</View>


    </View>

</View> 
</ScrollView>
 </Drawer>
   )
 }
}
export default Setting;