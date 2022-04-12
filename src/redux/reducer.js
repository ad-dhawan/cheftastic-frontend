const initialState = {
  loading: false,
  loggedIn: false,
  newUser: true
};

export default (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case 'LOADING':
      return {...state, loading: action.payload};

    case 'LOGIN':
      return {...state, ...action.payload, loggedIn: true};

    case 'LOGOUT':
      return {...initialState, loggedIn: false};

    case 'NEW_USER':
      return {...state, ...action.payload, newUser: false};

    default:
      return state;
  }
};
