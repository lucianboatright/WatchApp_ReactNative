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
    const displayName = auth.currentUser?.displayName

    const deletePost = async () => {
        setIsFollowing(!isFollowing)
        await firebase.firestore().collection('users').doc(props.postUser).update({ followers: isFollowing ? firebase.firestore.FieldValue.arrayRemove({ name: displayName, followerId: user }) : firebase.firestore.FieldValue.arrayUnion({ name: displayName, followerId: user }) })
        console.log('confirm change')
    }

    useEffect(() => {
        setIsFollowing(props.isFollowing)
    }, [])


    return (
        <View>
            {props.postUser === user ?
                null
                :
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
            }
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    likeIconFalse: {
        height: 23,
        width: 23,
    },
    likeIconTrue: {
        height: 23,
        width: 23,
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