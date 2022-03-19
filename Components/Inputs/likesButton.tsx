import React, { FC, useEffect, useState } from "react";
import { Dimensions, TextInput, View, StyleSheet, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import { getAuth, signOut } from 'firebase/auth';


const {height, width} = Dimensions.get('screen')
 
interface Props {
    postId: any;
    // onPress: () => void;
}

const App : FC <Props> = (props) => {

    const [userLiked, setUserLiked] = useState<boolean>(false)

    const auth = getAuth()

    // const userLikedPost = async () => {

    // }

    const testing = () => {
        // console.log('MESGAE 11111111',auth)
        // console.log('MESGAUSER idE',auth.currentUser?.uid)
        // console.log('CARD ID', props.postId )
        console.log('CLICKED', userLiked)
        setUserLiked(!userLiked)
    }

    useEffect(() => {
        console.log('Being called')
    })


    return (
        <TouchableHighlight onPress={testing}>
            <Image style={userLiked? styles.likeIconTrue : styles.likeIconFalse} source={require('../../assets/icons/likes.png')} />
        </TouchableHighlight>
    )
}

export default App;

const styles = StyleSheet.create ({
    likeIconFalse: {
        backgroundColor: "red",
        height: 30,
        width: 30,
    },
    likeIconTrue: {
        backgroundColor: "green",
        height: 30,
        width: 30,
    },
})