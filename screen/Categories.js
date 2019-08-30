import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  Image,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Icon,
  Drawer,
  Item as FormItem,
  Header,
  Body,
  Card
} from "native-base";
import { Font } from "expo";

class Categories extends React.Component {
  static navigationOptions = {
    header: null
  };
  //    openDrawer = () => {
  //        this.drawer._root.open()
  //    };
  //    closeDrawer = () => {
  //        this.drawer._root.close()
  //    };
  constructor(props) {
    super(props);
    this.state = {
      resta: []
    };
  }
  componentDidMount() {
    fetch(`http://foodfella.net/Rentree/adcategories`)
      .then(res => {
        res.json().then(data => {
          console.log("categories data", data);
          this.setState({
            resta: data
          });
        });
      })
      .catch(err => {
        console.log("categories data err", err);
      });
  }
  // ItemSelect=()=>{
  //   fetch(`http://foodfella.net/Rentree/get_ads_by_category.php?cat_id=12`)
  //   .then(res=>{
  //     res.json().then(data=>{
  //         console.log("categories data",data)
  //         this.setState({

  //             resta:data,

  //         })
  //     })
  // }).catch(err=>{
  //     console.log("categories data err",err)
  // })
  // }
  render() {
    const { navigate } = this.props.navigation;
    return (
      // <View style={styles.container}>
      <ScrollView>
        <View style={{ height: Dimensions.get("window").height }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.state.resta &&
              this.state.resta.map(data => {
                return (
                  // {/* <Card style={{width:'20%',height:80,marginLeft:'10%'}}>
                  // <View style={{alignItems:'center',marginTop:10}}>
                  //   <Image source={require('../images/car.png')} style={{width:40,height:40}}/>
                  //   <Text style={{fontSize:10,marginTop:5}}>VEHICLE</Text>
                  // </View>
                  // </Card> */}
                  <TouchableOpacity
                    key={data.Id}
                    onPress={() => navigate("CategoryItem", { id: data.Id })}
                    style={{
                      width: "20%",
                      height: 80,
                      marginLeft: "6%",
                      marginRight: "7%",
                      marginTop: 10,
                      marginBottom: 20
                    }}
                  >
                    <Card style={{ width: "100%", height: 80 }}>
                      <View style={{ alignItems: "center", marginTop: 10 }}>
                        <Image
                          source={{ uri: data.img }}
                          style={{ width: 40, height: 40 }}
                        />
                        <Text
                          style={{
                            fontFamily: "open-sans-bold",
                            fontSize: 10,
                            marginTop: 5
                          }}
                        >
                          {data.Name}
                        </Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}

            {/* <Card style={{width:'20%',height:80,marginLeft:'10%'}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/headphones.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>ACCESSORIES</Text>
</View>
</Card>

<Card style={{width:'20%',height:80,marginLeft:'10%'}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/home.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>PROPERTY</Text>
</View>
</Card> */}
          </View>
          {/* <View style={{flexDirection:'row',}}>
<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/smartphone.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>MOBILES</Text>
</View>
</Card>

<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/flash.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>ELECTRONICS</Text>
</View>
</Card>

<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/plant.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>HOME DECOR</Text>
</View>
</Card>
</View> */}
          {/* <View style={{flexDirection:'row',}}>
<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/shoe.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>FOOTWEAR</Text>
</View>
</Card>

<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/bed.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>FURNITURE</Text>
</View>
</Card>

<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/tshirt.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>APPAREL</Text>
</View>
</Card>

</View> */}
          {/* <View style={{flexDirection:'row',}}>
<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/book.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>Books</Text>
</View>
</Card>

<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/tools.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>EQUIPMENT</Text>
</View>
</Card>

<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/tent.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>EVENTS</Text>
</View>
</Card>
</View> */}
          {/* <View style={{flexDirection:'row',}}>
<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/cosmetics.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>COSMETICS</Text>
</View>
</Card>

<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/support.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>SERVICES</Text>
</View>
</Card>

<Card style={{width:'20%',height:80,marginLeft:'10%',marginTop:30}}>
<View style={{alignItems:'center',marginTop:10}}>
  <Image source={require('../images/cutlery.png')} style={{width:40,height:40}}/>
  <Text style={{fontSize:10,marginTop:5}}>CROCKERY</Text>
</View>
</Card>

  </View> */}
        </View>
      </ScrollView>
      // </View>
    );
  }
}
export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    backgroundColor: "white"
  }
});
