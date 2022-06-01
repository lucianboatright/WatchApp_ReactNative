import React, { FC, useEffect, useState } from "react";
import { Dimensions, TextInput, View, StyleSheet, Image, Text, Alert, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import firebase from "firebase/compat/app";
import { getAuth, signOut } from 'firebase/auth'
import "firebase/compat/auth"
import "firebase/compat/firestore"


const { height, width } = Dimensions.get('screen')

interface Props {
    isFollowing: boolean;
    postUser: any;
    postUserName: any;
}

const App: FC<Props> = (props) => {

    const [isFollowing, setIsFollowing] = useState<boolean>(false)

    const auth = getAuth()
    const user = auth.currentUser?.uid
    const displayName = auth.currentUser?.displayName

    const changeFollowingStatus = async () => {
        setIsFollowing(!isFollowing)
        await firebase.firestore().collection('users').doc(props.postUser).update({ followers: isFollowing ? firebase.firestore.FieldValue.arrayRemove({ name: displayName, followerId: user }) : firebase.firestore.FieldValue.arrayUnion({ name: displayName, followerId: user }) })
        await firebase.firestore().collection('users').doc(user).update({ following: isFollowing ? firebase.firestore.FieldValue.arrayRemove({ name: props.postUserName, followerId: props.postUser }) : firebase.firestore.FieldValue.arrayUnion({ name: props.postUserName, followerId: props.postUser }) })
    }

    const testing = () => {
        console.log('insfollwing inside buitton', isFollowing)
        console.log('insfollwing inside props', props.isFollowing)
    }

    useEffect(() => {
        setIsFollowing(props.isFollowing)
        // console.log('mmmm here', props.isFollowing)
    }, [props.isFollowing])


    return (
        <View>
            {props.postUser === user ?
                null
                :
                <TouchableHighlight onPress={() => changeFollowingStatus()}>
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
            {/* <Button onPress={testing} title="testing" /> */}
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
        borderColor: "#2C7DA0",
        borderWidth: 1,
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