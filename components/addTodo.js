import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let initialValue = '';

const AddTodo = (props) => {

    const [value, setValue] = useState(initialValue);

    const addTodo = async (task) => {

        const newTask = {
            task,
            id: props.todos.length + 1,
            isDone: false
        }

        if(value.trim()) {
            props.newTodo(newTask);
            setValue('');
            initialValue = '';

        } else {
            //Alert.alert('Enter a valid task name!');
            props.alert();
        }
    }

    return (
    <View style={styles.form}>
        <TextInput
            numberOfLines={5}
            style={styles.textInput}
            multiline={true}
            placeholder="Type your task here..."
            scrollEnabled={true}
            value={value}
            onChangeText={text => {setValue(text); initialValue = text}}
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={() => {addTodo(value)}} activeOpacity={.6}>
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Add task</Text>
            </View>
        </TouchableOpacity>

    </View>
    )
}

const styles = StyleSheet.create({
    form: {
        width: '90%',
        marginBottom: 30,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    textInput: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        textAlignVertical: 'top',
        padding: 10,
        fontSize: 20,
        borderRadius: 8,
        marginBottom: 16,
        height: 140
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 6,
        width: '100%',
        backgroundColor: "#22c1c3",
    },
    buttonView: {
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
  });

export default AddTodo;
