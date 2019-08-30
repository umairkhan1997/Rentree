import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity, 
    BackHandler, DeviceEventEmitter} from 'react-native';
import { Icon ,Drawer, Item as FormItem,Header,Body,Card,Picker,Left,Right} from 'native-base';
import ContentView from './Drawer'
import StarRating from 'react-native-star-rating';
import { Font } from 'expo';


class Search extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props) {
        super(props);
        this.state = {
            selected: "Rented",
            resta:null,
            search:'',
            images:null,
            recent:[]
          
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
      }
Search=()=>{
  fetch(`http://foodfella.net/Rentree/searchad/${this.state.search}`)
  .then(response => response.json())
  .then(res => {

    // res.json().then(response=>{ 
    //   console.log("search data",response)
    //   this.setState({
          
    //       resta:response,  
  
    //   })

       // this.props.navigation.navigate("Explore", { response });
       if (res != null) {
        // response.json().then(response=>{
          console.log("search data",res)
          var images = res[0].images;
          var result;
          result = images.split(",")
          console.log("NO IMAGES",images);
          console.log("IMAGES RESULT",result);
          this.setState({
              resta:res,  
              images:result,
              search:''
          })
this.AllRecent()
       // this.props.navigation.navigate("Explore", { response });
      // })
    }


      if (res ==null) {
        console.log("search data", res);
        // Toast.show({
        //   text: "No Such Product",
        //   position: "top",
        //   duration: 5000,
        //   type: "warning"
        // });
        alert('No Such Product')
        this.setState({
          resta: [],
          search:''
        });
        this.AllRecent()
       // this.props.navigation.navigate("Home", { response });
      }
      })



    
  .catch(error => {
    // Toast.show({
    //   text: "No Such Product",
    //   position: "top",
    //   duration: 5000,
    //   type: "danger"
    // });
    console.log(error)
  });
}
    
AllRecent() {
  fetch(`http://foodfella.net/Rentree/get_recent_search.php`)
    .then(res => {
      res.json().then(data => {
        // console.log("allads >>>", data);

        if (data != "No Recent Search") {
          this.setState({
            recent: data
          });
        }
      });
    })
    .catch(err => {
      console.log("get_recent_search Error >>>", err);
    });
}
DeleteRecent=(id)=>{
  fetch(`http://foodfella.net/Rentree/delete_recent_search.php?id=${id}`)
  .then(res => {
    res.json().then(data => {
       console.log("delete response >>>", data);
alert(id,'deleted')
this.AllRecent();
      // if (data != "No Recent Search") {
      //   this.setState({
      //     recent: data
      //   });
      // }
    });
  })
  .catch(err => {
    console.log("get_recent_search Error >>>", err);
  });
}
componentWillMount() {
  this.AllRecent();
}
 render() {

   const {navigate}=this.props.navigation;
   console.log(this.state.resta,"Product after search")
   return (
          
    <Drawer
    ref={(ref) => { this.drawer = ref; }}
    content={<ContentView menu={this.props}/>}
    onClose={() => this.closeDrawer()}
    openDrawerOffset={0.3}
    panCloseMask={0.3}>

<View>

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
              
                <Right  >
                <TouchableOpacity onPress={()=>navigate('Explore')}>
                <Image source={require("../images/close.png")} style={{height:25,width:25,marginTop:0}}/>
                </TouchableOpacity>
                </Right>
            </Header>
      </View>

<View style={{height:Dimensions.get('window').height}}>

<View style={{flexDirection:'row'}}>

            <TextInput 
           value={this.state.search}
           onChangeText={search => this.setState({ search })}
            placeholder="SEARCH MESSAGE"  style={{fontFamily: 'open-sans-bold', height: 32, width: "75%",marginTop:20,marginLeft:20,marginRight:10,paddingLeft:10, borderColor: '#001733', borderWidth: 1, }}/>     
<View style={{width:50,height:30,backgroundColor:'#19c6c0',marginTop:'5%'}}>
<TouchableOpacity onPress={()=>this.Search()}>
    <Image source={require('../images/searchs.png')} style={{width:20,height:20,margin:5,marginLeft:15}}/>
</TouchableOpacity>
</View>
</View>

<Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'gray',marginTop:10,marginLeft:20}}>Featured</Text>
    <View style={{height:150}}>
<ScrollView>
  {
    this.state.resta &&
    this.state.resta.map(data => {
      return (
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <TouchableOpacity onPress={()=>navigate('ItemShow',{data:data,Imagename:this.state.images[0],Item_Name:data.Item_Name,Item_Rent:data.Item_Rent,Location:data.Location})}>
  <Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'#001733',marginLeft:20}}>{data.Item_Name}</Text>
  </TouchableOpacity>
  {/* <Text style={{fontSize:14,color:'gray',marginRight:20}}>X</Text> */}
</View>
  );
})}
{/* <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <Text style={{fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
  <Text style={{fontSize:14,color:'gray',marginRight:20}}>X</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <Text style={{fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
  <Text style={{fontSize:14,color:'gray',marginRight:20}}>X</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <Text style={{fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
  <Text style={{fontSize:14,color:'gray',marginRight:20}}>X</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <Text style={{fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
  <Text style={{fontSize:14,color:'gray',marginRight:20}}>X</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <Text style={{fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
  <Text style={{fontSize:14,color:'gray',marginRight:20}}>X</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <Text style={{fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
  <Text style={{fontSize:14,color:'gray',marginRight:20}}>X</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <Text style={{fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
  <Text style={{fontSize:14,color:'gray',marginRight:20}}>X</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <Text style={{fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
  <Text style={{fontSize:14,color:'gray',marginRight:20}}>X</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <Text style={{fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
  <Text style={{fontSize:14,color:'gray',marginRight:20}}>X</Text>
</View> */}
</ScrollView>
</View>



<Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'gray',marginTop:10,marginLeft:20}}>Recent</Text>
    <View style={{height:150}}>
<ScrollView>
  {
this.state.recent &&
    this.state.recent.map(data => {
      return (
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'#001733',marginLeft:20}}>{data.search_item}</Text>
 <TouchableOpacity onPress={()=>this.DeleteRecent(data.id)}>
  <Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'gray',marginRight:20}}>X</Text>
 </TouchableOpacity>
</View>
//  <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
//   <Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
//   <Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'gray',marginRight:20}}>X</Text>
// </View>
// <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
//   <Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
//   <Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'gray',marginRight:20}}>X</Text>
// </View>
// <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
//   <Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
//   <Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'gray',marginRight:20}}>X</Text>
// </View>
// <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
//   <Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
//   <Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'gray',marginRight:20}}>X</Text>
// </View>
// <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
//   <Text style={{fontFamily: 'open-sans-bold',fontSize:12,color:'#001733',marginLeft:20}}>DSLR camera Canon</Text>
//   <Text style={{fontFamily: 'open-sans-bold',fontSize:14,color:'gray',marginRight:20}}>X</Text>
// </View> 
);
})}
</ScrollView>
</View>


</View>

</View>

</Drawer>
   )}
}

export default Search;
