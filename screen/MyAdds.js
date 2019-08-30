import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity,AsyncStorage} from 'react-native';
import { Icon ,Drawer, Item as FormItem,Header,Body,Card,Left,Right} from 'native-base';
import StarRating from 'react-native-star-rating';
import ContentView from './Drawer'
import { Font } from 'expo';
import {  updatePostData } from "../Redux/actions/authActions";
import { connect } from "react-redux";


class MyAdds extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props){
        super(props)
        this.state={
            starCount: 3.5,
            user_ads:[],
            item_id:null,
            user_id:null
        }
    }
    componentDidMount(){
        this.Myadds();
    }
    Myadds=()=>{
        AsyncStorage.getItem("UID").then((uid)=>{
            console.log("NEW USERID",uid)
           this.setState({user_id:uid},()=>{
               
           })
           fetch(`http://foodfella.net/Rentree/get_user_ads.php?user_id=${uid}`)
           .then(res=>{
               res.json().then(data=>{
                   console.log("user_ads data",data)
                   this.setState({
                       
                       user_ads:data,
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
  AllDealsItem=()=>{
    fetch(`http://foodfella.net/Rentree/allads`)
      .then(res => {
        res.json().then(data => {
          // console.log("allads >>>", data);

          if (data != "No Ads Available") {

            this.props.updatePostData({
              post_data: data
            })

            // this.setState({
            //   resta: data
            // });
          }
        });
      })
      .catch(err => {
        console.log("allads Error >>>", err);
      });
  }
  deleteItem=(id)=>{
   
    fetch(`http://foodfella.net/Rentree/delete_ad.php?post_id=${id}`)
        // .then(res=>{
        //     res.json()
            .then(data=>{
                console.log("response data delete",data)
                if(data._bodyInit == 'success'){
                    alert('Item Deleted')
                    this.Myadds();
                    this.AllDealsItem();
                }
                if(data._bodyInit != 'success'){
                    alert('Item Not Delete')
                }
               
            // })
        }).catch(err=>{
            console.log("error data delete ",err)
        })
  }
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
              
                {/* <TouchableOpacity onPress={()=>navigate('Cart',{id:this.props.navigation.state.params.response})}> */}
                <Right  >
                {/* <Image source={require("../images/search.png")} style={{height:25,width:25,marginTop:0}}/> */}
                </Right>
                {/* </TouchableOpacity> */}
            </Header>
      </View>
      <View style={{marginBottom:170}}>
<ScrollView>
<View style={{marginLeft:'2%',marginTop:20}}>
{this.state.user_ads &&
    this.state.user_ads.map(data => {
      return (
    <Card style={{height:180,width:'98%',flexDirection:"row"}}>
<View style={{flex:1}}>
<Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5,marginLeft:10}}>{data.ad_title}</Text>
<View style={{flexDirection:'row',marginLeft:10}}>
            <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>Rs. </Text>
            <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:5}}>{data.item_rent}</Text>
            <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'400',color:'#0B3669',marginLeft:10,marginTop:5}}>per day</Text>
        </View>

        <View style={{width:'70%',marginTop:10,marginLeft:10}}>
        <StarRating
        disabled={false}
        maxStars={5}
        rating={data.ad_ratings}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#19c6c0'}
        starSize={20}
      />
            </View>
            <View style={{flexDirection:'row',marginLeft:10}}>
            <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:10,marginLeft:5}}>Rented</Text>
            <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:10,marginLeft:5}}>{data.Adapprovalid}</Text>
            <Text style={{fontFamily: 'open-sans-bold',fontSize:14,fontWeight:'500',color:'#0B3669',marginTop:10,marginLeft:5}}>times</Text>


                </View>
                <View style={{flexDirection:'row',marginTop:18}}>

    <TouchableOpacity onPress={()=>navigate('MyAddEdit',{id:data.ad_id,Myadds:this.Myadds,AllDealsItem:this.AllDealsItem})}>
                <View style={{marginLeft:10,marginTop:2,width:"100%",height:40,backgroundColor:'#19c6c0',alignItems:'center' }}>
                <Text style={{fontFamily: 'open-sans-bold',fontSize:16,fontWeight:'500',color:'white',padding:10}}>EDIT</Text>
       
                    </View>
      </TouchableOpacity>
<TouchableOpacity onPress={()=>this.deleteItem(data.ad_id)}>

                    <View style={{marginLeft:20,marginTop:2,width:"100%",height:40,backgroundColor:'#19c6c0',alignItems:'center' }}>
                <Text style={{fontFamily: 'open-sans-bold',fontSize:16,fontWeight:'500',color:'white',padding:10}}>DELETE</Text>
       
                    </View>
</TouchableOpacity>

                    </View>
</View>

<View style={{flex:1}}>
<View style={{width:'95%',height:'95%',marginTop:'2%'}}>

    <Image source={{uri:data.images}} style={{width:"100%",height:"95%"}}/>
   
   </View> 
  
      
    
</View>

    </Card>
 );
})}


</View>
<View  style={{flexDirection:'row',justifyContent:'center'}}>
<TouchableOpacity onPress={()=>navigate('')}>
<View style={{marginLeft:10,marginTop:15,width:50,height:40,backgroundColor:'#19c6c0',alignItems:'center' }}>

                {/* <Text style={{fontSize:24,fontWeight:'500',color:'white',padding:10}}>+</Text> */}
       <Image source={require('../images/add.png')} style={{width:20,height:20,marginTop:10}}/>
                    </View>
                  </TouchableOpacity>
</View>
</ScrollView>
</View>
</View>
</Drawer>
   )
 }
}
const mapStateToProps = state => {
    return {
     
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      updatePostData: postData => dispatch(updatePostData(postData)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyAdds);
// export default MyAdds;