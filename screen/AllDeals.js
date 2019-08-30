import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "native-base";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { updateFavourites, updateUser, updatePostData } from "../Redux/actions/authActions";

let like_Post_id_Array = [];

class AllDeals extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      // resta: [],
      loading: false,
      //resta: this.props.postData ? this.props.postData.post_data ? this.props.postData.post_data : [] : []
    };
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

  AllDealsItem() {
    fetch(`http://foodfella.net/Rentree/allads`)
      .then(res => {
        res.json().then(data => {
           //console.log("allads >>>", data);

          if (data != "No Ads Available") {
// console.log('props in all deals')
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

//   Unlike = (Id) => {

//     let formData = new FormData();

//     formData.append("user_id", this.props.user.user_ID);
//     formData.append("post_id", Id);

//     fetch(`http://foodfella.net/Rentree/remove_favourite_item.php`, {
//       method: "POST",
//       body: formData
//     })
//       .then(res => {
//         res.json().then(data => {
//            //console.log("allads >>>", data);
// console.log(data,' repsonse of unlike')
//         });
//       })
//       .catch(err => {
//         console.log("allads Error >>>", err);
//       });
//   }

  componentWillMount() {
    this.fouriteId();
    this.AllDealsItem();
  }

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
            // console.log("post_favourites >>>", response);

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
Unlike= Id => {
  console.log('unlike click ')
  if (this.props.user) {
    if (this.props.user.user_ID) {
      this.setState({
        loading: true
      });

      let formData = new FormData();

      formData.append("user_id", this.props.user.user_ID);
      formData.append("post_id", Id);

      fetch(`http://foodfella.net/Rentree/remove_favourite_item.php`, {
        method: "POST",
        body: formData
      })
      .then(res => {
        res.json().then(response => {
          // console.log("post_favourites >>>", response);

          if (response == "success") {
            console.log("remove_favourite_item._bodyText >>>");
            this.fouriteId();
          }
        })
      })
        .catch(err => {
          console.log("remove_favourite_item Error >>>", err);
          this.setState({
            loading: false
          });
        });
    }
  }
}
  render() {
    const { navigate } = this.props.navigation;

    //  console.log(this.props, "AllDeals.js this.props");

    return (
      <View style={{ marginTop: 10 }}>
        <Spinner
          visible={this.state.loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <ScrollView>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              marginLeft: 30,
              marginBottom: 120
            }}
          >
            {/* {this.state.resta != null &&
              this.state.resta.map(data => { */}

            {this.props.postData &&
              this.props.postData.post_data &&
              // this.props.postData.post_data
              // != null &&
              this.props.postData.post_data.map(data => {
                return (
                  <View
                    key={data.ad_id}
                    style={{
                      width: "45%",
                      marginHorizontal: "1%",
                      marginBottom: 10
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigate("ItemShow", {
                          data: data,
                          Imagename: data.images,
                          Item_Name: data.ad_title,
                          Item_Rent: data.item_rent,
                          Location: data.location,
                          Post_Id: data.ad_id,
                          Renter_Id: data.renter_id,
                          latitude:data.latitude,
                          longitude:data.longitude
                        })
                      }
                    >
                      <Card style={{ height: 150 }}>
                        <Image
                          source={{ uri: data.images }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderColor: "#0B3669",
                            borderWidth: 1
                          }}
                        />
                      </Card>
                    </TouchableOpacity>
                    <View
                      style={{
                        height: 40,
                        flexDirection: "row",
                        backgroundColor: "#0B3669",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ marginHorizontal: 10 }}>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "open-sans-bold"
                          }}
                        >
                          {data.ad_title}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "open-sans-bold"
                          }}
                        >
                          Rs. {data.item_rent} per day
                        </Text>
                      </View>
                      <View>
                       
                          {this.props.favourites ? (
                            this.props.favourites.like_Post_id ? (
                              this.props.favourites.like_Post_id.every(
                                item => item !== data.ad_id
                              ) ? (
                                <TouchableOpacity
                                onPress={() => this.likes(data.ad_id)}
                                style={{ marginRight: 10, marginTop: 10 }}
                              >
                                  <Image
                                    source={require("../images/like.png")}
                                    style={{
                                      height: 20,
                                      width: 20,
                                      //  marginLeft: "2%"
                                    }}
                                  />
                                   </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity
                                  onPress={() => this.Unlike(data.ad_id)}
                                  style={{ marginRight: 10, marginTop: 10 }}
                                >
                                  <Image
                                    source={require("../images/hit-like.png")}
                                    style={{
                                      height: 20,
                                      width: 20,
                                      //    marginLeft: "2%"
                                    }}
                                  />
                                    </TouchableOpacity>
                                )
                            ) : (
                              <TouchableOpacity
                              onPress={() => this.likes(data.ad_id)}
                              style={{ marginRight: 10, marginTop: 10 }}
                            >
                                <Image
                                  source={require("../images/like.png")}
                                  style={{
                                    height: 20,
                                    width: 20,
                                    //  marginLeft: "2%"
                                  }}
                                />
                                 </TouchableOpacity>
                              )
                          ) : (
                            <TouchableOpacity
                            onPress={() => this.likes(data.ad_id)}
                            style={{ marginRight: 10, marginTop: 10 }}
                          >
                              <Image
                                source={require("../images/like.png")}
                                style={{
                                  height: 20,
                                  width: 20,
                                  // marginLeft: "2%"
                                }}
                              />
                                </TouchableOpacity>
                            )}
                       
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    favourites: state.authReducers.favourites,
    postData: state.authReducers.postData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
    updatePostData: postData => dispatch(updatePostData(postData)),
    updateFavourites: favourites => dispatch(updateFavourites(favourites))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllDeals);
