import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity,AsyncStorage} from 'react-native';
import { Icon ,Drawer, Item as FormItem,Header,Body,Card,Left,Right} from 'native-base';
import ContentView from './Drawer'
import StarRating from 'react-native-star-rating';
import ProfileTab from './ProfileTab'
import { Font } from 'expo';
import { ImagePicker } from 'expo';

class Profile extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5,
          profile:[],
          images:null
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
    //   componentDidMount() {
    //     Font.loadAsync({
    //       'open-sans-bold': require('../assets/fonts/Segoe-UI.woff'),
    //     });
    //   }
    
    profileFunc=()=>{
        AsyncStorage.getItem("UID").then((uid)=>{
            console.log("NEW USERID",uid)
           this.setState({user_id:uid},()=>{
               
           })
           fetch(`http://foodfella.net/Rentree/profile.php?user_id=${uid}`)
           .then(res=>{
               res.json().then(data=>{
                   console.log("user_ads data",data)
                   this.setState({
                       
                    profile:data,
                       //item_id:data.Id  
               
                   })
               })
           }).catch(err=>{
               console.log("categories data err",err)
           })
       }).catch(err=>{
           console.log("Cant Get User_id From ASYNC STORAGE",err)
       })
      
    }
    componentDidMount(){
      
      this.profileFunc();
    }
    
    _pickImage = async () => {
            
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          imageSelect:"done",
          aspect: [4, 3],
          
        });
    // this.setState({
    //   images:result.uri
    // })
        console.log(result);
    
        if (!result.cancelled) {
         // this.setState({ images: result.uri });
          let localUri = result.uri;
  let filename = localUri.split("/").pop();

  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
 // tempArr.push({ uri: localUri, name: filename, type});
this.setState({
//uri: localUri, name: filename, type,
images:{ uri: localUri, name: filename, type}

}, () => {

///////////////////////////PROFILE IMAGE CHANGE METHOD

const {images,user_id}= this.state;

let formData = new FormData();
formData.append("Id", user_id);
// formData.append("Name", user_name);
// formData.append("Email", email);
// formData.append("Password", password);
// formData.append("Number", phone_number);
// formData.append("Address", address);
formData.append("Image", images);
fetch(`http://foodfella.net/Rentree/updateprofile.php`,{
method: "POST",
headers:{"Content-Type":"multipart/form-data"},
body: formData
})
.then(res => res.json())
.then(response => {
console.log("update profile", response);
if (response == "success") {
//  console.log("reponse Signin 1", response);
alert("Edit Profile Successfully")
// this.props.navigation.state.params.profileFunc();
// this.props.navigation.navigate('Profile');
this.profileFunc();
this.setState({
// user_name:"",
// email:"",
// password:"",
// phone_number:"",
// address:"",
images:"",
});

}
if (response == "fail") {
console.log("update profile ", response);
alert("Profile Not Edit")
this.setState({
//   user_name:"",
//   email:"",
//   password:"",
//   phone_number:"",
//   address:"",
  images:"",
});

// this.props.navigation.navigate("Home", { response });
}
}) .catch(error => {
console.log("error",error)
});
   



  });
 

        }
      };


 render() {
   const {navigate}=this.props.navigation;
   return (
          
    <Drawer
    ref={(ref) => { this.drawer = ref; }}
    content={<ContentView menu={this.props}/>}
    onClose={() => this.closeDrawer()}
    openDrawerOffset={0.3}
    panCloseMask={0.3}
>
<ScrollView>
<View style={{ marginTop: 22 }} >
            <Header style={{ backgroundColor: '#001733',height:60 }} >
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
                    <TouchableOpacity onPress={()=>navigate('ProfileEdit',{profileFunc:this.profileFunc,data:this.state.profile})}>
                    <Text style={{fontFamily: 'open-sans-bold',fontSize:16,fontWeight:'500',color:'white',marginRight:5}}>Edit</Text>
                {/* <Image source={require("../images/search.png")} style={{height:25,width:25,marginTop:0}}/> */}
                    </TouchableOpacity>
                </Right>
                {/* </TouchableOpacity> */}
            </Header>
      </View>
      {this.state.profile &&
    this.state.profile.map(data => {
      return (
<View>
<View style={{flexDirection:'row',justifyContent:'center'}}>
    <TouchableOpacity onPress={()=>this._pickImage()}>
<Image source={{uri:data.image}} style={{marginTop:20,width:200,height:200,borderRadius:100,borderWidth:0.5,borderColor:'black'}}/>
    </TouchableOpacity>
</View>

{/* <View style={{flexDirection:'row',justifyContent:'center',marginTop:-15}}>
<View style={{borderColor:'black',borderWidth:0.3,borderRadius:25,width:30,height:30,marginLeft:10,backgroundColor:'white'}}>
<Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:7,marginLeft:7}}/>
    </View>
</View> */}

<View style={{flexDirection:'row',justifyContent:'center'}}>
    <Text style={{fontFamily: 'open-sans-bold',fontSize:16,fontWeight:'500',marginTop:10,color:'#0B3669'}}>{data.user_name}</Text>
    
    {/* <Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:10,marginLeft:10}}/> */}
</View> 
<View style={{flexDirection:'row',justifyContent:'center'}}>
    <Text style={{fontFamily: 'open-sans-bold',fontSize:16,fontWeight:'400',marginTop:10,color:'gray'}}>{data.phone_number}</Text>
    
    {/* <Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:10,marginLeft:10}}/> */}
</View> 
{/* <View style={{borderBottomWidth:0.7,borderBottomColor:'black',marginTop:10}}/> */}

 <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
 {/* <View style={{flexDirection:'row',width:'30%',marginRight:'5%'}}> */}
     <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',marginTop:10,color:'#0B3669',marginLeft:20}}>ADDRESS</Text>
     {/* <Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:10,marginLeft:10}}/> */}
 {/* </View> */}
 {/* <View style={{marginRight:10,width:'50%'}}> */}

     <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'400',marginTop:10,color:'#0B3669',marginRight:20,marginLeft:10}}>{data.address}</Text>
    {/* <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'gray'}
        starSize={20}
      /> */}
{/* </View> */}
</View>


{/* <View style={{borderBottomWidth:0.7,borderBottomColor:'black',marginTop:10}}/> */}

<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
 {/* <View style={{flexDirection:'row',width:'30%',marginRight:'5%',backgroundColor:'green'}}> */}
 <View style={{}}>
     <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',marginTop:10,color:'#0B3669',marginLeft:20}}>EMAIL</Text>
     {/* <Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:10,marginLeft:10}}/> */}
 </View>
 {/* <View style={{marginRight:10,width:'50%',backgroundColor:'yellow'}}> */}

     <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'400',marginTop:10,color:'#0B3669',marginRight:20,marginLeft:10}}>{data.email}</Text>
    {/* <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'gray'}
        starSize={20}
      /> */}
{/* </View> */}
</View>


{/* <View style={{borderBottomWidth:0.7,borderBottomColor:'black',marginTop:10}}/> */}

<View style={{flexDirection:'row',justifyContent:'flex-start',marginTop:10}}>
 {/* <View style={{flexDirection:'row'}}> */}
     <Text style={{marginRight:'35%',fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',marginTop:10,color:'#0B3669',marginLeft:20}}>PASSWORD</Text>
 
</View>
{/* <View style={{borderBottomWidth:0.7,borderBottomColor:'black',marginTop:10}}/> */}


 <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
{/* <View> */}
    <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',marginTop:10,color:'#0B3669',marginLeft:20}}>RENTEE RATING</Text>
    {/* <Text style={{fontSize:14,fontWeight:'500',color:'#0B3669'}}>Gushan,karachi , Pakistan</Text> */}
   
    {/* <View style={{marginRight:10,width:'50%'}}> */}

    {/* <Text style={{fontSize:20,fontWeight:'500',marginTop:10,color:'#0B3669'}}>Rating as Rentee</Text> */}
    <View style={{width:'25%',marginTop:10,marginRight:20,marginLeft:10}}>
    <StarRating
        disabled={true}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#19c6c0'}
        starSize={20}
      />
      </View>
      </View>
{/* </View> */}
{/* </View>  */}
{/* <View style={{borderBottomWidth:0.7,borderBottomColor:'black',marginTop:10}}/> */}

<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
{/* <View style={{}}> */}
    <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',marginTop:10,color:'#0B3669',marginLeft:20}}>RENTER RATING</Text>
    {/* <Text style={{fontSize:14,fontWeight:'500',color:'#0B3669'}}>Gushan,karachi , Pakistan</Text> */}
    {/* </View> */}
    {/* <View style={{marginRight:10,width:'50%'}}> */}

    {/* <Text style={{fontSize:20,fontWeight:'500',marginTop:10,color:'#0B3669'}}>Rating as Rentee</Text> */}
   <View style={{width:'25%',marginTop:10,marginRight:20,marginLeft:10}}>
    <StarRating
        disabled={true}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#19c6c0'}
        starSize={20}
      />
      </View>
      
</View>

</View> 
// </View>
);
})}

</ScrollView>

{/* </Card> */}
{/* <View style={{height:Dimensions.get('window').height}}>
<ProfileTab />
    </View> */}
            </Drawer>
   )
 }
}
export default Profile;