import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity, 
    BackHandler, DeviceEventEmitter,AsyncStorage} from 'react-native';
import { Icon ,Drawer, Item as FormItem,Header,Body,Card,Picker,Left,Right} from 'native-base';
import ContentView from './Drawer'
import StarRating from 'react-native-star-rating';
import ProfileTab from './ProfileTab'
import { Font } from 'expo';

class Timeline extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5,
          selected: "Recent",
          show:'HIDE',
          shows:false,
          user_id:"",
          timeline:[]
          
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
      onValueChange(value) {
        this.setState({
          selected: value
        });
        if(value =='Requested' ){
        fetch(`http://foodfella.net/Rentree/filter_timeline.php?user_id=${this.state.user_id}&requested=available`)
        .then(res=>{
            res.json().then(data=>{
                console.log("Requested data",data)
                this.setState({
                        timeline:data,  

            
                })
            })
        }).catch(err=>{
            console.log("Requested data err",err)
        })
    }
   else if(value =='Accepted' ){
        fetch(`http://foodfella.net/Rentree/filter_timeline.php?user_id=${this.state.user_id}&accepted=unavailable`)
        .then(res=>{
            res.json().then(data=>{
                console.log("Accepted data",data)
                this.setState({
                        timeline:data,  

            
                })
            })
        }).catch(err=>{
            console.log("Accepted data err",err)
        })
    }
    else if(value =='Completed' ){
        fetch(`http://foodfella.net/Rentree/filter_timeline.php?user_id=${this.state.user_id}&completed=completed`)
        .then(res=>{
            res.json().then(data=>{
                console.log("Completed data",data)
                this.setState({
                        timeline:data,  

            
                })
            })
        }).catch(err=>{
            console.log("Completed data err",err)
        })
    }
  

    else if(value =='Returned' ){
        fetch(`http://foodfella.net/Rentree/filter_timeline.php?user_id=${this.state.user_id}&rejected=rejected`)
        .then(res=>{
            res.json().then(data=>{
                console.log("Returned data",data)
                this.setState({
                        timeline:data,  

            
                })
            })
        }).catch(err=>{
            console.log("Returned data err",err)
        })
    }
    else {
        fetch(`http://foodfella.net/Rentree/show_timeline.php?user_id=${this.state.user_id}`)
        .then(res=>{
            res.json().then(data=>{
                console.log("timeline data",data)
                this.setState({
                        timeline:data,  

            
                })
            })
        }).catch(err=>{
            console.log("reviews data err",err)
        })
    }

      }

      ShowState(){
        if(this.state.show==='HIDE'){
            this.setState({
                show:'SHOW' ,
                shows:true
            })
         
        }
         if(this.state.show==='SHOW'){
            this.setState({
                show:'HIDE' ,
                shows:false
            })
        }
          }

          componentDidMount() {
    
            AsyncStorage.getItem("UID").then((uid)=>{
                 console.log("NEW USERID",uid)
                 fetch(`http://foodfella.net/Rentree/show_timeline.php?user_id=${uid}`)
                 .then(res=>{
                     res.json().then(data=>{
                         console.log("timeline data",data)
                         this.setState({
                                 timeline:data,  
     
                     
                         })
                     })
                 }).catch(err=>{
                     console.log("reviews data err",err)
                 })
                this.setState({user_id:uid},()=>{
                    
                })
            }).catch(err=>{
                console.log("Cant Get User_id From ASYNC STORAGE",err)
            })
        
           
          }
          TimelinesFunc=()=>{
           
          }

 render() {
   const {navigate}=this.props.navigation;
   console.log(this.state.timeline,"timeline in render")
   console.log(this.state.selected,"selected in render")
   return (
          
    <Drawer
    ref={(ref) => { this.drawer = ref; }}
    content={<ContentView menu={this.props}/>}
    onClose={() => this.closeDrawer()}
    openDrawerOffset={0.3}
    panCloseMask={0.3}>

<View>

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

        <View style={{borderBottomColor:'#0B3669',height:60,borderBottomWidth:1,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{color:'#0B3669',margin:15,fontSize:16,fontWeight:'500',width:'80%'}}>Timeline</Text>
<Picker

              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: '10%' }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >

              <Picker.Item label="Recent" value="Recent" />
              <Picker.Item label="Requested" value="Requested" />
              <Picker.Item label="Accepted" value="Accepted" />
              <Picker.Item label="Completed" value="Completed" />
              <Picker.Item label="Returned" value="Returned" />
            </Picker>
        </View>

 <ScrollView>
     <View style={{marginBottom:150}}>
        <View style={{}}>
{this.state.timeline && this.state.timeline.map((timeline,i)=>{
    return(

<View>
<Card style={{height:180,width:'90%',flexDirection:"row",marginLeft:'5%',marginTop:20}}>
<View style={{flex:1}}>
<Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:10}}>{timeline.Item_Name}</Text>
<View style={{flexDirection:'row',marginLeft:10}}>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>Rs. </Text>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>{timeline.Item_Rent}</Text>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'400',color:'#0B3669',marginLeft:10,marginTop:5}}>per day</Text>
    </View>

    <View style={{width:'70%',marginTop:10,marginLeft:10}}>
    <StarRating
    disabled={false}
    maxStars={5}
    rating={this.state.starCount}
    selectedStar={(rating) => this.onStarRatingPress(rating)}
    fullStarColor={'#19c6c0'}
    starSize={20}
  />
        </View>
        <View style={{flexDirection:'row',marginLeft:10}}>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:10,marginLeft:5}}>Posted</Text>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:10,marginLeft:5}}>by</Text>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:10,marginLeft:5}}>{timeline.Name}</Text>


            </View>

