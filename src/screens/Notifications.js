import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import VersionCheck from 'react-native-version-check';
import { checkVersion } from "react-native-check-version";

import PageHeader from '../components/PageHeader';
import LikeComponent from '../components/Notifications/LikeComponent';
import { GetData } from '../services/axios';
import SkeletonHolder from '../components/Notifications/SkeletonHolder';
import { BACKGROUND } from '../utils/colors';
import AppUpdate from '../components/Notifications/AppUpdate';

const Notifications = ({navigation}) => {
    const {user_id, notifications} = useSelector(state => state);
    const dispatch = useDispatch();

    const [notificationData, setNotificationData] = useState(notifications);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        getNotificationData();
    }, []);
    
    async function getNotificationData () {
        GetData.getNotifications(user_id).then(res => {
            if (res && res.status === 200) {
                setNotificationData(res.data);
                setIsLoading(false);
                
                dispatch({
                  type: 'NOTIFICATIONS',
                  payload: res.data,
                });

            } else console.log(res);
        });
    };

    /** UPWARD PAGINATION */
    const onRefresh = () => {
        setIsRefreshing(true);

        if(!isEmpty(feedData)){
            GetData.getNotifications(10, feedData[0]._id, 'pull_refresh').then(res => {
                if(res && res.status === 200) {
                    if(!isEmpty(res.data)) {
                        setTimeout(() => {
                            setFeedData(data => [...res.data, ...data]);
                        }, 1000);
                    }
                } else console.log(res);
                setIsRefreshing(false);
            })
        } else {
            getFeedData()
        }

    }

    return(
        <>
            <View style={{flex: 1, backgroundColor: BACKGROUND}} >

                <PageHeader title="notifications" navigation={navigation} />

                {isLoading ? <SkeletonHolder /> : (
                    <FlatList
                        data={notificationData}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{margin: 10, paddingBottom: 100}}
                        // contentContainerStyle={{paddingBottom: 150}}
                        refreshControl={
                            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                        }
                        ListHeaderComponent={isUpdateNeeded ? <AppUpdate /> : null}
                        renderItem={({item}) => {
                            if(item.type === 'like'){
                                return( <LikeComponent data={item} style={{marginBottom: 10}} /> )
                            }
                        }}
                    />
                )}

            </View>
        </>
    )
};

export default Notifications;