import Modal from 'react-native-modal';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectButton from './button';

const ModalAlert = (props) => {
    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={() => {
                props.onPress();
            }}
            onBackButtonPress={() => {
                props.onPress();
            }}
            animationIn="zoomIn"
            animationOut="zoomOut"
        >
            <View style={styles.container}>
                <View style={{...styles.content, ...styles.textCont}}>
                    <Text style={styles.text}>{props.text}</Text>
                </View>
                <View style={{...styles.content, ...styles.ok}}>
                    <SelectButton
                        positive={true}
                        buttonWidth="100%"
                        text="GOT IT"
                        onPress={() => {
                            props.onPress();
                        }}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default ModalAlert;

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingBottom: 15,
        paddingTop: 15
    },
    content: {
        width: '90%'
    },
    textCont: {
        marginBottom: 30
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    ok: {
        alignItems: 'center'
    }
})