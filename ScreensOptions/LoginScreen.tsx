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
                }
            }

        }
    }
    const testing = () => {
        console.log('EMAIL AND PWORD', email, password)
    }


    return (
        <View style={styles.container}>
            <View style={styles.introTextContainer}>
                <Text style={styles.introText}>Login with your details below or signup</Text>
            </View>
            <Input placeholder='Email' onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Password' secureTextEntry onChangeText={(text) => setPassword(text)} />
            <TouchableOpacity style={styles.loginButtonLarge} onPress={() => login()}>
                <Text style={styles.Large}>Login</Text>
            </TouchableOpacity>
            <View style={styles.loginText}>
                <Text style={styles.loginLabel}>Need to Sign Up?</Text>
                <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('Signup')}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'NunitoBold' }}>Signup Here</Text>
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
        marginVertical: 25
    },
    introText: {
        fontFamily: 'Nunito',
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    introTextContainer: {
        borderRadius: 5,
    },
    loginLabel: {
        paddingTop: 5,
        marginHorizontal: 5
    },
    loginButton: {
        backgroundColor: '#9DB4C0',
        color: 'white',
        padding: 5,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    loginButtonLarge: {
        marginTop: 20,
        backgroundColor: '#89C2D9',
        color: 'white',
        padding: 5,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    Large: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        fontFamily: 'NunitoBold'
        // height: 5,
    }
})