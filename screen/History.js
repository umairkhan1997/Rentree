import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,AsyncStorage,ScrollView,TouchableOpacity, 
    BackHandler, DeviceEventEmitter} from 'react-native';
import { Icon ,Drawer, Item as FormItem,Header,Body,Card,Picker,Left,Right} from 'native-base';
import StarRating from 'react-native-star-rating';
import ContentView from './Drawer'
import { Font } from 'expo';


class History extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props) {
        super(props);
        this.state = {
            selected: "Rented",
            history:[],
            //UserId:this.props.navigation.state.params.userId.response[0].Id,
            images:null,
            userId:null,
            historyRented:[]
        }
        this.backPressSubscriptions = new Set()
    }
    openDrawer = () => {
        this.drawer._root.open()
    };
    closeDrawer = () => {
        this.drawer._root.close()
    };
  
    onValueChange(value) {
        this.setState({
          selected: value
        });

if(value== 'Rented'){
  fetch(`http://foodfella.net/Rentree/get_user_history.php?user_id=${this.state.user_id}`)
  // fetch(`http://foodfella.net/Rentree/show_timeline.php?id=44`)
   .then(res=>{
       res.json().then(data=>{
           console.log("reviews data",data)
           // var images = data[0].images;
           // var result;
           // result = images.split(",")
           // console.log("NO IMAGES",images);
           // console.log("IMAGES RESULT",result);
           this.setState({
               
               history:[],  
              historyRented:data.rented
           })
       })
   }).catch(err=>{
       console.log("reviews data err",err)
   })
}


else if(value== 'Borrowed'){
  fetch(`http://foodfella.net/Rentree/get_user_history.php?user_id=${this.state.user_id}`)
  // fetch(`http://foodfella.net/Rentree/show_timeline.php?id=44`)
   .then(res=>{
       res.json().then(data=>{
           console.log("reviews data",data)
           // var images = data[0].images;
           // var result;
           // result = images.split(",")
           // console.log("NO IMAGES",images);
           // console.log("IMAGES RESULT",result);
           this.setState({
               
            history:data.borrowed,
              historyRented:[]
           })
       })
   }).catch(err=>{
       console.log("reviews data err",err)
   })
}
else {
  fetch(`http://foodfella.net/Rentree/get_user_history.php?user_id=${this.state.user_id}`)
  // fetch(`http://foodfella.net/Rentree/show_timeline.php?id=44`)
   .then(res=>{
       res.json().then(data=>{
           console.log("reviews data",data)
           // var images = data[0].images;
           // var result;
           // result = images.split(",")
           // console.log("NO IMAGES",images);
           // console.log("IMAGES RESULT",result);
           this.setState({
               
            history:data.borrowed,  
            historyRented:data.rented
           })
       })
   }).catch(err=>{
       console.log("reviews data err",err)
   })
}
      }

      onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }
    
      componentDidMount() {
      
    //    this.setState({
    //     userId: this.props.navigation.state.params.userId
    // })
    AsyncStorage.getItem("UID").then((uid)=>{
      console.log("NEW USERID",uid)
     this.setState({user_id:uid},()=>{
       
     })
     fetch(`http://foodfella.net/Rentree/get_user_history.php?user_id=${uid}`)
       // fetch(`http://foodfella.net/Rentree/show_timeline.php?id=44`)
        .then(res=>{
            res.json().then(data=>{
                console.log("reviews data",data)
                // var images = data[0].images;
                // var result;
                // result = images.split(",")
                // console.log("NO IMAGES",images);
                // console.log("IMAGES RESULT",result);
                this.setState({
                    
                    history:data.borrowed,  
                   historyRented:data.rented
                })
            })
        }).catch(err=>{
            console.log("reviews data err",err)
        })
 })
        
       .catch(err=>{
        console.log("Cant Get User_id From ASYNC STORAGE",err)
    })
      }

 render() {
   const {navigate}=this.props.navigation;
   console.log(this.state.historyRented,this.state.history,this.state.selected,"History")
   return (
          
    <Drawer
    ref={(ref) => { this.drawer = ref; }}
    content={<ContentView menu={this.props}/>}
    onClose={() => this.closeDrawer()}
    openDrawerOffset={0.3}
    panCloseMask={0.3}>

<View style={{marginBottom:30}}>

<View style={{ marginTop: 22 }} >
<Header style={{ backgroundColor: '#001733', }} >
                                     <Left >
                    <TouchableOpacity 
                     onPress={this.openDrawer.bind(this)}
                    >
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

        <View style={{borderBottomColor:'#0B3669',height:60,borderBottomWidth:1,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',margin:15,fontSize:16,fontWeight:'500',width:'80%'}}>HISTORY</Text>
<Picker

              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: '10%' }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >

              <Picker.Item label="Rented" value="Rented" />
              <Picker.Item label="Borrowed" value="Borrowed" />
              <Picker.Item label="All" value="All" />
            </Picker>
        </View>

 <ScrollView>
     <View style={{}}>

{this.state.history &&
  this.state.history.map(data => {
    return (

     <View style={{marginLeft:'2%',marginTop:20}}>

<Card style={{height:180,width:'98%',flexDirection:"row"}}>
<View style={{flex:1}}>

<Text style={{fontFamily: 'open-sans-bold',flex:1,fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:5}}>{data.ad_title}</Text>

<View style={{flex:1,flexDirection:'row',marginLeft:5}}>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>Rs. </Text>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>{data.ad_price}</Text>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'400',color:'#0B3669',marginLeft:10,marginTop:5}}>Total Amount</Text>
    </View>

 <View style={{flex:1,flexDirection:'row'}}>
 <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:5}}>Borrowed by </Text>
 <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#19c6c0',marginTop:5}}>{data.borrowed_by}</Text>

 </View>

            <View style={{flex:1,flexDirection:'row',marginTop:4}}>
            <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:5}}>Rented for </Text>
 <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>{data.rented_for} Days</Text>
                </View>

                <View style={{flex:1,flexDirection:'row',marginTop:4}}>
            <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:5}}>Rented on </Text>
 <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>{data.rented_on}</Text>
                </View>
