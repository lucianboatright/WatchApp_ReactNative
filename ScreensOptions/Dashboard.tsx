import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../Components/Inputs'; 
import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { getAuth, signOut } from 'firebase/auth';

const App : FC = (props) => {

    const signOutUser = async () => {
        const auth = getAuth()
        signOut(auth).then(() => {
            alert('Clicked signout')
            // props.navigation.navigate('Login')

        })
        // firebase.auth().signOut().then(() => {
        //     alert('Clicked signout')
        // });
    }

    return (
        <View style={styles.container}>
            <Text>Hello From Dashboard</Text>
            <View style={styles.header}>
                <Text>User Details:</Text>
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