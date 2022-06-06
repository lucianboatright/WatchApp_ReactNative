import React, { FC, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Image, Alert, Modal, View, Text, TouchableOpacity } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import firebase from "firebase/compat/app";
import { getAuth } from 'firebase/auth'
import "firebase/compat/auth"
import "firebase/compat/firestore"
import Input from './input';
import { Button } from '.';


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

    const auth = getAuth()
    const user = auth.currentUser?.uid

    const submitNewDetails = () => {
        console.log(newUserEmail)
        console.log(newUserName)
    }

    // const runDelete = async () => {
    //     firebase.firestore().collection('posts').doc(props.postId).delete()
    // }

    // const deletePost = async () => {
    //     Alert.alert("Are your sure?",
    //         "Are you sure you want to remove this beautiful box?",
    //         [
    //             {
    //                 text: "Yes",
    //                 onPress: () => {
    //                     runDelete()
    //                 },
    //             },
    //             {
    //                 text: "No",
    //             },
    //         ]
    //     );

    // }

    useEffect(() => {

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
                    <Text style={styles.infoText}>User Email : {props.userEmail}</Text>
                    <Input placeholder='New User Name' onChangeText={text => setNewUserEmail(text)} />
                    <TouchableHighlight style={styles.submitButton} onPress={() => submitNewDetails()}>
                        <Text style={{ color: '#EAE8E3', fontFamily: 'NunitoBold' }}>Submit Changes</Text>
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
        marginTop: 20,
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