import React, { FC } from "react";
import { Dimensions, TextInput, View, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('screen')

interface Props {
    placeholder: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean
}

const Input: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                secureTextEntry={props.secureTextEntry || false} onChangeText={props.onChangeText}>
            </TextInput>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        marginVertical: 10,
        borderColor: "#C0BBAA",
        borderWidth: 0.5
    },
    input: {
        padding: 15
    }
})