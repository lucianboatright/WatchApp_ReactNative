import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input } from '../Components/Inputs';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { getAuth } from 'firebase/auth';

const App: FC = (props) => {

    const auth = getAuth();
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [confirm, setConfirm] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const followers: never[] = []
    const following: never[] = []

    const signup = async () => {
        Alert.alert("Are your sure?",
            "By clicking yes you agree to the Terms and Conditions",
            [
                {
                    text: "Yes",
                    onPress: async () => {
                        if (password !== confirm) {
                            Alert.alert('Please make sure your passwords match')
                        } else {
                            if (error !== '') setError('')

                            if (name !== null && email !== null && password !== null && confirm !== null) {
                                try {
                                    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
                                        const user = userCredentials.user
                                        if (user) {
                                            firebase.firestore().collection('users').doc(user.uid).set({ name, email, password, followers, following })
                                            const current = firebase.auth().currentUser;
                                            return current?.updateProfile({
                                                displayName: name
                                            })
                                        }
                                    }).catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                        console.log(errorCode, errorMessage)

                                    })

                                } catch (error) {
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
                            } else {
                                Alert.alert('Error', 'Missing Fields')
                            }
                        }
                    },
                },
                {
                    text: "Go Back",
                },
            ]
        );

    }

    return (
        <View style={styles.container}>
            <View style={styles.introTitleContainer}>
                <Text style={styles.title}>Welcome to Roll and Box!</Text>
                <Text style={styles.introText}>Start Your Free Virtual Watch Box Collection Today!</Text>
            </View>
            <Input placeholder="Enter Your First Name" onChangeText={(text) => setName(text)} />
            <Input placeholder='Email' onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Password' secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Input placeholder='Confirm' secureTextEntry onChangeText={(text) => setConfirm(text)} />
            {/* <Button title='SignUp' onPress={signup} /> */}
            <View style={styles.introTextContainerBottom}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 5, padding: 8 }}>
                        <Text style={styles.introTextSmall}>By signing up you agree to the Terms & Conditions found </Text>
                        <Text style={styles.links} onPress={() => Linking.openURL('https://www.termsfeed.com/live/f1f2f92c-f9d2-48a1-80ea-68b048591174')}> Here </Text>
                        <Text style={styles.introTextSmall}>Otherwise Feel free to contact us at RollandBox@gmail.com</Text>
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.loginButton} onPress={() => signup()}>
                    <Text style={styles.Large}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginText}>
                <Text style={styles.loginLabel}>Already Have an Account?</Text>
                <TouchableOpacity style={styles.loginButtonSmall} onPress={() => props.navigation.navigate('Login')}>
                    <Text style={{ fontFamily: 'NunitoBold', color: '#DAD7CD' }}>Login Here</Text>
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
        backgroundColor: '#EAE8E3',
    },
    loginText: {
        flexDirection: 'row',
        marginVertical: 20
    },
    title: {
        fontFamily: 'NunitoBold',
        padding: 10,
        fontSize: 25,
        textAlign: 'center',
        color: '#325255',
    },
    introText: {
        fontFamily: 'NunitoSemiBold',
        color: '#325255',
        padding: 5,
        fontSize: 20,
        textAlign: 'center',
    },
    introTextSmall: {
        fontFamily: 'NunitoSemiBold',
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center',
    },
    links: {
        padding: 5,
        fontSize: 15,
        textAlign: 'center',
        color: '#5C6B73'
    },
    introTextContainer: {
        borderRadius: 5,
        marginBottom: 10,
    },
    introTitleContainer: {
        borderRadius: 5,
        marginBottom: 10,
    },
    introTextContainerBottom: {
        borderColor: '#253237',
        borderWidth: 0.5,
        borderRadius: 5,
        marginBottom: 15,
        marginTop: 10,
        width: '95%'
    },
    loginLabel: {
        paddingTop: 5,
        marginHorizontal: 5
    },
    loginButton: {
        backgroundColor: '#55828B',
        // backgroundColor: '#3B6064',
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingRight: 20,
        paddingLeft: 20,
    },
    loginButtonSmall: {
        backgroundColor: '#3B6064',
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingRight: 20,
        paddingLeft: 20,
    },
    Large: {
        fontSize: 25,
        color: '#DAD7CD',
    },
    modal: {
        marginBottom: 40,
        padding: 20,
        backgroundColor: 'white',
    },
    modalText: {

        fontSize: 30,
        color: 'black',
    },
})