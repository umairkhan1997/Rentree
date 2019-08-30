import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image ,
    ImageBackground,Dimensions,NativeModules,KeyboardAvoidingView,ScrollView,TouchableOpacity,TextInput,Picker,Item,AsyncStorage} from 'react-native';
import { Container,Content,Icon ,Drawer,Header,Body,Card, Form,Left,Right,Label,Textarea,CheckBox,Button } from 'native-base';
import ContentView from './Drawer'
// import Headers from './Header'
import { Constants, MapView, Location, Permissions } from "expo";
import { ImagePicker } from 'expo';
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';
// import ImagePicker from 'react-native-image-crop-picker';
// var ImagePicker = NativeModules.ImageCropPicker;
import { Font } from 'expo';

let tempArr = [];

class MyAddEdit extends React.Component {
    static navigationOptions={
        header:null,
    } 
     constructor(props) {
        super(props);
        this.state = {
            language: undefined,
            mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    geocode:'',
    text:"",
    cat:[],
    CNIC:false,
    Secs:true,
    image: null,
    TITLE:"",
    DESCRIPTION:"",
    pricePerday:null,
    depoCnic:null,
    imageBrowserOpen: false,
    cameraBrowserOpen: false,
    photos: [],
     imageSelect:"",
     Cnics:null,
     user_id:null,
     images:null,
     cati:[],
     ItemId:null
      }
    }
 
    imageBrowserCallback = (callback) => {
      callback.then((photos) => {
        console.log(photos)
        this.setState({
           imageBrowserOpen: false,
          imageSelect:"done",
          photos
        })
      }).catch((e) => console.log(e))
    }
  
    renderImage(item, i) {
      return(
        <Image
          style={{height: 100, width: 100}}
          source={{uri: item.file}}
          key={i}
        />
      )
    }

  
        
            onValueChange(value) {
                this.setState({
                  selected: value
                });
              }
addCat=()=>{


              fetch(`http://foodfella.net/Rentree/adcategories`)
                .then(res=>{
                    res.json().then(data=>{
                        console.log("categories data",data)
                        this.setState({
                            
                            cati:data,  
                    
                        })
                    })
                }).catch(err=>{
                    console.log("categories data err",err)
                })
            }

              componentDidMount() {
                AsyncStorage.getItem("UID").then((uid)=>{
                  console.log("NEW USERID",uid)
                 this.setState({user_id:uid},()=>{
                   
                 })
             }).catch(err=>{
                 console.log("Cant Get User_id From ASYNC STORAGE",err)
             })
                this._getLocationAsync();
                this.addCat();
                fetch(`http://foodfella.net/Rentree/Product_detail.php?id=${this.props.navigation.state.params.id}
                `)
                .then(res=>{
                    res.json().then(data=>{
                        console.log("categories data",data)
                        console.log("categories data",data[0].Item_Name,data[0].Item_Rent,data[0].Deposit)
                        var images = data[0].images;
              var result;
              result = images.split(",")
              console.log("NO IMAGES",images);
              console.log("IMAGES RESULT",result);
                        this.setState({
                            cat:data,  
                            TITLE:data[0].Item_Name,
                            pricePerday:data[0].Item_Rent,
                            depoCnic:data[0].Deposit,
                            Cnics:data[0].Cnic,
                            DESCRIPTION:data[0].Description,
                            text:data[0].Location,
                             ItemId:data[0].Id,
                            // longitude:data.Longitude,
                           // images:result
                        })
                    })
                }).catch(err=>{
                    console.log("categories data err",err)
                })
              }
            
              _handleMapRegionChange = mapRegion => {
                this.setState({ mapRegion });
              };
            
