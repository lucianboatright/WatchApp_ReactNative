import React, { FC, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Image, Alert, Modal, View, Text, TouchableOpacity } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import firebase from "firebase/compat/app";
import { getAuth, updatePassword, updateProfile } from 'firebase/auth'
import "firebase/compat/auth"
import "firebase/compat/firestore"
import Input from './input';


const { height, width } = Dimensions.get('screen')

interface Props {
    postUser: string;
    userName: string;
    userEmail: string;

}

const App: FC<Props> = (props) => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const [newUserName, setNewUserName] = useState<string>('')
    const [newUserEmail, setNewUserEmail] = useState<string>('')
    const [newUserPassword, setNewUserPassword] = useState<string>('')

    const auth = getAuth()
    const user = auth.currentUser?.uid

    const submitNewUserName = () => {
        const userNow = firebase.auth().currentUser
        if (userNow) {
            // userNow.updateProfile({
            //     displayName: newUserName,
            // }).then(() => {
            firebase.firestore().collection('user').doc(user).update({ name: newUserName })
            //     Alert.alert('User Detials Changed')
            // }).catch((error) => {
            //     console.log(error)
            // })
        }
    }
    const submitNewUserEmail = () => {
        const userNow = firebase.auth().currentUser
        // if (userNow) {
        //     userNow.updateEmail(newUserEmail).then(() => {
        firebase.firestore().collection('user').doc(user).update({ email: newUserEmail })
        //     Alert.alert('User Detials Changed')
        // }).catch((error) => {
        //     console.log(error)
        // })
        // }
    }
    const submitNewUserPassowrd = () => {
        const userNow = firebase.auth().currentUser
        if (userNow) {
            userNow.updatePassword(newUserPassword).then(() => {
                // firebase.firestore().collection('user').doc(user).update({ email: newUserEmail })
                Alert.alert('User Detials Changed')
            }).catch((error) => {
                console.log(error)
            })
        }
    }



    useEffect(() => {
        console.log(auth.currentUser)
    }, [])


    return (
        <View>
            <TouchableHighlight onPress={() => setOpenModal(!openModal)}>
                {user === props.postUser ?
                    <Image style={styles.likeIconFalse} source={require('../../assets/icons/settingButton.png')} />
                    :
                    null
                }
            </TouchableHighlight>
            <Modal visible={openModal} >
                <View style={{ marginTop: 40 }}>
                    <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.goBackText}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContainer}>
                    <Text style={styles.titleText}>Update User Details Below</Text>
                    <Text style={styles.infoText}>User Name : {props.userName}</Text>
                    <Input placeholder='New User Name' onChangeText={text => setNewUserName(text)} />
                    <TouchableHighlight style={styles.submitButton} onPress={() => submitNewUserName()}>
                        <Text style={{ color: '#EAE8E3', fontFamily: 'NunitoBold' }}>Submit New User Name</Text>
                    </TouchableHighlight>
                    <Text style={styles.infoText}>User Email : {props.userEmail}</Text>
                    <Input placeholder='New User Name' onChangeText={text => setNewUserEmail(text)} />
                    <TouchableHighlight style={styles.submitButton} onPress={() => submitNewUserEmail()}>
                        <Text style={{ color: '#EAE8E3', fontFamily: 'NunitoBold' }}>Submit User Email</Text>
                    </TouchableHighlight>
                    <Text style={styles.infoText}>User Password </Text>
                    <Input placeholder='New User Name' secureTextEntry onChangeText={text => setNewUserPassword(text)} />
                    <TouchableHighlight style={styles.submitButton} onPress={() => submitNewUserPassowrd()}>
                        <Text style={{ color: '#EAE8E3', fontFamily: 'NunitoBold' }}>Submit Password</Text>
                    </TouchableHighlight>
                    {/* <Button title={'Submit Changes'} onPress={function (): void {
                        throw new Error('Function not implemented.');
                    }} /> */}
                </View>
            </Modal>
        </View>

    )
}

export default App;

const styles = StyleSheet.create({
    likeIconFalse: {
        height: 22,
        width: 22,
        // margin: 2,
    },
    likeIconTrue: {
        height: 22,
        width: 22,
    },
    modalContainer: {
        marginTop: 20,
    },
    titleText: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: "#012A4A",
        fontFamily: 'NunitoBold',
        fontSize: 25,
    },
    infoText: {
        marginLeft: 10,
        color: "#012A4A",
        fontFamily: 'NunitoBold',
        fontSize: 15,
    },
    submitButton: {
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#B76935",
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius: 5,
        marginVertical: 2,
    },
    goBackButton: {
        backgroundColor: '#B76935',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        marginTop: -5,
        height: 20,
    },
    goBackText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
})