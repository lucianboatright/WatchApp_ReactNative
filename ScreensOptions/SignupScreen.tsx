import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
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
        Alert.alert("Are your sure?",
            "By clicking yes you agree to the Terms and Conditions",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: async () => {
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
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Go Back",
                },
            ]
        );

    }

    return (
        <View style={styles.container}>
            <View style={styles.introTitleContainer}>
                <Text style={styles.title}>Welcome to Show Box</Text>
            </View>
            <View style={styles.introTextContainer}>
                <Text style={styles.introText}>Start Your Free Virtual Watch Box Collection Today!</Text>
                {/* <View style={{ flexDirection: 'row' }}>
                    <Text><Text style={styles.introTextSmall}>By signing up you agree to the Terms & Conditions found </Text><Text style={styles.links} onPress={() => Linking.openURL('https://www.termsfeed.com/live/f1f2f92c-f9d2-48a1-80ea-68b048591174')}>Here</Text><Text style={styles.introTextSmall}> and Privacy Policy here </Text><Text style={styles.links} onPress={() => Linking.openURL('https://www.termsfeed.com/live/f1f2f92c-f9d2-48a1-80ea-68b048591174')}>Here</Text><Text style={styles.introTextSmall}>Otherwise Feel free to contact us at RollandBox@gmail.com</Text></Text>
                </View> */}
            </View>
            <Input placeholder=" Enter Your First Name" onChangeText={(text) => setName(text)} />
            <Input placeholder='Email' onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Password' secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Input placeholder='Confirm' secureTextEntry onChangeText={(text) => setConfirm(text)} />
            {/* <Button title='SignUp' onPress={signup} /> */}
            <View style={styles.introTextContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text><Text style={styles.introTextSmall}>By signing up you agree to the Terms & Conditions found </Text><Text style={styles.links} onPress={() => Linking.openURL('https://www.termsfeed.com/live/f1f2f92c-f9d2-48a1-80ea-68b048591174')}>Here</Text><Text style={styles.introTextSmall}> and Privacy Policy here </Text><Text style={styles.links} onPress={() => Linking.openURL('https://www.termsfeed.com/live/f1f2f92c-f9d2-48a1-80ea-68b048591174')}>Here</Text><Text style={styles.introTextSmall}>Otherwise Feel free to contact us at RollandBox@gmail.com</Text></Text>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.loginButton} onPress={() => signup()}>
                    <Text style={styles.Large}>Sign Up</Text>
                </TouchableOpacity>
            </View>
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
    title: {
        padding: 10,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    introText: {
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    introTextSmall: {
        padding: 5,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    links: {
        padding: 5,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    introTextContainer: {
        backgroundColor: 'orange',
        borderRadius: 5,
        marginBottom: 10,
        width: '95%'
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
        paddingRight: 20,
        paddingLeft: 20,
    },
    Large: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        // height: 5,
    }
})