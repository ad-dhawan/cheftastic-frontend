import React from 'react';
import {Text} from 'react-native';

import PageHeader from '../components/PageHeader';

const AddRecipe = ({navigation}) => {
    return(
        <>
            <PageHeader title="add recipe" navigation={navigation} />
        </>
    )
}

export default AddRecipe;