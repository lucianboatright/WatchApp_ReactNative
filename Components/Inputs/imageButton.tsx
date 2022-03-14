import React, { FC } from "react";
import { Dimensions, TextInput, View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const {height, width} = Dimensions.get('screen')
 
interface Props {
    title: string;
    style: any;
    onPress: () => void;
}

const App : FC <Props> = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default App;

const styles = StyleSheet.create ({
    container: {
        backgroundColor: "#44D0DF",
        minWidth: 200,
        marginLeft: 10,
        marginRight: 10,
        // width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius:5,
        marginVertical: 10
    },
    text: {
        color: '#fff'
    }
})