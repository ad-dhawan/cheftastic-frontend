const initialState = {
  logged_in: false,
  user_name: '',
  user_email: '',
  user_id: '',
  fcm_token: '',
  id_token: '',
  recipes: [],
  user_avatar: '',
  feed: [],
  specials: [],
  notifications: [],
};

export default (state = initialState, action) => {
  // console.log(action);

  switch (action.type) {
    case 'LOGIN':
      return {...state, ...action.payload, loggedIn: true};

    case 'LOGOUT':
      return {...initialState, loggedIn: false};

    case 'FEED':
      return {...state, feed: action.payload};

    case 'SPECIALS':
      return {...state, specials: action.payload};

      case 'NOTIFICATIONS':
        return {...state, notifications: action.payload};

    default:
      return state;
  }
};
