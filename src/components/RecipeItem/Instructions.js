import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { ACCENT, BACKGROUND, DARK_TEXT } from '../../utils/colors';
import { REGULAR } from '../../utils/values';

const Instructions = ({route}) => {
    const data = route.params.data;

    return(
        <>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.mainContainer}
                    nestedScrollEnabled={true}
                    scrollEnabled={false}
                    renderItem={({item, index}) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.index}>{index+1}</Text>
                            <View style={styles.divider} />
                            <Text style={styles.instructionText}>{item}</Text>
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
        marginBottom: 18,
    },
    index: {
        fontSize: 20,
        color: DARK_TEXT,
        fontFamily: REGULAR
    },
    divider: {
        height: 40,
        borderColor: ACCENT,
        borderRadius: 10,
        borderWidth: 1.2,
        marginHorizontal: 8
    },
    instructionText: {
        fontSize: 14,
        color: DARK_TEXT,
        fontFamily: REGULAR,
        alignSelf: 'flex-start',
        textAlign: 'left',
        flexWrap: 'wrap',
        maxWidth: '90%'
    }
});

export default Instructions;