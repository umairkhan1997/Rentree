import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,SafeAreaView,Image,TextInput ,
    ImageBackground,Dimensions,KeyboardAvoidingView,ScrollView,TouchableOpacity} from 'react-native';
import { Icon ,Drawer, Item as FormItem,Header,Body,Card} from 'native-base';


class Home extends React.Component {
    static navigationOptions={
        header:null,
    }
//    openDrawer = () => {
//        this.drawer._root.open()
//    };
//    closeDrawer = () => {
//        this.drawer._root.close()
//    };
 render() {
     console.log(this.props,'Hoome')
   const {navigate}=this.props.navigation;
   return (
<View style={{marginTop:22}}>
    <Text>Home</Text>
</View>
   )
 }
}
export default Home;