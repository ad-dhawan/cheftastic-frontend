import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PageHeader from '../components/PageHeader';

const EditProfile = ({navigation}) => {
    return (
        <>
            <PageHeader title="edit profile" navigation={navigation} />
        </>
    )
};

const styles = StyleSheet.create({});

export default EditProfile;