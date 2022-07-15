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
  search_history: [],
  saved_recipes: [],
};

export default (state = initialState, action) => {
  console.log(action);

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

    case 'RECIPES':
      return {...state, recipes: action.payload};

    case 'EDIT_USER':
      return {...state, ...action.payload};

    case 'SAVE':
      return {...state, saved_recipes: action.payload};

    default:
      return state;
  }
};
