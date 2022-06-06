import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';

import PageHeader from '../components/PageHeader';
import LikeComponent from '../components/Notifications/LikeComponent';
import { GetData } from '../services/axios';
import SkeletonHolder from '../components/Notifications/SkeletonHolder';
import { BACKGROUND } from '../utils/colors';

const Notifications = ({navigation}) => {
    const {user_id, notifications} = useSelector(state => state);
    const dispatch = useDispatch();

    const [notificationData, setNotificationData] = useState(notifications);
    const [isLoading, setIsLoading] = useState(true);

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
                        // refreshControl={
                        //     <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                        // }
                        // ListHeaderComponent={<SpecialRecipes style={{marginBottom: 30}} />}
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