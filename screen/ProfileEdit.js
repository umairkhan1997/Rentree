import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity,AsyncStorage} from 'react-native';
import { Icon ,Drawer, Item,Header, Input,Body,Card,Left,Right} from 'native-base';
import ContentView from './Drawer'
import StarRating from 'react-native-star-rating';
import { ImagePicker } from 'expo';
import { Font } from 'expo';

class ProfileEdit extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5,
          profile:[this.props.navigation.state.params.data],
          user_name:this.props.navigation.state.params.data[0].user_name,
          email:this.props.navigation.state.params.data[0].email,
          password:this.props.navigation.state.params.data[0].password,
          phone_number:this.props.navigation.state.params.data[0].phone_number,
          image:this.props.navigation.state.params.data[0].image,
          address:this.props.navigation.state.params.data[0].address,
          cnic:this.props.navigation.state.params.data[0].cnic,
          cnic_date:this.props.navigation.state.params.data[0].cnic_date,
          images:null,
          user_id:null
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

})
 

        }
      };
    componentDidMount(){
        AsyncStorage.getItem("UID").then((uid)=>{
            console.log("NEW USERID",uid)
           this.setState({user_id:uid},()=>{
               
           })
    //        fetch(`http://foodfella.net/Rentree/profile.php?user_id=${uid}`)
    //        .then(res=>{
    //            res.json().then(data=>{
    //                console.log("user_ads data",data)
    //                this.setState({
                       
    //                 profile:data,
    //                    //item_id:data.Id  
               
    //                })
    //            })
    //        }).catch(err=>{
    //            console.log("categories data err",err)
    //        })
    //    }).catch(err=>{
    //        console.log("Cant Get User_id From ASYNC STORAGE",err)
       })
      
      
    }
    
    editProfile=()=>{
        const {user_id,user_name,email,password,address,images,phone_number}= this.state;

          let formData = new FormData();
          formData.append("Id", user_id);
          formData.append("Name", user_name);
          formData.append("Email", email);
          formData.append("Password", password);
          formData.append("Number", phone_number);
          formData.append("Address", address);
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
   this.props.navigation.state.params.profileFunc();
   this.props.navigation.navigate('Profile');

      this.setState({
        user_name:"",
        email:"",
        password:"",
        phone_number:"",
        address:"",
        images:"",
      });
    
    }
    if (response == "fail") {
        console.log("update profile ", response);
        alert("Profile Not Edit")
        this.setState({
            user_name:"",
            email:"",
            password:"",
            phone_number:"",
            address:"",
            images:"",
        });

        // this.props.navigation.navigate("Home", { response });
      }
    }) .catch(error => {
        console.log("error",error)
       });
    }



 render() {
   const {navigate}=this.props.navigation;
   console.log(this.state.profile,typeof(this.state.profile),'state of profile edit');
   console.log(this.state.user_name,this.state.email,this.state.password,this.state.cnic,this.state.cnic_date,this.state.address,'state')
   return (
          
    <Drawer
    ref={(ref) => { this.drawer = ref; }}
    content={<ContentView menu={this.props}/>}
    onClose={() => this.closeDrawer()}
    openDrawerOffset={0.3}
    panCloseMask={0.3}
>
    <KeyboardAvoidingView behavior="padding" enabled>
<ScrollView>
<View style={{ marginTop: 22 }} >
            <Header style={{ backgroundColor: '#001733',height:60 }} >
                                     <Left >
                    <TouchableOpacity onPress={()=>navigate('Profile')}>
                    <Image    source={require('../images/left-arrow.png')} style={{height:20,width:20}}/>
                    </TouchableOpacity>
     </Left>
   <View style={{ marginLeft:'20%',marginTop:10 }}>
                    <Image    source={require('../images/logo.png')} style={{height:50,width:120,}}/>
                    </View>
              
                <Right  >
                <TouchableOpacity onPress={()=>this.editProfile()}>
                <Text style={{fontFamily: 'open-sans-bold',fontSize:16,fontWeight:'500',color:'white',marginRight:5}}>Update</Text>
                </TouchableOpacity>
                </Right>
                                {/* <Right /> */}

            </Header>
      </View>
      {this.state.profile &&
    this.state.profile.map(data => {
      return (
<View>
<View style={{flexDirection:'row',justifyContent:'center'}}>
{
this.state.images == null ?
<Image source={{uri:this.state.image}} style={{marginTop:20,width:200,height:200,borderRadius:100,borderWidth:0.5,borderColor:'black'}}/>
:
<Image source={{uri:this.state.images.uri}} style={{marginTop:20,width:200,height:200,borderRadius:100,borderWidth:0.5,borderColor:'black'}}/>
}
</View>

<View style={{flexDirection:'row',justifyContent:'center',marginTop:-15}}>
    <TouchableOpacity onPress={()=>this._pickImage()}>
<View style={{borderColor:'black',borderWidth:0.3,borderRadius:25,width:30,height:30,marginLeft:10,backgroundColor:'white'}}>
<Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:7,marginLeft:7}}/>
    </View>
    </TouchableOpacity>
</View>

<View style={{flexDirection:'row',justifyContent:'center'}}>
    {/* <Text style={{fontSize:16,fontWeight:'500',marginTop:10,color:'#0B3669'}}>{data.user_name}</Text> */}
    <Item style={{ width: "50%", backgroundColor: "white" }}>
    <Text style={{ fontFamily: 'open-sans-bold',fontSize: 18 }}>Name :</Text>   
                <Input
                  value={this.state.user_name}
                  onChangeText={user_name => this.setState({ user_name })}
                />
              </Item>
    {/* <Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:10,marginLeft:10}}/> */}
</View> 
<View style={{flexDirection:'row',justifyContent:'center'}}>
    {/* <Text style={{fontSize:16,fontWeight:'400',marginTop:10,color:'gray'}}>{data.phone_number}</Text> */}
    <Item style={{ width: "50%", backgroundColor: "white" }}>
    <Text style={{ fontFamily: 'open-sans-bold',fontSize: 18 }}>Phone :</Text>
              <Input
                value={this.state.phone_number}
                onChangeText={phone_number => this.setState({ phone_number })}
              />
            </Item>
    {/* <Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:10,marginLeft:10}}/> */}
</View> 
<View style={{borderBottomWidth:0.7,borderBottomColor:'black',marginTop:10}}/>

 <View style={{marginLeft:10,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
 <View style={{flexDirection:'row',width:'30%',marginRight:'5%'}}>
     <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',marginTop:10,color:'#0B3669'}}>ADDRESS</Text>
     {/* <Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:10,marginLeft:10}}/> */}
 </View>
 <View style={{marginRight:10,width:'50%'}}>

     {/* <Text style={{fontSize:14,fontWeight:'400',marginTop:10,color:'#0B3669'}}>{data.address}</Text> */}
     <Item style={{ width: "100%", backgroundColor: "white" }}>
              
              <Input
                value={this.state.address}
                onChangeText={address => this.setState({ address })}
              />
            </Item>
    {/* <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'gray'}
        starSize={20}
      /> */}
</View>
</View>


<View style={{borderBottomWidth:0.7,borderBottomColor:'black',marginTop:10}}/>

<View style={{marginLeft:10,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
 <View style={{flexDirection:'row',width:'30%',marginRight:'5%'}}>
     <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',marginTop:10,color:'#0B3669'}}>EMAIL</Text>
     {/* <Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:10,marginLeft:10}}/> */}
 </View>
 <View style={{marginRight:10,width:'50%'}}>

     {/* <Text style={{fontSize:14,fontWeight:'400',marginTop:10,color:'#0B3669'}}>{data.email}</Text> */}
     <Item style={{ width: "100%", backgroundColor: "white" }}>
              
              <Input
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
    {/* <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'gray'}
        starSize={20}
      /> */}
</View>
</View>


<View style={{borderBottomWidth:0.7,borderBottomColor:'black',marginTop:10}}/>

<View style={{marginLeft:10,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
 <View style={{flexDirection:'row'}}>
     <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',marginTop:10,color:'#0B3669'}}>PASSWORD</Text>
     {/* <Image source={require("../images/pencil.png")} style={{height:15,width:15,marginTop:10,marginLeft:10}}/> */}
 </View>
 <View style={{marginRight:10,width:'50%'}}>

 <Item style={{ width: "100%", backgroundColor: "white" }}>
              
              <Input
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            </View>
 {/* <View style={{marginRight:10}}>

     <Text style={{fontSize:16,fontWeight:'400',marginTop:10,color:'#0B3669'}}>bukhari_sami@gmail.com</Text> */}
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
<View style={{borderBottomWidth:0.7,borderBottomColor:'black',marginTop:10}}/>

 <View style={{marginLeft:10,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
<View>
    <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',marginTop:10,color:'#0B3669',marginRight:'5%'}}>RENTEE RATING</Text>
    {/* <Text style={{fontSize:14,fontWeight:'500',color:'#0B3669'}}>Gushan,karachi , Pakistan</Text> */}
    </View>
    <View style={{marginRight:10,width:'50%'}}>

    {/* <Text style={{fontSize:20,fontWeight:'500',marginTop:10,color:'#0B3669'}}>Rating as Rentee</Text> */}
    <View style={{width:'50%',marginTop:10}}>
    <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#19c6c0'}
        starSize={20}
      />
      </View>
</View>
</View> 
<View style={{borderBottomWidth:0.7,borderBottomColor:'black',marginTop:10}}/>

<View style={{marginLeft:10,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
<View style={{}}>
    <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',marginTop:10,color:'#0B3669',marginRight:'5%'}}>RENTER RATING</Text>
    {/* <Text style={{fontSize:14,fontWeight:'500',color:'#0B3669'}}>Gushan,karachi , Pakistan</Text> */}
    </View>
    <View style={{marginRight:10,width:'50%'}}>

    {/* <Text style={{fontSize:20,fontWeight:'500',marginTop:10,color:'#0B3669'}}>Rating as Rentee</Text> */}
   <View style={{width:'50%',marginTop:10}}>
    <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#19c6c0'}
        starSize={20}
      />
      </View>
      
</View>

</View> 
</View>
);
})}

</ScrollView>

{/* </Card> */}
{/* <View style={{height:Dimensions.get('window').height}}>
<ProfileTab />
    </View> */}
    </KeyboardAvoidingView>
            </Drawer>
   )
 }
}
export default ProfileEdit;