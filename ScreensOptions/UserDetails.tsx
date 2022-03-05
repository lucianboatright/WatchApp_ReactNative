import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../Components/Inputs'; 
import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const App : FC = (props) => {

    const [userDetails, setUserDetails] = useState<any>(null)
    const [userName, setUserName] = useState<string>('User name Empty')

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id, ...user.data()})
        setUserName(userDetails.name)
    }

    const signOutUser = async () => {
        // const auth = getAuth()
        // signOut(auth).then(() => {
        //     alert('Clicked signout')
        // })
        firebase.auth().signOut().then(() => {
            alert('Clicked signout')
        });
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <View style={styles.container}>
            <Text>Hello From Dashboard</Text>
            <View style={styles.header}>
                <Text>User Details:</Text>
                <Text>Name: {userName}</Text>
                <Button title="SignOut" onPress={signOutUser} />
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
    header: {
        flex: 0.5
    }
})