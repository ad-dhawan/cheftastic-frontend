import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import { isEmpty } from 'lodash';

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
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        getNotificationData();
    }, []);
    
    async function getNotificationData () {
        GetData.getNotifications(user_id, 15).then(res => {
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

        if(!isEmpty(notificationData)){
            GetData.getNotifications(user_id, 15, notificationData[0]._id, 'pull_refresh').then(res => {
                if(res && res.status === 200) {
                    if(!isEmpty(res.data)) {
                        setTimeout(() => {
                            setNotificationData(data => [...res.data, ...data]);
                        }, 1000);
                    }
                } else console.log(res);
                setIsRefreshing(false);
            })
        } else {
            getNotificationData()
        }

    }

    /** DOWNWARD PAGINATION */
    const onLoadMore = () => {
        setIsLoadingMore(true);

        if(!isEmpty(notificationData)){
            GetData.getNotifications(15, notificationData[notificationData.length - 1]._id, 'load_more').then(res => {
                if(res && res.status === 200) {
                    if(!isEmpty(res.data)) {
                        setTimeout(() => {
                            setNotificationData(data => [...data, ...res.data]);
                        }, 1000);
                    }
                } else console.log(res);
                setIsLoadingMore(false);
            })
        } else {
            getNotificationData()
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
                        contentContainerStyle={{margin: 10, paddingBottom: 100, marginTop: 10}}
                        refreshControl={
                            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                        }
                        onEndReached={onLoadMore}
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