import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "../Inputs";

const { width, height } = Dimensions.get('screen')

interface Props {
    post: string;
    userName: object;
    approved: string;
    timeStamp: number;
    // onApprove: () => void;
    // onReject: () => void;
}

const formatTime = (timeStamp: number) : any => {
    const calculatedTime = Date.now() - timeStamp;
    if(calculatedTime > 1000) return `${calculatedTime / 1000} s`;
    if((calculatedTime / 1000) > 60) return `${(calculatedTime / 1000) / 60 } min`;
    if(((calculatedTime / 1000) / 60) > 60) return `${((calculatedTime / 1000) / 60) / 60} hr`
    else `${(((calculatedTime / 1000) / 60) / 60) / 24} d`
}

const App : FC <Props> = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{marginBottom: 10, fontWeight: 'bold'}}>{props.userName}</Text>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.message}>
                    <Text>{props.post}</Text>
                </View>
                <View style={styles.time}>
                    <Text>{formatTime(props.timeStamp)}</Text>
                </View>
            </View>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        alignSelf: 'center',
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: '#ccc',
        shadowOpacity: 0.7
        
    },
    message: {
        flex: 3,
        margin: 10
    },
    time: {
        flex: 1
    }
})