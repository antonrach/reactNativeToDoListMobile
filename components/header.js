import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Header = () => {
    return (
        <LinearGradient
            colors={['#22c1c3', '#fdbb2d']}
            style={styles.header}
            start={{x: 1, y: .5}}
            end={{x: 0, y: .5}}
        >
            <Text style={styles.text}>ToDo List</Text>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        marginBottom: 20
    },
    text: {
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Header;
