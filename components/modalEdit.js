import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import SelectButton from './button';


const ModalEdit = (props) => {

    const [value, setValue] = useState(props.task.task);
    const [draft, setDraft] = useState(false);

    const cancelHandler = () => {
        if(value === props.task.task) {
            props.close();
            setDraft(false);
        } else {
            props.close();
            setTimeout(() => {
                props.openDiscard()
            }, 300);
            setDraft(true);
        }
    }

    useEffect(() => {
        setDraft(false);
    }, [props.draftFlag])

    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={cancelHandler}
            onBackButtonPress={cancelHandler}
            animationIn="zoomIn"
            animationOut="zoomOut"
            onModalWillShow={() => {
                if(!draft) {
                    setValue(props.task.task);
                }
            }}
        >
            <View style={{height: 280, justifyContent: 'center'}}>
                <ScrollView
                    style={styles.container}
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}
                >
                    <View style={styles.view}>
                        <Text style={styles.editYourTask}>Edit your task here:</Text>
                    </View>
                    <TextInput
                        numberOfLines={5}
                        style={styles.textInput}
                        multiline={true}
                        placeholder="Edit your task here..."
                        scrollEnabled={true}
                        value={value}
                        onChangeText={setValue}
                        autoFocus={true}
                    ></TextInput>
                    <View style={styles.buttons}>
                        <SelectButton
                            positive={true}
                            buttonWidth={150}
                            text='OK'
                            onPress={() => {
                                if(value.trim()) {
                                    props.onChange(value, props.task.id);
                                    props.close();
                                    setDraft(false);
                                } else {
                                    //Alert.alert('Enter a valid task name!');
                                    props.close();
                                    setTimeout(() => {
                                        props.alert();
                                    }, 300)
                                    setDraft(true);
                                }
                            }} 
                        />
                        <SelectButton
                            positive={false}
                            buttonWidth={150}
                            text='Cancel'
                            onPress={cancelHandler}
                        />
                    </View>
                </ScrollView>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    edit: {
        width: '90%'
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '90%',
        textAlignVertical: 'top',
        padding: 10,
        fontSize: 20,
        borderRadius: 8,
        marginBottom: 15,
        height: 140
    },
    view: {
        alignItems: 'flex-start',
        width: '90%',
        marginBottom: 15,
    },
    editYourTask: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    button: {
        width: 150,
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
    },
    buttonOk: {
        backgroundColor: '#22c1c3',
    },
    buttonCancelText: {
        color: 'black'
    }

})

export default ModalEdit;
