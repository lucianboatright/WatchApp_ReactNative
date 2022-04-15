import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from '../Components/Inputs';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { getAuth, updateProfile } from 'firebase/auth';

const App: FC = (props) => {

    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [confirm, setConfirm] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    // const [userDetails, setUserDetails] = useState<any>(null)
    const followers: never[] = []


    const signup = async () => {
        if (password !== confirm) {
            Alert.alert('Please make sure your passwords match')
        } else {
            if (error !== '') setError('')

            if (name !== null && email !== null && password !== null && confirm !== null) {
                try {
                    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)

                    if (user) {
                        await firebase.firestore().collection('users').doc(user.uid).set({ name, email, password, followers })
                        const current = firebase.auth().currentUser;
                        // setUserDetails(current)
                        return current?.updateProfile({
                            displayName: name
                        })

                    }
                } catch (error) {
                    // Alert.alert(JSON.stringify(error))

                    if (error.code.includes('auth/weak-password')) {
                        Alert.alert('Please enter a stronger password');
                    }
                    else if (error.code.includes('auth/email-already-in-use')) {
                        Alert.alert('Email alreay in use');
                    }
                    else {
                        Alert.alert('Somthing is Worng with the details, Please Re-Enter')
                    }
                }
                // firebase.auth().createUserWithEmailAndPassword()
            } else {
                Alert.alert('Error', 'Missing Fields')
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.introTitleContainer}>
                <Text style={styles.introText}>Welcome to Show Box</Text>
            </View>
            <View style={styles.introTextContainer}>
                <Text style={styles.introText}>Sign up and start your watch collection now! Allowing you to display all your watches in a virtual box.</Text>
            </View>
            <Input placeholder=" Enter Your First Name" onChangeText={(text) => setName(text)} />
            <Input placeholder='Email' onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Password' secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Input placeholder='Confirm' secureTextEntry onChangeText={(text) => setConfirm(text)} />
            {/* <Button title='SignUp' onPress={signup} /> */}
            <TouchableOpacity style={styles.loginButton} onPress={() => signup()}>
                <Text style={styles.Large}>Sign Up</Text>
            </TouchableOpacity>
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
    introText: {
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    introTextContainer: {
        backgroundColor: 'orange',
        borderRadius: 5,
    },
    introTitleContainer: {
        backgroundColor: '#44D0DF',
        borderRadius: 5,
        marginBottom: 10,
    },
    loginLabel: {
        paddingTop: 5,
        marginHorizontal: 5
    },
    loginButton: {
        backgroundColor: '#44D0DF',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingRight: 10,
        paddingLeft: 10,
    },
    Large: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        // height: 5,
    }
})