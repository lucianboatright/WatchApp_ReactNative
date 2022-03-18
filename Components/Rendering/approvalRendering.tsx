import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "../Inputs";

const { width, height } = Dimensions.get('screen')

interface Props {
    name: string;
    post: string;
    approved: string;
    timeStamp: number;
    onApprove: () => void;
    onReject: () => void;
}

const formatTime = (timeStamp: number) : any => {
    const caculatedTime = Date.now() - timeStamp
    if(caculatedTime > 1000) return `${caculatedTime / 1000} s`;
    if((caculatedTime / 1000) > 60) return `${(caculatedTime / 1000) / 60 } min`;
    if(((caculatedTime / 1000) / 60) > 60) return `${((caculatedTime / 1000) / 60) / 60} hr`
    else `${(((caculatedTime / 1000) / 60) / 60) / 24} d`
}

const App : FC <Props> = (props) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* <Text>Test</Text> */}
                <Text style={{padding: 20, borderWidth: 3, borderRadius: 10 }}>{props.post}</Text>
                <Text style={{padding: 20}}>{formatTime(props.timeStamp)}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button title="Approve" onPress={() => props.onApprove} />
                <Button title="Reject" onPress={() => props.onReject} />
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
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: '#ccc',
        shadowOpacity: 0.7
    }
})