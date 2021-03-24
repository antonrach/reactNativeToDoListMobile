import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';

const Item = (props) => {

    const tick = useRef(new Animated.Value(props.isDone ? 1 : 0)).current;
    const tickBgc = useRef(new Animated.Value(props.isDone ? 1 : 0)).current;
    const [lineThrough, setLineThroug] = useState(props.isDone ? 'line-through' : 'none');

    const boxInterpolation = tickBgc.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 1)', 'rgba(253, 187, 45, 1)']
    })

    useEffect(() => {
        Animated.timing(
            tick,
            {
                toValue: props.isDone ? 1 : 0,
                duration: 50,
                useNativeDriver: true
            }
            
        ).start();
        Animated.timing(
            tickBgc,
            {
                toValue: props.isDone ? 1 : 0,
                duration: 50,
                useNativeDriver: false
            }
            
        ).start();
        setLineThroug(props.isDone ? 'line-through': 'none');
    }, [props.all])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.second}
                onPress={() => {
                    
                    Animated.timing(
                        tick,
                        {
                            toValue: props.isDone ? 0 : 1,
                            duration: 50,
                            useNativeDriver: true
                        }
                        
                    ).start();
                    Animated.timing(
                        tickBgc,
                        {
                            toValue: props.isDone ? 0 : 1,
                            duration: 50,
                            useNativeDriver: false
                        }
                        
                    ).start();
                    setLineThroug(props.isDone ? 'none': 'line-through');
                    props.onChange(!props.isDone);
                    //console.log(props.id)
                }}
                onLongPress={() => {
                    props.modalTask(props.task, props.id, props.isDone);
                }}
            >
                <Animated.View style={{   
                    borderColor: '#fdbb2d',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 15,
                    height: 30,
                    width: 30,
                    marginRight: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: boxInterpolation
                    }}>
                    <Animated.View style={{opacity: tick}}>
                        <Text style={styles.checkMark}>✓</Text>
                    </Animated.View>
                </Animated.View>
                <View style={styles.textCont}>
                    <Text
                        style={{
                            fontSize: 20,
                            color: '#6b6b6b',
                            textDecorationLine: lineThrough,
                        }}
                    >
                        {props.task}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexShrink: 1,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    second: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    checkbox: {
        borderColor: '#fdbb2d',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 15,
        height: 30,
        width: 30,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCont: {
        width: Dimensions.get('window').width * 0.9 - 45
    },
    text: {
        fontSize: 20,
        color: '#6b6b6b',
        textDecorationLine: 'line-through'
    },
    checkMark: {
        fontSize: 18,
        color: 'white',
        
    }
});

export default Item;
