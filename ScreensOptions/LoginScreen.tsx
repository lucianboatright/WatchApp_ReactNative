import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from '../Components/Inputs';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


const App : FC = (props) => {
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const login = async () => {
        if(email === null || password === null ){

            Alert.alert('Missing Fields')
        } else {
            try {
                const {user} = await firebase.auth().signInWithEmailAndPassword(email, password)

            } catch (error) {
                if (error.code.includes('auth/user-not-found')) {
                    Alert.alert('User does not exist')
                    }
                }
                
            }
        }


    return (
        <View style={styles.container}>
            <Text>Hello From LOGIN</Text>
            <Input placeholder='Email' onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Password' secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Button title='Login' onPress={login} />
            <View style={styles.loginText}>
                <Text style={styles.loginLabel}>Dont Have an Account?</Text>
                <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('Signup')}>
                    <Text>Signup Here</Text>
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
        textAlign: 'center',
        textAlignVertical: 'center',

    }
})