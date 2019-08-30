import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity} from 'react-native';
import { Icon ,Drawer, Item ,Header,Body,Card,Input,Button,Toast,Root} from 'native-base';
import { Font } from 'expo';


class SignIn extends React.Component {
    static navigationOptions={
        header:null,
    }

constructor(props) {
  super(props);
  this.state = {
    Name:"",
    Email: "",
    Password: "",
    CNIC:"",
    DATE:""
  };
}
SignUp = () => {
  const { Name,Email, Password,CNIC,DATE } = this.state;
  let formData = new FormData();
  formData.append("Name", Name);
  formData.append("Email", Email);
  formData.append("Password", Password);
  formData.append("Cnic", CNIC);
  formData.append("Date", DATE);
  fetch(`http://foodfella.net/Rentree/signup.php` , {
     method: "POST",
     body:formData    
       }
  )
    
    .then(response => {
      console.log("reponse Sign Up", response);
      if (response._bodyInit == "success") {
          
          Toast.show({
            text: "Sign Up Succesful",
            position: "top",
            duration: 5000,
            type: "success"
          });
          this.setState({
            email: "",
            password: ""
          });

          this.props.navigation.navigate("SignIn", { response });
        }
        if (response._bodyInit !="success") {
          Toast.show({
            text: "Incorrect Sign Upss",
            position: "top",
            duration: 5000,
            type: "warning"
          });
          this.setState({
            email: "",
            password: ""
          });

         // this.props.navigation.navigate("Home", { response });
        }

    })
      .catch(error => {
        console.log("error", error);
          Toast.show({
            text: "Incorrect Sign Up",
            position: "top",
            duration: 5000,
            type: "danger"
          });
        });
    };

 render() {
   const {navigate}=this.props.navigation;
   console.log(this.state.Email, this.state.Password, this.state.Name, this.state.CNIC, this.state.DATE, "sign In");
   return (
    <Root>
<View style={{height:Dimensions.get('window').height,backgroundColor:'#0B3669',alignItems: 'center',
    justifyContent: 'center',}}>
{/* <Image source={require('../images/splash.png')} style={{width:80,height:80,zIndex:1,top:'25%',position:'relative'}} /> */}
    <Card style={{height:560,marginTop:'10%',width:'80%',
    borderRadius:10,backgroundColor:'#CED7E0'}}>
      <View style={{flexDirection:'row',justifyContent:'center'}}>
    <Image source={require('../images/logo.png')} style={{width:120,height:120,marginTop:-60}} />
    </View>
<View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
<Item style={{width:'90%',backgroundColor:'white'}}>
            <Icon active name='person' style={{marginLeft:10}}/>
            <Text style={{fontFamily: 'open-sans-bold',}}>Name :</Text>
            <Input 
              value={this.state.Name}
              onChangeText={Name => this.setState({ Name })}
            />
          </Item>
</View>

<View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
<Item style={{width:'90%',backgroundColor:'white'}}>
            <Icon active name='md-mail' style={{marginLeft:10}}/>
            <Text style={{fontFamily: 'open-sans-bold',}}>Email :</Text>
            <Input 
                 value={this.state.Email}
                 onChangeText={Email => this.setState({ Email })}
            />
          </Item>
</View>


<View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
<Item style={{width:'90%',backgroundColor:'white'}}>
            <Icon active name='lock' style={{marginLeft:10}}/>
            <Text style={{fontFamily: 'open-sans-bold',}}>Password :</Text>
            <Input 
               value={this.state.Password}
               onChangeText={Password => this.setState({ Password })}
            />
          </Item>
</View>
<View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
<Item style={{width:'90%',backgroundColor:'white'}}>
<Image source={require('../images/document.png')} style={{width:20,height:20,marginLeft:8}}/>
            <Text style={{fontFamily: 'open-sans-bold',marginLeft:5}}>CNIC :</Text>
            <Input 
                value={this.state.CNIC}
                onChangeText={CNIC => this.setState({ CNIC })}
            />
          </Item>
</View>
<View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
<Item style={{width:'90%',backgroundColor:'white'}}>
<Image source={require('../images/document.png')} style={{width:20,height:20,marginLeft:8}}/>
            <Text style={{fontFamily: 'open-sans-bold',marginLeft:5}}>CNIC VALIDATE DATE:</Text>
            <Input 
              value={this.state.DATE}
              onChangeText={DATE => this.setState({ DATE })}
            />
          </Item>
</View>

<Button
                     //  onPress={() => navigate('SignIn')} 
                       onPressIn={()=>this.SignUp()}       
                                    style={{
                                        marginTop: 30, color: 'white', backgroundColor: '#0B3669',
                                        marginHorizontal: "25%", width: '50%',justifyContent: 'center',
                                        alignItems: 'center',
                                         textAlign: 'center', borderRadius: 20, height: 60, marginBottom: 0
                                    }}>
                                    <Text style={{fontFamily: 'open-sans-bold', color: 'white',  fontWeight: 'bold',textAlign: 'center', fontSize: 16, textAlign: 'center' }}>REGISTER</Text>
                                </Button>
                                <TouchableOpacity onPress={() => navigate("SignIn")}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text
                  style={{fontFamily: 'open-sans-bold', fontSize: 20, fontWeight: "500", marginTop: 10 }}
                >
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
    </Card>
</View>
</Root>
   )
 }
}
export default SignIn;



