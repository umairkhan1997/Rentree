const initial_state = {
  user: null,
  favourites: null,
  postData: null
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case "UPDATE_USER": {
      return { ...state, user: action.user };
    }
    case "REMOVE_USER": {
      return { ...state, user: null };
    }
    case "UPDATE_FAVOURITES": {
      return { ...state, favourites: action.favourites };
    }
    case "UPDATE_POST_DATA": {
      return { ...state, postData: action.postData };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
