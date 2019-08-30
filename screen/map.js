import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Constants, MapView, Permissions, Location } from "expo";
import stopmarker from "../assets/icons/map-marker.png";

export default class CustomMap extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
  };

  componentDidMount() {
    this._getLocationAsync();
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
   this.setState({ locationResult: JSON.stringify(location), location, });
 };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          // onRegionChange={this._handleMapRegionChange}
        >
    <MapView.Marker
      coordinate={this.state.location.coords}
      title="My Marker"
      description="Some description"
    />
        </MapView>
      
        {/* <Text>
          Location: {this.state.locationResult}
        </Text> */}
      
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
  });
  

// import React, { Component } from "react";
// import { View, StyleSheet } from "react-native";
// import { Constants, Location, Permissions } from "expo";
// import MapView from 'react-native-maps';

// export default class CustomMap extends Component {
//   constructor() {
//     super();
//     this.state = {
//       locationResult: null,
//       location:null,
//       latitude: 37.78825,
//       longitude: -122.4324,
//     };
//   }

//   componentDidMount() {
//     this._getLocationAsync();
//     console.log("MAP PROPS >>>", this.props);
//     // this.setState({
//     //   latitude: this.props.lat,
//     //   longitude: this.props.lng
//     // });
//   }

//   _handleMapRegionChange = mapRegion => {
//     this.setState({ mapRegion });
//   };

//   _getLocationAsync = async () => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== "granted") {
//       this.setState({
//         locationResult: "Permission to access location was denied",
//         location
//       });
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     this.setState({ location: location});
//   };

//   render() {
//     let coords = {
//       latitude: this.props.Latitute,

//       longitude:  this.props.Longitude,
//     };
//     console.log("coords ***********", coords);

//      var mapRegion= {
//         latitude:this.state.location &&this.state.location.coords?this.state.location.coords.latitude: 37.78825,
//         longitude: this.state.location &&this.state.location.coords?this.state.location.coords.longitude:-122.4324,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }

//     return (
//       coords != null && (
//         <View style={styles.container}>
//           <MapView
//            style={{ alignSelf: "stretch", height: 200,width:'100%',borderWidth:2,borderColor:'#19c6c0' }}
//             // initialRegion={{
//             //   latitude: this.props.Latitute,
//             //   longitude: this.props.Longitude,
//             //   latitudeDelta: 0.0922,
//             //   longitudeDelta: 0.0421,
//             // }}
//             region={mapRegion}

//             // onRegionChange={this._handleMapRegionChange}
//           >
//             {/* <MapView.Marker
//               coordinate={coords}
//               title="My Marker"
//               description="Some description"
//             /> */}
//           </MapView>

//           {/* <Text>Location: {this.state.locationResult}</Text> */}
//         </View>
//       )
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: "#ecf0f1",
//     marginTop: 22
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#34495e"
//   }
// });