              _getLocationAsync = async () => {
               let { status } = await Permissions.askAsync(Permissions.LOCATION);
               if (status !== 'granted') {
                 this.setState({
                   locationResult: 'Permission to access location was denied',
                   location,
                 });
               }
            
               let location = await Location.getCurrentPositionAsync({});
               let geocode = await Location.reverseGeocodeAsync(location.coords);
               this.setState({ locationResult: JSON.stringify(location), location,geocode:geocode });
             };
             Sec=()=>{
if(this.state.Secs===true){
  this.setState({
    Secs:false,
    CNIC:true
  })
}
if(this.state.Secs===false){
  this.setState({
    Secs:true,
    CNIC:false
  })
}

             }
             CNIC=()=>{
              if(this.state.CNIC==true){
                this.setState({
                  Secs:true,
                  CNIC:false
                })

            }
            if(this.state.CNIC==false){
              this.setState({
                Secs:false,
                CNIC:true
              })

            }
          }
          _pickImage = async () => {
            
            let result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: false,
              imageSelect:"done",
              aspect: [4, 3]
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
      tempArr.push({ uri: localUri, name: filename, type});
this.setState({
  //uri: localUri, name: filename, type,
  images:{ uri: localUri, name: filename, type}
})
     

            }
          };
        // imagePickers=()=>{
        //   ImagePicker.openPicker({
        //     multiple: true
        //   }).then(images => {
        //     console.log(images,"new image picker");
        //   });
        // }
      //   imagePickers=()=>{
      //   ImagePicker.openPicker({
      //     multiple: true,
      //     waitAnimationEnd: false,
      //     includeExif: true,
      //     forceJpg: true,
      //   }).then(images => {
      //     this.setState({
      //       image: null,
      //       images: images.map(i => {
      //         console.log('received image', i);
      //         return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
      //       })
      //     }); 
      //   }).catch(e => alert(e));
      // }

        PostEdit=()=>{
          const {ItemId, images,user_id,language, TITLE,pricePerday,depoCnic,Cnics,DESCRIPTION,text, } = this.state;
          const {latitude,longitude}= this.state.location.coords;
         // const {md5}= this.state.photos[0];
          //const jpg=".jpg"
          let formData = new FormData();
          formData.append("name", TITLE);
          formData.append("price", pricePerday);
          formData.append("deposit", depoCnic);
          formData.append("cnic", Cnics);
          formData.append("description", DESCRIPTION);
          formData.append("location", text);
          formData.append("latitude", latitude);
          formData.append("longitude", longitude);
          formData.append("catid", language);
          formData.append("userid", user_id);
          formData.append("Image", images);
          formData.append("post_id", ItemId);
          if(TITLE==='' ){
            alert('Fill the Title First !')
          }
          else if( pricePerday===null ){
            alert('Enter The Price per Day')
          }
          else if(depoCnic===null && Cnics===null ){
            alert('Fill Deposit or Cnic Field ')
          }
          else if(DESCRIPTION==="" ){
            alert('Fill Descriptio first')
          }
          else if(text==="" ){
            alert('Location Field is not fill')
          }
          else if(images===null){
            alert('Select Image Before Post. ')
          }
          else{
          fetch(`http://foodfella.net/Rentree/edit_ad.php`, {
            method: "POST",
            headers:{"Content-Type":"multipart/form-data"},
            body: formData
          })
          .then(res => res.json())
      .then(response => {
         console.log("edit add", response);
        if (response == "success") {
          //  console.log("reponse Signin 1", response);
       alert("Post Edit Successfully")
       this.props.navigation.navigate('MyAdds');
       this.props.navigation.state.params.Myadds();
       this.props.navigation.state.params.AllDealsItem()
          this.setState({
            TITLE:"",
            pricePerday:null,
            depoCnic:null,
            Cnics:null,
            DESCRIPTION:"",
            text:"",
            language:undefined,
            photos:[],
            latitude: null, 
            longitude: null,
            ItemId:null
          });
        
        }
        if (response == "fail") {
          console.log("post ad ", response);
          alert("Post Not Add Successfully")
          this.setState({
            TITLE:"",
            pricePerday:null,
            depoCnic:null,
            Cnics:null,
            DESCRIPTION:"",
            text:"",
            language:undefined,
            photos:[],
            latitude: null, 
            longitude: null
          });

          // this.props.navigation.navigate("Home", { response });
        }
      })
          .catch(error => {
           console.log(error)
          });
        }
        }

 render() {
   const {navigate}=this.props.navigation;
   let coords = {
    latitude: 37.78825,
    longitude: -122.4324,
  };
  console.log(this.props,"props in render")
//   console.log(this.state.location,"location state rent")
//   console.log(this.state.language,"language")
//   console.log(this.state.imageBrowserOpen,"imageBrowserOpen")
//   console.log(this.state.geocode,"geocode state rent")
//   console.log(this.state.photos,"geocode state rent")
  console.log(
  this.state.TITLE,
this.state.pricePerday,
this.state.depoCnic,
this.state.Cnics,
this.state.DESCRIPTION,
this.state.text,
this.state.language,
this.state.user_id,
// typeof( this.state.photos[0].file),
// typeof( this.state.photos[0].uri),
 typeof( this.state.images),
 this.state.images,
this.state.uri,"all data")
  let { image } = this.state;
  if (this.state.imageBrowserOpen) {
    return(<ImageBrowser max={10} callback={this.imageBrowserCallback}/>);
  }else if (this.state.cameraBrowserOpen) {
    return(<CameraBrowser max={10} callback={this.imageBrowserCallback}/>);
  }
   return (
<View >
<ScrollView>
<View >
<View style={{ marginTop: 22 }} >
            <Header style={{ backgroundColor: '#001733',height:60 }} >
                                     <Left >
                    <TouchableOpacity onPress={()=>navigate('MyAdds')}>
                    <Image    source={require('../images/left-arrow.png')} style={{height:20,width:20}}/>
                    </TouchableOpacity>
     </Left>
   <View style={{ marginLeft:'20%',marginTop:10 }}>
                    <Image    source={require('../images/logo.png')} style={{height:50,width:120,}}/>
                    </View>
              
                {/* <TouchableOpacity onPress={()=>navigate('Cart',{id:this.props.navigation.state.params.response})}> */}
                {/* <Right  >
                <TouchableOpacity onPress={()=>this._pickImage()}>
                <Image source={require("../images/search.png")} style={{height:25,width:25,marginTop:0}}/>
                </TouchableOpacity>
                </Right> */}
                <Right />
                {/* </TouchableOpacity> */}
            </Header>
      </View>

<View>
    <View style={{flexDirection:'row'}}>
<View style={{width:'60%',marginTop:10,borderWidth:1,borderColor:'black',height:30,position:'relative',zIndex:1,top:0,left:30}}>
</View>
<View style={{width:'10%',marginTop:10,backgroundColor:"#19c6c0",height:30,position:'relative',zIndex:-1,top:0,left:'160%'}}>
</View>
</View>
<View  style={{flexDirection:'row',justifyContent:'center',marginTop:-40}}>

<Picker
  selectedValue={this.state.language}
  textStyle={{fontSize: 8}}
  style={{height: 50, width: 300,color:'gray', }}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({language: itemValue})
    
  }>
  {/* <Picker.Item label="SELECT CATEGORY"  />
  <Picker.Item label="JavaScript" value="js" /> */}
        {
  this.state.cati.map( (v)=>{
   return <Picker.Item label={v.Name} value={v.Id} />
  })
 }
</Picker>
</View>   


</View> 


<View>
<Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'gray',marginLeft:'6%',marginTop:5}}>AD TITLE *</Text>

