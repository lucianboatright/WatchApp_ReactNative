import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../Components/Inputs';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


const App : FC = (props) => {
    const signout = async () => {
        firebase.auth().signOut();
    }
    return (
        <View style={styles.container}>
            <Text>Hello From HOME</Text>
            <Button title="SignOut" onPress={signout} />
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