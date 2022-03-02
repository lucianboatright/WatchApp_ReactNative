import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../Inputs';

const App : FC = () => {
    return (
        <View style={styles.container}>
            <Text>Hello From SIGNUP</Text>
            <Input placeholder='Name' onChangeText={(text) => console.log(text)} />
        </View>
    )
}

export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})