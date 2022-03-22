import React, { FC } from "react";
import { Dimensions, TextInput, View, StyleSheet, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const {height, width} = Dimensions.get('screen')
 
interface Props {
    title: string;
    onPress: () => void;
}

const App : FC <Props> = (props) => {
    return (
        <Button style={styles.container} title={props.title} onPress={() => props.onPress()} />

    )
}

export default App;

const styles = StyleSheet.create ({
    container: {
        backgroundColor: "#44D0DF",
        minWidth: 100,
        marginLeft: 10,
        marginRight: 10,
        width: '95%',
        
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