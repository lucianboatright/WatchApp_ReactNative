import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from '../Components/Inputs';

const App : FC = (props) => {

    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [passowrd, setPassword] = useState<string | null>(null)
    
    return (
        <View style={styles.container}>
            <Text>Hello From SIGNUP</Text>
            <Input placeholder='Name' onChangeText={(text) => setName(text)} />
            <Input placeholder='Email' onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Password' secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Button title='SignUp' onPress={() => alert('Pressed')} />
            <View style={styles.loginText}>
                <Text style={styles.loginLabel}>Already Have an Account?</Text>
                <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('Login')}>
                    <Text>Login Here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        flexDirection: 'row',
        marginVertical: 20
    },
    loginLabel: {
        marginHorizontal: 5
    },
    loginButton: {
        backgroundColor: '#44D0DF',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center', 
        alignItems: 'center' 

    }
})