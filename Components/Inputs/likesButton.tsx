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

}

const App : FC <Props> = (props) => {

    const [userLiked, setUserLiked] = useState<boolean>(false)
    const [info, setInfo] = useState<any>(null)

    const auth = getAuth()
    const user = auth.currentUser?.uid
    
    // const likes = props.likes

    const likesChecked = async () => {
        // console.log('likes checked start', info, userLiked)

        const likedInfo = await firebase.firestore().collection('posts').doc(props.postId).get()
            // console.log('ONFOOOOOOOOO',likedInfo.data().likes);
            setInfo(likedInfo)
            // console.log('likes checked END', info, userLiked)
    }

    const userLikedPost = async () => {
        // if (userLiked === false) {
            // await firebase.firestore().collection('posts').update
        // }
        setUserLiked((userLiked) => !userLiked)
        await firebase.firestore().collection('posts').doc(props.postId).update({likes: userLiked ? firebase.firestore.FieldValue.arrayRemove(auth.currentUser?.uid) : firebase.firestore.FieldValue.arrayUnion(auth.currentUser?.uid)})
    }

    const testing = () => {
        console.log('CLICKED')

        // console.log(props.postId)
        console.log(userLiked)

    }


    useEffect(() => {
        // console.log(props.likes)
        if ((props.likes).includes(user)) {
            // console.log('True', props.postId);
            setUserLiked(true)
        } 
    }, [props.likes])


    return (
        <TouchableHighlight onPress={userLikedPost}>
            {userLiked? 
                <Image style={styles.likeIconFalse} source={require('../../assets/icons/likedWatchPink.png')} />
            : 
                <Image style={styles.likeIconFalse} source={require('../../assets/icons/LikedWatch.png')} />
            }
        </TouchableHighlight>
    )
}

export default App;

const styles = StyleSheet.create ({
    likeIconFalse: {
        // backgroundColor: "red",
        height: 35,
        width: 35,
    },
    likeIconTrue: {
        // backgroundColor: "green",
        height: 35,
        width: 35,
    },
})