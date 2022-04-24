const initialState = {
  logged_in: false,
};

export default (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case 'LOGIN':
      return {...state, ...action.payload, loggedIn: true};

    case 'LOGOUT':
      return {...initialState, loggedIn: false};

    default:
      return state;
  }
};
