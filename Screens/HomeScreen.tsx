import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Input } from '../Components/Inputs';
import firebase  from "firebase/compat/app";
import { getAuth, signOut } from 'firebase/auth'
import "firebase/compat/auth"
import "firebase/compat/firestore"


const App : FC = (props) => {

    const [post, setPost] = useState<string | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    // const [isUserAdmin, setIsAdmin] = useState<boolean>(false)
    // console.log(isUserAdmin)

    const signOutUser = async () => {
        // const auth = getAuth()
        // signOut(auth).then(() => {
        //     alert('Clicked signout')
        // })
        firebase.auth().signOut().then(() => {
            alert('Clicked signout')
        });
    }

    const getUserPosts = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id, ...user.data()})
        // console.log(user.id)
        // console.log(userDetails.isAdmin)
        // setIsAdmin(userDetails.isAdmin)
        // console.log(userDetails.name)
        // console.log(userDetails.email)
        // setUserEmail
    }
    

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

    useEffect(() => {
        getUserPosts()
    }, [])

    // console.log('IS ADMINi', isUserAdmin)


    return (
        <View style={styles.container}>
            <Text>Hello From HOME</Text>
            <Text>User Details:</Text>
            {/* <Text>Name: {userDetails.name}</Text>
            <Text>Email: {userDetails.email}</Text> */}
            {/* <Text>Details: {user.data}</Text> */}
            {/* <Text>Details: {email}</Text>
            <Text>Details: {id}</Text> */}
            <Button title="SignOut" onPress={signOutUser} />
            <View>
                <Input placeholder='Add Post' onChangeText={(text) => setPost(text)} />
                <Button title='Post' onPress={submitPost} />
            </View>
            {userDetails ? userDetails.isAdmin ? (
                <View>
                    <Button title="AuthDashboard" onPress={() => props.navigation.navigate('AuthDashboard')} />
                    <Text>Admin</Text>
                </View>
            ) : null : null}
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