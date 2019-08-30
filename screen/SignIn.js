import React from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Icon, Item, Card, Input, Button, Toast, Root } from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class SignIn extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "h@gmail.com",
      password: "12345",
      showScreen: true
    };
  }

  componentDidMount() {
    this.props.user &&
      this.props.user.user_ID &&
      this.props.navigation.navigate("Explore");
  }

  SignIn = () => {
    const { email, password } = this.state;
    let formData = new FormData();
    formData.append("Email", email);
    formData.append("Password", password);
    fetch(`http://foodfella.net/Rentree/login.php`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(response => {
        // console.log("reponse Signin", response);
        if (response != "Failed") {
          // console.log("reponse Signin 1", response);
          Toast.show({
            text: "Login Succesful",
            position: "top",
            duration: 5000,
            type: "success"
          });
          this.setState({
            email: "",
            password: ""
          });

          if (Number(response[0].Id) > 0) {
            this.props.updateUser({
              user_ID: response[0].Id
            });
          }

          AsyncStorage.setItem("UID", response[0].Id)
            .then(() => {
              this.props.navigation.navigate("Explore", { response });
            })
            .catch(err => {
              alert("user id saving error in signin");
            });
        }

        if (response == "Failed") {
          console.log("reponse Signin 1", response);
          Toast.show({
            text: "Incorrect Login",
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
        Toast.show({
          text: "Incorrect Login",
          position: "top",
          duration: 5000,
          type: "danger"
        });
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { showScreen } = this.state;

    // console.log(this.state.email, this.state.password, "sign In");

    return (
      <Root>
        <View
          style={{
            height: Dimensions.get("window").height,
            backgroundColor: "#0B3669"
          }}
        >
          {showScreen ? (
            <Card
              style={{
                height: 410,
                marginTop: "auto",
                marginBottom: "auto",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 10,
                backgroundColor: "#CED7E0"
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  source={require("../images/logo.png")}
                  style={{ width: 120, height: 120, marginTop: -60 }}
                />
              </View>
              {/* <View style={{flexDirection:'row',justifyContent:'center',marginTop:'20%'}}>
<Item style={{width:'90%',backgroundColor:'white'}}>
<Icon active name='person' style={{marginLeft:10}}/>
<Text>Name :</Text>
<Input />
</Item>
</View> */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 40
                }}
              >
                <Item style={{ width: "90%", backgroundColor: "white" }}>
                  <Icon active name="md-mail" style={{ marginLeft: 10 }} />
                  <Text style={{ fontFamily: "open-sans-bold", fontSize: 18 }}>
                    Email :
                  </Text>
                  <Input
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  />
                </Item>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20
                }}
              >
                <Item style={{ width: "90%", backgroundColor: "white" }}>
                  <Icon active name="lock" style={{ marginLeft: 10 }} />
                  <Text style={{ fontFamily: "open-sans-bold", fontSize: 18 }}>
                    Password :
                  </Text>
                  <Input
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry
                  />
                </Item>
              </View>
              <Button
                //  onPress={() => navigate('Explore')}
                onPress={() => this.SignIn()}
                style={{
                  marginTop: 30,
                  color: "white",
                  backgroundColor: "#0B3669",
                  marginHorizontal: "25%",
                  width: "50%",
                  textAlign: "center",
                  borderRadius: 20,
                  height: 60,
                  marginBottom: 0
                }}
              >
                <Text
                  style={{
                    fontFamily: "open-sans-bold",
                    color: "white",
                    marginLeft: "35%",
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center"
                  }}
                >
                  LOGIN
                </Text>
              </Button>
              <TouchableOpacity onPress={() => navigate("SignUp")}>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 20,
                      fontWeight: "500",
                      marginTop: 10
                    }}
                  >
                    Sign Up
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 30
                }}
              >
                <Image
                  source={require("../images/facebook.png")}
                  style={{ width: 60, height: 60, marginRight: 10 }}
                />
                <Image
                  source={require("../images/google-plus.png")}
                  style={{ width: 60, height: 60, marginLeft: 10 }}
                />
              </View>
            </Card>
          ) : (
            <ImageBackground
              source={require("../images/splashs.jpg")}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </View>
      </Root>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
