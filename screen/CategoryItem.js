import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity} from 'react-native';
import { Icon ,Drawer, Item as FormItem,Header,Body,Card,DatePicker} from 'native-base';
import { Font } from 'expo';
import { connect } from "react-redux";
import { updateFavourites, updateUser } from "../Redux/actions/authActions";
let like_Post_id_Array = [];

class CategoryItem extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props){
      super(props)
      this.state={
          resta:[],
          images:null,
          id:this.props.navigation.state.params.id
      }
    }
//    openDrawer = () => {
//        this.drawer._root.open()
//    };
//    closeDrawer = () => {
//        this.drawer._root.close()
//    };

// componentDidMount(){
        
 
//       fetch(`http://foodfella.net/Rentree/allads`)
//       .then(res=>{
//           res.json().then(data=>{
//               console.log("allDeal data",data)
//               var images = data[0].images;
//               var result;
//               result = images.split(",")
//               console.log("NO IMAGES",images);
//               console.log("IMAGES RESULT",result);
//               this.setState({
//                   resta:data,  
//                   images:result
//               })
            
//           })
//       }).catch(err=>{
//           console.log("allDeal data err",err)
//       })
//    }
componentDidMount(){
        
  this.fouriteId();
    fetch(`http://foodfella.net/Rentree/get_ads_by_category.php?cat_id=${this.state.id}`)
    .then(res=>{
        res.json().then(data=>{
            console.log("categories item data",data)
            this.setState({
                
                resta:data,  
        
            })
        })
    }).catch(err=>{
        console.log("categories item data err",err)
    })
 
 
 }

 fouriteId = () => {
  this.props.user &&
    this.props.user.user_ID &&
    fetch(
      `http://foodfella.net/Rentree/get_user_favourites.php?user_id=${
        this.props.user.user_ID
      }`
    )
      .then(res => {
        res.json().then(data => {
          // console.log("favourites data", data);

          data.map(value => {
            like_Post_id_Array.push(value.post_id);
          });

          this.props.updateFavourites({
            favourite_Data: data,
            like_Post_id: like_Post_id_Array
          });

          like_Post_id_Array = [];

          this.setState({
            loading: false
          });
        });
      })
      .catch(err => {
        console.log("favourites data Error >>>", err);
        this.setState({
          loading: false
        });
      });
};
likes = Id => {
  if (this.props.user) {
    if (this.props.user.user_ID) {
      this.setState({
        loading: true
      });

      let formData = new FormData();

      formData.append("user_id", this.props.user.user_ID);
      formData.append("post_id", Id);

      fetch(`http://foodfella.net/Rentree/post_favourites.php`, {
        method: "POST",
        body: formData
      })
        .then(response => {
          console.log("post_favourites >>>", response);

          if (response._bodyText == "success") {
            console.log("post_favourites response._bodyText >>>");
            this.fouriteId();
          }
        })
        .catch(err => {
          console.log("post_favourites Error >>>", err);
          this.setState({
            loading: false
          });
        });
    }
  }
};

 render() {
     
   const {navigate}=this.props.navigation;
   return (
<View style={{marginTop:10}}>
<ScrollView>
  <View >

    {
this.state.resta == "No Ad Found" ?
<View style={{flex:1,justifyContent:'center',flexDirection:'row'}}>
  <Text style={{fontFamily: 'open-sans-bold',fontSize:18,fontWeight:'500'}}>No Item this time </Text>
  </View>
:
<View style={{flexWrap:'wrap',flexDirection:'row',marginLeft:30,marginBottom:120}}>
{this.state.resta &&
      this.state.resta.map(data => {
        return (
  <View style={{width:'45%',marginHorizontal:'1%',marginBottom:10}}>
<TouchableOpacity onPress={()=>navigate('ItemShow',{data:data,Imagename:data.images,Item_Name:data.ad_title,Item_Rent:data.item_rent,Location:data.location,Post_Id:data.ad_id,Renter_Id:data.renter_id })}>
      <Card style={{height:150}}>
            <Image source={{ uri: data.images }} style={{width:'100%',height:'100%',borderColor:"#0B3669",borderWidth:1}}/>
      </Card>
      </TouchableOpacity>
      <View style={{height:40,flexDirection:'row',backgroundColor:'#0B3669',  justifyContent: "space-between",}}>
      <View style={{marginHorizontal:10}}>
        <Text style={{fontFamily: 'open-sans-bold',color:'white'}}>{data.ad_title}</Text>
        <Text style={{fontFamily: 'open-sans-bold',color:'white'}}>Rs. {data.Item_Rent} per day</Text>
        </View>
<View>
  {/* <Image source={require('../images/like.png')} style={{height:20,width:20,marginLeft:"2%"}}/> */}
  <TouchableOpacity
                          onPress={() => this.likes(data.ad_id)}
                          style={{marginRight:10,marginTop:10}}
                        >
                          {this.props.favourites ? (
                            this.props.favourites.like_Post_id ? (
                              this.props.favourites.like_Post_id.every(
                                item => item !== data.ad_id
                              ) ? (
                                <Image
                                  source={require("../images/like.png")}
                                  style={{
                                    height: 20,
                                    width: 20,
                                  //  marginLeft: "2%"
                                  }}
                                />
                              ) : (
                                <Image
                                  source={require("../images/hit-like.png")}
                                  style={{
                                    height: 20,
                                    width: 20,
                                //    marginLeft: "2%"
                                  }}
                                />
                              )
                            ) : (
                              <Image
                                source={require("../images/like.png")}
                                style={{
                                  height: 20,
                                  width: 20,
                                //  marginLeft: "2%"
                                }}
                              />
                            )
                          ) : (
                            <Image
                              source={require("../images/like.png")}
                              style={{
                                height: 20,
                                width: 20,
                               // marginLeft: "2%"
                              }}
                            />
                          )}
                        </TouchableOpacity>
        </View>
      </View>
      </View>
 );
})}
  </View>   
    }
     
  </View>    
  </ScrollView>  
</View>
   )
 }
}
const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    favourites: state.authReducers.favourites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
    updateFavourites: favourites => dispatch(updateFavourites(favourites))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryItem);

// export default CategoryItem;