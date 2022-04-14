import React, { FC, useEffect, useState } from "react";
import { Dimensions, TextInput, View, StyleSheet, Image, Text, Alert } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import firebase from "firebase/compat/app";
import { getAuth, signOut } from 'firebase/auth'
import "firebase/compat/auth"
import "firebase/compat/firestore"


const { height, width } = Dimensions.get('screen')

interface Props {
    authUser: any;
    isFollowing: any;
    postUser: any;

}

const App: FC<Props> = (props) => {

    const [userLiked, setUserLiked] = useState<boolean>(false)
    const [info, setInfo] = useState<any>(null)
    const [isFollowing, setIsFollowing] = useState<boolean>(false)

    const auth = getAuth()
    const user = auth.currentUser?.uid

    const deletePost = async () => {
        setIsFollowing(!isFollowing)
        console.log('confirm change')
    }
    console.log(isFollowing)

    // const deletePost = async () => {
    //     Alert.alert("Are your sure?",
    //         "Are you sure you want to remove this beautiful box?",
    //         [
    //             // The "Yes" button
    //             {
    //                 text: "Yes",
    //                 onPress: () => {
    //                     runDelete()
    //                 },
    //             },
    //             // The "No" button
    //             // Does nothing but dismiss the dialog when tapped
    //             {
    //                 text: "No",
    //             },
    //         ]
    //     );

    // }

    useEffect(() => {
        setIsFollowing(props.isFollowing)
    }, [])


    return (
        <TouchableHighlight onPress={() => deletePost()}>
            {isFollowing ?
                <View style={styles.container}>
                    <Image style={styles.likeIconTrue} source={require('../../assets/icons/followingIcon.png')} />
                    <Text style={styles.text}>Following</Text>
                </View>
                :
                <View style={styles.containerNot}>
                    <Image style={styles.likeIconFalse} source={require('../../assets/icons/nofollowing.png')} />
                    <Text style={styles.textNot}>Follow?</Text>
                </View>
            }
        </TouchableHighlight>
    )
}

export default App;

const styles = StyleSheet.create({
    likeIconFalse: {
        height: 25,
        width: 25,
    },
    likeIconTrue: {
        height: 25,
        width: 25,
    },
    container: {
        marginTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: 'lightgreen',
        borderWidth: 2,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerNot: {
        marginTop: 5,
        paddingLeft: 7,
        paddingRight: 10,
        borderColor: 'tomato',
        borderWidth: 2,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        paddingLeft: 5,
        fontWeight: 'bold',
    },
    textNot: {
        paddingLeft: 10,
        fontWeight: 'bold',
    }
})