<TouchableOpacity onPress={()=>this.ShowState()} >
            <View style={{flexDirection:'row',marginTop:4}}>
            <View style={{marginLeft:10,marginTop:15,width:"90%",height:40,backgroundColor:'#19c6c0',alignItems:'center' }}>
            <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'white',padding:10}}>VIEW</Text>
                </View>          
                </View>
</TouchableOpacity>

</View>

<View style={{flex:1}}>
<View style={{width:'95%',height:'95%',marginTop:'2%'}}>

<Image source={{uri:timeline.Imagename}} style={{width:"100%",height:"95%"}}/>

</View> 

  

</View>

</Card>




{ this.state.shows ?
<Card style={{width:'90%',marginLeft:'5%',height:300,marginTop:-15}}>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'row',marginLeft:10,marginTop:10}}>
<View style={{width:30,height:30,backgroundColor:'#19c6c0',justifyContent:'center'}}>
<Image source={require('../images/interview.png')} style={{width:20,height:20,marginLeft:5}}/>
</View>
<Text style={{fontFamily: 'open-sans-bold',fontSize:16,color:"#0B3669",fontWeight:'500',marginTop:5,marginLeft:5}}>REQUESTED</Text>
</View>

<View>
{timeline.status == "available" || "unavailable" ?

    <Image source={require('../images/check.png')} style={{width:20,height:20,marginRight:15,marginTop:15}}/>
    :
    <Image source={require('../images/more.png')} style={{width:20,height:20,marginRight:15,marginTop:10}}/>

}

</View>

    </View>

<View style={{width:4,height:25,backgroundColor:'#19c6c0',marginLeft:'6%',marginTop:2}} />


<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'row',marginLeft:10,marginTop:5}}>
<View style={{width:30,height:30,backgroundColor:'#19c6c0',justifyContent:'center'}}>
<Image source={require('../images/checked.png')} style={{width:20,height:20,marginLeft:5}}/>
</View>
<Text style={{fontFamily: 'open-sans-bold',fontSize:16,color:"#0B3669",fontWeight:'500',marginTop:5,marginLeft:5}}>ACCEPTED</Text>
</View>

<View>
{timeline.status=="unavailable"?

<Image source={require('../images/check.png')} style={{width:20,height:20,marginRight:15,marginTop:15}}/>
:
<Image source={require('../images/more.png')} style={{width:20,height:20,marginRight:15,marginTop:10}}/>

}
</View>

    </View>


    <View style={{width:4,height:25,backgroundColor:'#19c6c0',marginLeft:'6%',marginTop:2}} />


<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'row',marginLeft:10,marginTop:5}}>
<View style={{width:30,height:30,backgroundColor:'#19c6c0',justifyContent:'center'}}>
<Image source={require('../images/task.png')} style={{width:20,height:20,marginLeft:5}}/>
</View>
<Text style={{fontFamily: 'open-sans-bold',fontSize:16,color:"#0B3669",fontWeight:'500',marginTop:5,marginLeft:5}}>COMPLETED</Text>
</View>

<View>
    <Image source={require('../images/more.png')} style={{width:20,height:20,marginRight:15,marginTop:10}}/>
</View>

    </View>

    <View style={{width:4,height:25,backgroundColor:'#19c6c0',marginLeft:'6%',marginTop:2}} />


<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'row',marginLeft:10,marginTop:5}}>
<View style={{width:30,height:30,backgroundColor:'#19c6c0',justifyContent:'center'}}>
<Image source={require('../images/undo.png')} style={{width:20,height:20,marginLeft:5}}/>
</View>
<Text style={{fontFamily: 'open-sans-bold',fontSize:16,color:"#0B3669",fontWeight:'500',marginTop:5,marginLeft:5}}>RETURNED</Text>
</View>

<View>
    <Image source={require('../images/more.png')} style={{width:20,height:20,marginRight:15,marginTop:10}}/>
</View>

    </View>
    <View style={{width:4,height:25,backgroundColor:'#19c6c0',marginLeft:'6%',marginTop:2}} />


<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'row',marginLeft:10,marginTop:5}}>
<View style={{width:30,height:30,backgroundColor:'#19c6c0',justifyContent:'center'}}>
<Image source={require('../images/star.png')} style={{width:20,height:20,marginLeft:5}}/>
</View>
<Text style={{fontFamily: 'open-sans-bold',fontSize:16,color:"#0B3669",fontWeight:'500',marginTop:5,marginLeft:5}}>RATED</Text>
</View>

<View>
    <Image source={require('../images/more.png')} style={{width:20,height:20,marginRight:15,marginTop:10}}/>
</View>

    </View>


</Card>:null
}

</View>

)
})}

</View>

</View>
</ScrollView>
</View> 
 </Drawer>
   )
 }
}
export default Timeline;