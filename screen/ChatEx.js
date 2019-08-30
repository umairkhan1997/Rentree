import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity,AsyncStorage} from 'react-native';
import { Icon ,Drawer, Item,Header,Body,Card,Content,Input,  Left,Right } from 'native-base';
import StarRating from 'react-native-star-rating';
import ContentView from './Drawer'
import { Font } from 'expo';

class ChatEx extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props){
        super(props)
        this.state={
            starCount: 3.5,
            chats:null,
            user_id:""
        }
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


  componentDidMount(){
    AsyncStorage.getItem("UID").then((uid)=>{
         console.log("NEW USERID",uid)
        this.setState({user_id:uid},()=>{
            this.showAllChats();
        })
    }).catch(err=>{
        console.log("Cant Get User_id From ASYNC STORAGE",err)
    })
      
  }


showAllChats=()=>{
    fetch(`http://foodfella.net/Rentree/get_all_chats.php?user_id=${this.state.user_id}`)
    .then(
        res=>res.json()
    .then(
        chats=>{
             console.log("ALL CHATS",chats)
            this.setState({chats:chats})
        }))
    .catch(err=>{
        console.log("All Chats Error",err)
    })
}



 render() {
   const {navigate}=this.props.navigation;
   console.log(this.state.chats,"chats state in render")
   return (

<View>

<View style={{height:Dimensions.get('window').height}}>

<View style={{flexDirection:'row'}}>

            <TextInput placeholder="SEARCH MESSAGE"  style={{ height: 32, width: "80%",marginBottom:10,marginTop:20,marginLeft:10,marginRight:10,paddingLeft:10, borderColor: '#001733', borderWidth: 1, }}/>     
<View style={{width:50,height:30,backgroundColor:'#19c6c0',marginTop:'5%'}}>
    <Image source={require('../images/searchs.png')} style={{width:20,height:20,margin:5,marginLeft:15}}/>
</View>
</View>
<View style={{marginBottom:50}}>
<ScrollView>
 {
      this.state.chats && this.state.chats.map((chat,i)=>{
        console.log("chat in map ", chat)
             return(
         <View>
         <TouchableOpacity onPress={()=>navigate('ChatOpenEx',{seller_number:chat.seller_number,user_id:chat.seller_id,post_id:chat.post_id,chat_id:chat.chat_no})}>
 <View style={{flexDirection:'row',height:40,marginBottom:30}}>
 <Image source={require('../images/men.jpg')} style={{width:50,height:50,marginLeft:10}}/>

 <View style={{marginLeft:10}}> 

 <View style={{flexDirection:'row',justifyContent:'space-between'}}>
     <View style={{flexDirection:'row'}}>

     {
chat.is_new == "no" ? 
<Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'400'}}>{chat.seller_name} </Text>
:
<Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500'}}>{chat.seller_name} </Text>

                }
 <View style={{backgroundColor:'#19c6c0',width:20,borderRadius:20,marginLeft:5}}>
 <Text style={{fontFamily: 'open-sans-bold',marginLeft:5,fontWeight:'500',color:'#001733'}}>1</Text>
 </View>
     </View>
     <View style={{marginLeft:'35%'}}>
 <Text style={{fontFamily: 'open-sans-bold',color:'gray',fontSize:12}}>{chat.date_time}</Text>
     </View>
 </View>


 
 {
chat.is_new == "no" ? 
<Text style={{fontFamily: 'open-sans-bold',marginTop:10,fontWeight:'400'}}>{chat.Item_Name}</Text>
:
<Text style={{fontFamily: 'open-sans-bold',marginTop:10,fontWeight:'500'}}>{chat.Item_Name}</Text>
} 
 </View>

 </View>
 </TouchableOpacity>




  </View>

     )
 }) 
} 

</ScrollView>
</View>


</View>

      </View>

   )
 }
}
export default ChatEx;