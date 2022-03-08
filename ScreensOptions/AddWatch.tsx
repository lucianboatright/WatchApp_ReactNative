import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Input } from '../Components/Inputs';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const App : FC = () => {

    const [post, setPost] = useState<string | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)

    const submitPost = async () => {
        if(post === null) {
            Alert.alert('Please enter somthing before submitting')
        } else {
            alert('Post Button')
            const data = {
                post,
                timeStamp: Date.now(),
                approved: true
            }
            try{
                await firebase.firestore().collection('posts').add(data);
            } catch(err){
                console.log(err)
            }
        }
        setPost(null)
    }

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id, ...user.data()})
    }

        const testing = () => {
            Alert.alert('TEESTING BUTTON')
        }



    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <View style={styles.container}>
            <Text>Hello From Add watch</Text>
            <View style={styles.addPost}>
                <View>
                    <Input placeholder='Add Post' onChangeText={(text) => setPost(text)} />
                    <Button title='Post' onPress={submitPost} />
                    {/* <Button title='TESTING' onPress={testing} /> */}
                    <TouchableOpacity style={styles.loginButton} onPress={console.log('Clicked')}>
                    <Text>Signup Here</Text>
                </TouchableOpacity>

                </View>
                {userDetails ? userDetails.isAdmin ? (
                    <View>
                        <Button title="AuthDashboard" onPress={() => props.navigation.navigate('AuthDashboard')} />
                    </View>
                ) : null : null}
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
    loginButton: {
        backgroundColor: '#44D0DF',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',

    }
})