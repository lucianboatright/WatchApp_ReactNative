import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from '../Components/Inputs';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


const App: FC = (props) => {
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const login = async () => {
        if (email === null || password === null) {

            Alert.alert('Missing Fields')
        } else {
            try {
                const { user } = await firebase.auth().signInWithEmailAndPassword(email, password)

            } catch (error) {
                if (error.code.includes('auth/user-not-found')) {
                    Alert.alert('User does not exist')
                } else if (error.code.includes('auth/wrong-password')) {
                    Alert.alert('Incorrect password')
                }

            }

        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.introTextContainer}>
                <Text style={styles.introText}>Welcome Back</Text>
                <Text style={styles.introText}>Login with your Details </Text>
            </View>
            <Input placeholder='Email' onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Password' secureTextEntry onChangeText={(text) => setPassword(text)} />
            <TouchableOpacity style={styles.loginButtonLarge} onPress={() => login()}>
                <Text style={styles.Large}>Login</Text>
            </TouchableOpacity>
            <View style={styles.loginText}>
                <Text style={styles.loginLabel}>Need to Sign Up?</Text>
                <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('Signup')}>
                    <Text style={{ color: 'white', fontFamily: 'NunitoBold' }}>Signup Here</Text>
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
        alignItems: 'center',
        backgroundColor: '#DAD7CD',
    },
    loginText: {
        flexDirection: 'row',
        marginVertical: 25
    },
    introText: {
        fontFamily: 'NunitoSemiBold',
        padding: 5,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
    },
    introTextContainer: {
        borderRadius: 5,
        marginBottom: 20,
    },
    loginLabel: {
        paddingTop: 5,
        marginHorizontal: 5
    },
    loginButton: {
        backgroundColor: '#87BBA2',
        color: 'white',
        padding: 5,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    loginButtonLarge: {
        marginTop: 30,
        backgroundColor: '#3B6064',
        color: 'white',
        padding: 5,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    Large: {

        fontSize: 25,
        color: 'white',
        fontFamily: 'NunitoSemiBold'
    }
})