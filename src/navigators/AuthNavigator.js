import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Feed from '../screens/Feed';
import Auth from '../screens/Auth';

const AuthNavigator = () => {
    const {loggedIn} = useSelector(state => state);
    return(
        <>
        {loggedIn ? <Feed /> : <Auth />}
        </>
    )
};

export default AuthNavigator