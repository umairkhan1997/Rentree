import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity, 
    BackHandler, DeviceEventEmitter} from 'react-native';
import { Icon ,Drawer, Item as FormItem,Header,Body,Card,Left,Right,Textarea,Button} from 'native-base';
import ContentView from './Drawer'
import ProfileTab from './ProfileTab'
import { Font } from 'expo';

class Help extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5,
          
        }
       
    }
    openDrawer = () => {
        this.drawer._root.open()
    };
    closeDrawer = () => {
        this.drawer._root.close()
    };

    

 render() {
   const {navigate}=this.props.navigation;
   return (
          
    <Drawer
    ref={(ref) => { this.drawer = ref; }}
    content={<ContentView menu={this.props}/>}
    onClose={() => this.closeDrawer()}
    openDrawerOffset={0.3}
    panCloseMask={0.3}>

     <View style={{marginBottom:10,flex:1}}>

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
<Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',margin:15,fontSize:16,fontWeight:'500'}}>HELP</Text>
        </View>


        <ScrollView >
    <View style={{backgroundColor:'#F0F0F0',flex:1,}}>

    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:16,fontWeight:'500',margin:20}}>
    F.A.Qs
    </Text>
    <View style={{ borderBottomColor:'gray',borderBottomWidth:0.8,width:'90%',
    marginLeft:'5%',marginBottom:5}}>
    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:14,fontWeight:'500',marginBottom:5
   }}>
  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  ?
    </Text>
    </View>
    <View style={{ borderBottomColor:'gray',borderBottomWidth:0.8,width:'90%',
    marginLeft:'5%',marginBottom:5}}>
    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:14,fontWeight:'500',marginBottom:5,marginTop:10
   }}>
  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  ?
    </Text>
    </View>
    <View style={{ borderBottomColor:'gray',borderBottomWidth:0.8,width:'90%',
    marginLeft:'5%',marginBottom:5}}>
    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:14,fontWeight:'500',marginBottom:5,marginTop:10
   }}>
  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  ?
    </Text>
    </View>

    <View style={{width:'90%',
    marginLeft:'5%',marginBottom:5}}>
    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:14,fontWeight:'500',marginBottom:5,marginTop:10
   }}>
  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  ?
    </Text>
    </View>

    <View style={{width:'90%',
    marginLeft:'5%',marginBottom:5}}>
    <Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:14,fontWeight:'400',marginBottom:5,marginTop:10
   }}>
  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  ? Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum
  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum
    </Text>
    </View>
<View style={{borderBottomColor:'gray',borderBottomWidth:0.8,width:'90%',marginLeft:'5%'}} />

<View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
<Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669'}}>OR</Text>
</View>

<Text style={{fontFamily: 'open-sans-bold',color:'#0B3669',fontSize:16,fontWeight:'500',margin:20}}>
   CONTACT US
    </Text>

    <View style={{borderWidth:1,borderColor:'#001733', width:'90%',marginLeft:'5%',marginTop:10}}>
            
            <Textarea
                    style={{height: 100,fontSize:16}}
                  //  onChangeText={(text) => this.setState({text})}
                   // //value={this.state.text}
                   placeholder="Type your message..."
                   placeholderTextColor="gray"
                  />
                        </View>
            
<Button
                  onPress={() => navigate('')} 
               style={{
             marginTop: 30, color: 'white', backgroundColor: '#19c6c0',
            marginHorizontal: "5%", width: '90%',  justifyContent: 'center',
            alignItems: 'center',height: 40, marginBottom: 10
            }}>
            <Text style={{fontFamily: 'open-sans-bold', color: 'white', fontSize: 18,fontWeight:'500' }}>SEND</Text>
                  </Button>
         <View style={{flexDirection:'row',justifyContent:'center',marginBottom:10}}>

<View style={{width:40,height:40,backgroundColor:'#19c6c0',borderRadius:20,}}> 
<Image source={require('../images/facebooks.png')} style={{width:20,height:20,margin:10}}/>
</View>

<View style={{width:40,height:40,backgroundColor:'#19c6c0',borderRadius:20,marginHorizontal:10}}> 
<Image source={require('../images/instagram.png')} style={{width:20,height:20,margin:10}}/>
</View>


<View style={{width:40,height:40,backgroundColor:'#19c6c0',borderRadius:20  }}> 
<Image source={require('../images/twitter.png')} style={{width:20,height:20,margin:10}}/>
</View>
         </View>


</View>
</ScrollView>

</View> 
 </Drawer>
   )
 }
}
export default Help;