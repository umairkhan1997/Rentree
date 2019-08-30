// import React from 'react';
// import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
//     ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity} from 'react-native';
// import { Icon ,Drawer, Item as FormItem,Header,Body,Card} from 'native-base';
// import ContentView from './Drawer'


// class Headers extends React.Component {
//     static navigationOptions={
//         header:null,
//     } 
//      constructor(props) {
//         super(props);
//         this.state = {
        
     
//       }
//     }
    
//     openDrawer = () => {
//         this.drawer._root.open()
//     };
//     closeDrawer = () => {
//         this.drawer._root.close()
//     };

//  render() {
//   // const {navigate}=this.props.navigation;
//    return (
// <Drawer
//     ref={(ref) => { this.drawer = ref; }}
//     content={<ContentView menu={this.props}/>}
//     onClose={() => this.closeDrawer()}
//     openDrawerOffset={0.3}
//     panCloseMask={0.3}
// >
// <View>
// <View style={{ marginTop: 22 }} >
//             <Header style={{ backgroundColor: '#001733' }}>
//                 <Body style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', marginLeft: 8 }}>
//                     <View>
//                     <TouchableOpacity onPress={this.openDrawer.bind(this)}>
//                     <Image    source={require('../images/menu.png')} style={{height:20,width:20,marginTop:15,marginLeft:5}}/>
//                     </TouchableOpacity>
//    </View>
//    <View style={{ flexDirection:'row',justifyContent:'center' }}>
//                     <Image    source={require('../images/logo.png')} style={{marginLeft:'35%',height:50,width:120,marginTop:0}}/>
//                     </View>
//                 </Body>
//                 {/* <TouchableOpacity onPress={()=>navigate('Cart',{id:this.props.navigation.state.params.response})}> */}
//                 <View style={{justifyContent: 'flex-end', flexDirection: 'row',marginTop:20 }}>
//                 <Image source={require("../images/search.png")} style={{height:25,width:25,marginTop:0,marginRight:10}}/>
//                 </View>
//                 {/* </TouchableOpacity> */}
//             </Header>
//       </View>

// <View>

// </View> 


// </View>
   
//             </Drawer>
//    )
//  }
// }
// export default Headers;