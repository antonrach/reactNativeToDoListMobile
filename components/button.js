import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SelectButton = (props) => {
    return (
        <TouchableOpacity
        style={props.positive ? {...styles.button, ...styles.buttonOk, ...{width: props.buttonWidth}} : {...styles.button, ...{width: props.buttonWidth}}}
        activeOpacity={props.positive ? .6 : .2}
        onPress={() => {
            props.onPress();
        }}
    >
        <View style={styles.buttonView}>
            <Text style={props.positive ? {...styles.buttonText} : {...styles.buttonText, ...styles.buttonCancelText}}>{props.text}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default SelectButton;

const styles = StyleSheet.create({
    button: {
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 6
    },
    buttonView: {
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold'
    },
    buttonOk: {
        backgroundColor: '#22c1c3',
    },
    buttonCancelText: {
        color: 'black'
    }
})

