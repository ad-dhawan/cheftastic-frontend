import React from 'react';
import {Text} from 'react-native';

import PageHeader from '../components/PageHeader';

const Notifications = ({navigation}) => {
    return(
        <>
            <PageHeader title="notifications" navigation={navigation} />
        </>
    )
};

export default Notifications;