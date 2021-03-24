import Modal from 'react-native-modal';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectButton from './button';

const ModalQuestion = (props) => {
    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={() => {
                props.onPressNo();
            }}
            onBackButtonPress={() => {
                props.onPressNo();
            }}
            animationIn="zoomIn"
            animationOut="zoomOut"
        >
            <View style={styles.container}>
                <View style={{...styles.content, ...styles.question}}>
                    <Text style={styles.questionText}>{props.question}</Text>
                </View>
                <View style={{...styles.content, ...styles.answers}}>
                    <SelectButton
                        positive={true}
                        buttonWidth={120}
                        text="YES"
                        onPress={() => {
                            props.onPressYes();
                        }}
                    />
                    <SelectButton
                        positive={false}
                        buttonWidth={120}
                        text="NO"
                        onPress={() => {
                            props.onPressNo();
                        }}
                    />
                </View>
            </View>
        </Modal>
    )
}

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
    question: {
        marginBottom: 30
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    answers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default ModalQuestion;