</View>

<View style={{flex:1}}>
<View style={{width:'95%',height:'95%',marginTop:'2%'}}>

 <Image source={{ uri: data.ad_image  }} style={{width:"100%",height:"95%"}}/>

</View> 

  

</View>

</Card>


</View>
 );
})}
  <View style={{marginBottom:120}}>
{/* RENTED ARRAY */}
{this.state.historyRented &&
  this.state.historyRented.map(data => {
    return (

     <View style={{marginLeft:'2%',marginTop:20}}>

<Card style={{height:180,width:'98%',flexDirection:"row"}}>
<View style={{flex:1}}>

<Text style={{fontFamily: 'open-sans-bold',flex:1,fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:5}}>{data.ad_title}</Text>

<View style={{fontFamily: 'open-sans-bold',flex:1,flexDirection:'row',marginLeft:5}}>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>Rs. </Text>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>{data.ad_price}</Text>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'400',color:'#0B3669',marginLeft:10,marginTop:5}}>Total Amount</Text>
    </View>

 <View style={{flex:1,flexDirection:'row'}}>
 <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:5}}>Borrowed by </Text>
 <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#19c6c0',marginTop:5}}>{data.rented_by}</Text>

 </View>

            <View style={{flex:1,flexDirection:'row',marginTop:4}}>
            <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:5}}>Rented for </Text>
 <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>{data.rented_for} Days</Text>
                </View>

                <View style={{flex:1,flexDirection:'row',marginTop:4}}>
            <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:5}}>Rented on </Text>
 <Text style={{flex:1,fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>{data.rented_on}</Text>
                </View>
</View>

<View style={{flex:1}}>
<View style={{width:'95%',height:'95%',marginTop:'2%'}}>

 <Image source={{ uri: data.ad_image  }} style={{width:"100%",height:"95%"}}/>

</View> 

  

</View>

</Card>


</View>
 );
})}

</View>

</View>
</ScrollView>
</View> 
  </Drawer>
   )
 }
}
export default History;