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
        // maxWidth: 500,
        alignSelf: 'center',
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        marginVertical: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.4,
        // shadowRadius: 5,
        // elevation: 1
        // shadowColor: 'black',

    },
    input: {
        padding: 15
    }
})