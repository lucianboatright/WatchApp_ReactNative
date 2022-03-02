import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../Inputs';

const App : FC = () => {

    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [passowrd, setPassword] = useState<string | null>(null)
    
    return (
        <View style={styles.container}>
            <Text>Hello From SIGNUP</Text>
            <Input placeholder='Name' onChangeText={(text) => setName(text)} />
            <Input placeholder='Email' onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Password' secureTextEntry onChangeText={(text) => setPassword(text)} />
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