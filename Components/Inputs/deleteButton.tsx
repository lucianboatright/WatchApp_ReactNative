import React, { FC, useEffect, useState } from "react";
import { Dimensions, TextInput, View, StyleSheet, Image, Text, Alert } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import firebase  from "firebase/compat/app";
import { getAuth, signOut } from 'firebase/auth'
import "firebase/compat/auth"
import "firebase/compat/firestore"


const {height, width} = Dimensions.get('screen')
 
interface Props {
    postId: any;
    likes: any;
    postUser: any;

}

const App : FC <Props> = (props) => {

    const [userLiked, setUserLiked] = useState<boolean>(false)
    const [info, setInfo] = useState<any>(null)

    const auth = getAuth()
    const user = auth.currentUser?.uid

    const runDelete = async () => {
        firebase.firestore().collection('posts').doc(props.postId).delete()
    }

    const deletePost = async () => {
            Alert.alert("Are your sure?",
            "Are you sure you want to remove this beautiful box?",
            [
              // The "Yes" button
              {
                text: "Yes",
                onPress: () => {
                    runDelete()
                },
              },
              // The "No" button
              // Does nothing but dismiss the dialog when tapped
              {
                text: "No",
              },
            ]
          );
        
    } 

    useEffect(() => {
 
    }, [])


    return (
        <TouchableHighlight onPress={() => deletePost()}>
                {user === props.postUser ? 
                    <Image style={styles.likeIconFalse} source={require('../../assets/icons/deleteIcon.png')} />
                    :
                    null
                }
        </TouchableHighlight>
    )
}

export default App;

const styles = StyleSheet.create ({
    likeIconFalse: {
        height: 35,
        width: 35,
    },
    likeIconTrue: {
        height: 35,
        width: 35,
    },
})