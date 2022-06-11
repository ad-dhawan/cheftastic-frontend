import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import { PROFILE_HEADER_SIZE } from '../../screens/Profile';
import { BACKGROUND } from '../../utils/colors';

const {width, height} = Dimensions.get('screen');
const ITEM_HEIGHT = 300
const SECOND_ITEM_HEIGHT_DIFFERENCE = 100

const colors = [
    {
        bg: '#BFEAF5',
    },
    {
        bg: '#BEECC4',
    },
    {
        bg: '#DEEFC4',
    },
    {
        bg: '#D3F0FF',
    },
    {
        bg: '#D5C3EB',
    },
    {
        bg: '#DEEFC4',
    },
    {
        bg: '#BFEAF5',
    },
    {
        bg: '#BEECC4',
    },
    {
        bg: '#DEEFC4',
    },
    {
        bg: '#F3F0EF',
    },
    {
        bg: '#D5C3EB',
    },
    {
        bg: '#DEEFC4',
    },
]

const ContentList = () => {

    const ListItem = ({item, index}) => {
        return (
            <>
                <View style={[styles.itemContainer,{
                        height: index === 1 ? ITEM_HEIGHT - SECOND_ITEM_HEIGHT_DIFFERENCE :
                        index === colors.length - 2 ? ITEM_HEIGHT - SECOND_ITEM_HEIGHT_DIFFERENCE : ITEM_HEIGHT,
                        backgroundColor: item.bg,
                        bottom: index > 1 && index % 2 !== 0 ? SECOND_ITEM_HEIGHT_DIFFERENCE : 0
                    }]}
                />
            </>
        )
    }

    return(
        <>
            <View style={{flex: 1, backgroundColor: BACKGROUND}}>
                
                <FlatList
                    data={colors}
                    numColumns={2}
                    contentContainerStyle={{marginTop: 10}}
                    columnWrapperStyle={{justifyContent: 'space-between', marginHorizontal: 10}}
                    renderItem={({item, index}) => (
                        <ListItem item={item} index={index} />
                    )}
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        width: (width / 2) - 15,
        borderRadius: 20,
        marginBottom: 10,
    }
});

export default ContentList;