const updateUser = user => {
  return {
    type: "UPDATE_USER",
    user
  };
};

const removeUser = () => {
  return {
    type: "REMOVE_USER"
  };
};

const updateFavourites = favourites => {
  return {
    type: "UPDATE_FAVOURITES",
    favourites
  };
};

const updatePostData = postData => {
  return {
    type: "UPDATE_POST_DATA",
    postData
  };
};

export { updateUser, removeUser, updateFavourites, updatePostData };
