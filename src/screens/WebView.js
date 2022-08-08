import React from 'react';
import PageHeader from '../components/PageHeader';
import { WebView as WB } from 'react-native-webview';

const WebView = ({route}) => {
    console.log(route.params)
    return(
        <>
            <PageHeader title={route.params.title} navigation={route.params.navigation} />

            <WB source={{uri: route.params.url}} />
        </>
    )
}

export default WebView