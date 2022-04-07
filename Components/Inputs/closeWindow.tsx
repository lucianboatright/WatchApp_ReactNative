import React, { FC, useEffect, useState } from "react";
import { Dimensions, TextInput, View, StyleSheet, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import firebase  from "firebase/compat/app";
import { getAuth, signOut } from 'firebase/auth'
import "firebase/compat/auth"
import "firebase/compat/firestore"


const {height, width} = Dimensions.get('screen')
 
interface Props {
    postId: any;
    likes: any;
    // onPress: () => void;

}

const App : FC <Props> = (props) => {

    const [userLiked, setUserLiked] = useState<boolean>(false)
    const [info, setInfo] = useState<any>(null)

    const auth = getAuth()
    const user = auth.currentUser?.uid

    // const userLikedPost = async () => {
    //     setUserLiked((userLiked) => !userLiked)
    //     await firebase.firestore().collection('posts').doc(props.postId).update({likes: userLiked ? firebase.firestore.FieldValue.arrayRemove(auth.currentUser?.uid) : firebase.firestore.FieldValue.arrayUnion(auth.currentUser?.uid)})
    // }

    useEffect(() => {
   
    }, [])


    return (
        <TouchableHighlight onPress={() => {}}>
                <Image style={styles.likeIconFalse} source={require('../../assets/icons/closeWindowIcon.png')} />
        </TouchableHighlight>
    )
}

export default App;

const styles = StyleSheet.create ({
    likeIconFalse: {
        marginTop: 2 ,
        height: 30,
        width: 30,
    },
    likeIconTrue: {
        height: 35,
        width: 35,
    },
})