<View style={{borderBottomWidth:1,borderBottomColor:'#001733', width:'90%',marginLeft:'5%'}}>
            
<TextInput
        style={{height: 40,fontSize:16}}
       onChangeText={(TITLE) => this.setState({TITLE})}
       value={this.state.TITLE}
       //placeholder="Random Title xyz"
       placeholderTextColor="#001733"
      />
            </View>

</View>

<View style={{marginTop:10}}>
<Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'gray',marginLeft:'6%',marginTop:5}}>AD DESCRIPTION *</Text>

<View style={{borderWidth:1,borderColor:'#001733', width:'90%',marginLeft:'5%',marginTop:10}}>
            
<Textarea
        style={{fontFamily: 'open-sans-bold',height: 60,fontSize:16}}
       onChangeText={(DESCRIPTION) => this.setState({DESCRIPTION})}
       value={this.state.DESCRIPTION}
    //   placeholder="Very competitve multi day price. Will come fully charged with 2 batteries and in a fightcase ."
       placeholderTextColor="#001733"
      />
            </View>

</View>



<View style={{marginTop:10}}>
<Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'gray',marginLeft:'6%',marginTop:5}}>PRICE (PER DAY) *</Text>

<View style={{borderBottomWidth:1,borderBottomColor:'#001733', width:'90%',marginLeft:'5%',flexDirection:'row'}}>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:16,color:'gray',marginTop:10}}>RS</Text>    
<TextInput
        style={{fontFamily: 'open-sans-bold',height: 40,fontSize:16,marginLeft:5,width: "100%"}}
       onChangeText={(pricePerday) => this.setState({pricePerday})}
       value={this.state.pricePerday}
     //  placeholder="500"
       placeholderTextColor="#001733"
      />
            </View>

</View>


<View style={{marginTop:10}}>
<Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'gray',marginLeft:'6%',marginTop:5}}>ENTER OR PIN LOCATION *</Text>

<View style={{borderBottomWidth:1,borderBottomColor:'#001733', width:'90%',marginLeft:'5%',flexDirection:'row'}}>
     
<TextInput
        style={{fontFamily: 'open-sans-bold',height: 40,fontSize:16,marginLeft:5,width: "100%"}}
       onChangeText={(text) => this.setState({text})}
       value={this.state.text}
      // placeholder="H.NO. 374 Phase 5, Defence, xyz"
       placeholderTextColor="#001733"
      />
            </View>

</View>


