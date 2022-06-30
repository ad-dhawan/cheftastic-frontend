import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { ACCENT, BACKGROUND, DARK_TEXT } from '../../utils/colors';
import { REGULAR } from '../../utils/values';

const Ingredients = ({route}) => {
    const data = route.params.data;

    return(
        <>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.mainContainer}
                    nestedScrollEnabled={true}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <Entypo name="dot-single" size={20} color={ACCENT} />
                            <Text style={styles.ingredientText}>{item}</Text>
                        </View>
                    )}
                />
        </>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BACKGROUND,
        paddingTop: 30,
        paddingBottom: 300
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    ingredientText: {
        fontSize: 14,
        color: DARK_TEXT,
        fontFamily: REGULAR,
        alignSelf: 'flex-start',
        textAlign: 'left',
        flexWrap: 'wrap',
        maxWidth: '90%'
    }
});

export default Ingredients;