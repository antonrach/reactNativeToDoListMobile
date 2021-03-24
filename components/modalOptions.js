import Modal from 'react-native-modal';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Clipboard } from 'react-native';
//import Clipboard from '@react-native-clipboard/clipboard';


const ModalOptions = (props) => {


    const [colorText, setColorText] = useState({n1: 'black', n2: 'black', n3: 'black'})

    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={() => {
                props.close()
            }}
            onBackButtonPress={() => {
                props.close();
            }}
            animationIn="zoomIn"
            animationOut="zoomOut"
        >  
            <View style={styles.container}>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={"rgba(34, 193, 195, 1)"}
                    onShowUnderlay={() => setColorText({...colorText, n1: 'white'})}
                    onHideUnderlay={() => setColorText({...colorText, n1: 'black'})}
                    onPress={() => {
                        props.close();
                        setTimeout(() => {
                            props.openEdit();
                        }, 300)
                    }}
                    style={styles.option}
                >
                        <Text style={{...styles.text, color: colorText.n1}}>Edit</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={"rgba(34, 193, 195, 1)"}
                    onShowUnderlay={() => setColorText({...colorText, n2: 'white'})}
                    onHideUnderlay={() => setColorText({...colorText, n2: 'black'})}
                    onPress={() => {
                        //console.log(props.task.task)
                        Clipboard.setString(props.task.task);
                        props.close();
                    }}
                    style={styles.option}
                >
                        <Text style={{...styles.text, color: colorText.n2}}>Copy to clipboard</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={"rgba(34, 193, 195, 1)"}
                    onShowUnderlay={() => setColorText({...colorText, n3: 'white'})}
                    onHideUnderlay={() => setColorText({...colorText, n3: 'black'})}
                    onPress={() => {
                        props.close();
                        setTimeout(() => {
                            props.openDelete();
                        }, 300)
                    }}
                    style={styles.option}
                >
                        <Text style={{...styles.text, color: colorText.n3}}>Delete</Text>
                </TouchableHighlight>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    option: {
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 15,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 20
    }
})

export default ModalOptions;