<View style={{marginTop:10,marginLeft:'5%',width:'90%',borderWidth:1,borderColor:'#19c6c0'}}>
          {/* <MapView
            style={{ alignSelf: "stretch", height: 180,width:'100%',borderWidth:2,borderColor:'#19c6c0' }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // onRegionChange={this._handleMapRegionChange}
          >
            <MapView.Marker
              coordinate={coords}
              title="My Marker"
              description="Some description"
            />
          </MapView> */}
            <MapView
          style={{ alignSelf: "stretch", height: 180,width:'100%',borderWidth:2,borderColor:'#19c6c0' }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        //   onRegionChange={this._handleMapRegionChange}
        >
    <MapView.Marker
      coordinate={this.state.location.coords}
      title="My Marker"
      description="Some description"
  
    >
      <Image
                  source={require('../images/location.png')}
                  //style={{ transform: [{ rotate: `${angle}deg`}]}}
                 style={{width:20,height:20}}
                />
      </MapView.Marker>
        </MapView>
      

          {/* <Text>Location: {this.state.locationResult}</Text> */}
        </View>

        <View style={{flexDirection:'row',marginTop:10}}>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'gray',marginLeft:'6%',marginTop:0}}>SECURITY DEPOSIT </Text>
        {/* <TouchableOpacity onPress={()=>this.Sec()}>
        <CheckBox checked={this.state.Secs} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=>this.Sec()}>
        {
    this.state.Secs ?<View >

    <Image source={require('../images/selectedbox.png')} style={{width:20,height:20,marginLeft:10}}/>
   
   </View> 
   :
       <Image source={require('../images/uncheck.png')} style={{width:20,height:20,marginLeft:10}}/>
      }
      </TouchableOpacity>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'gray',marginLeft:'4%',marginTop:0}}>CNIC </Text>
        {/* <TouchableOpacity onPress={()=>this.CNIC()}>
        <CheckBox checked={this.state.CNIC} style={{marginLeft:20}}/>
        </TouchableOpacity> */}
         <TouchableOpacity onPress={()=>this.CNIC()}>
                {
    this.state.CNIC ?<View >

    <Image source={require('../images/selectedbox.png')} style={{width:20,height:20,marginLeft:10}}/>
   
   </View> 
   :
       <Image source={require('../images/uncheck.png')} style={{width:20,height:20,marginLeft:10}}/>
      }
      </TouchableOpacity>
        </View>
      

        <View >
    
                {
    this.state.Secs ?
    <View style={{borderBottomWidth:1,borderBottomColor:'#001733', width:'90%',marginLeft:'5%',flexDirection:'row'}}>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:16,color:'gray',marginTop:10}}>RS : </Text>  
        <TextInput
        style={{fontFamily: 'open-sans-bold',width: "100%",height: 40,fontSize:16,marginLeft:5}}
       onChangeText={(depoCnic) => this.setState({depoCnic})}
       value={this.state.depoCnic}
     
       placeholderTextColor="#001733"
      />
      </View>
        :  
        <View style={{borderBottomWidth:1,borderBottomColor:'#001733', width:'90%',marginLeft:'5%',flexDirection:'row'}}>
        <Text style={{fontFamily: 'open-sans-bold',fontSize:16,color:'gray',marginTop:10}}>CNIC : </Text>  
<TextInput
        style={{fontFamily: 'open-sans-bold',width: "100%",height: 40,fontSize:16,marginLeft:5}}
       onChangeText={(Cnics) => this.setState({Cnics})}
       value={this.state.Cnics}
     
       placeholderTextColor="#001733"
      />
      </View>
                }
            </View>

                      {/* IMAGES PICKER */}

{
  this.state.images == null &&
  <TouchableOpacity     
  // onPress={() => {
  //   this.setState({imageBrowserOpen: true})}  
// }
onPress={()=>this._pickImage()}
>
<View style={{width:'90%',height:200,borderWidth:1,borderColor:"#001733",marginLeft:'5%',marginTop:15}}>

<View style={{flexDirection:'row',justifyContent:'center',marginTop:'10%'}}>

<Image style={{width:60,height:60}} source={require('../images/picture.png')}/>
</View>
<View style={{flexDirection:'row',justifyContent:'center'}}>
<Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'#001733',fontWeight:'500'}}>UPLOAD IMAGE(S)</Text>
</View>

</View>
</TouchableOpacity>
}

{this.state.images != null &&
<ScrollView >
<View style={{flexDirection:'row',justifyContent:'center'}}>
  <Image source={{uri:this.state.images.uri}} style={{width:250,height:150,marginTop:5}}/>
  </View>
</ScrollView>}


<Button
                  onPress={() => this.PostEdit()} 
               style={{
             marginTop: 30, color: 'white', backgroundColor: '#19c6c0',
            marginHorizontal: "5%", width: '90%',  justifyContent: 'center',
            alignItems: 'center',height: 40, marginBottom: 10
            }}>
            <Text style={{ fontFamily: 'open-sans-bold',color: 'white', fontSize: 18,fontWeight:'500' }}>POST AD</Text>
                  </Button>

</View>
   </ScrollView>
          </View>
   )
 }
}
export default MyAddEdit;