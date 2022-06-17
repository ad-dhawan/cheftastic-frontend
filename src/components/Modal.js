import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Portal, Modal as RNPModal } from 'react-native-paper';
import { BACKGROUND, DARK_TEXT, GREY, PRIMARY, LIGHT_TEXT } from '../utils/colors';
import { BOLD, REGULAR } from '../utils/values';

const {width, height} = Dimensions.get('screen');

const Modal = (props) => {
    return(
        <>
            <Portal>
                <RNPModal visible={props.isModalVisible} onDismiss={() => props.setIsModalVisible(false)} contentContainerStyle={styles.modalContainer}>
                    <Text style={[{textAlign: props.titleAlign}, styles.title]}>{props.title}</Text>
                    <Text style={[{textAlign: props.bodyAlign}, styles.body]}>{props.body}</Text>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity activeOpacity={1} onPress={props.leftButtonAction} style={[styles.button, {borderColor: GREY}]}>
                            <Text style={[styles.buttonText, {color: GREY}]}>{props.leftButtonText}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={props.rightButtonAction} style={[styles.button, {borderColor: PRIMARY, backgroundColor: PRIMARY}]}>
                            <Text style={[styles.buttonText, {color: LIGHT_TEXT}]}>{props.rightButtonText}</Text>
                        </TouchableOpacity>
                    </View>

                </RNPModal>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: BACKGROUND,
        marginHorizontal: width * 0.1,
        borderRadius: 10,
        padding: 15
    },
    title: {
        fontSize: 16,
        color: DARK_TEXT,
        fontFamily: BOLD,
        marginBottom: 10
    },
    body: {
        fontSize: 15,
        color: DARK_TEXT,
        fontFamily: REGULAR,
        marginBottom: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    button: {
        width: '40%',
        alignItems: 'center',
        borderRadius: 6,
        borderWidth: 2,
        padding: 8
    },
    buttonText: {
        fontSize: 15,
        fontFamily: REGULAR
    }
});

export default Modal;