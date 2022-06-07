import React, { FC, useEffect } from "react";
import { Dimensions, StyleSheet, Image, Alert } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const { height, width } = Dimensions.get('screen')

interface Props {
    postId: any;
    likes: any;
    postUser: any;

}

const App: FC<Props> = (props) => {


    const runDelete = async () => {
        firebase.firestore().collection('posts').doc(props.postId).delete()
    }

    const deletePost = async () => {
        Alert.alert("Are your sure?",
            "Are you sure you want to remove this beautiful box?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        runDelete()
                    },
                },
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
            <Image style={styles.likeIconFalse} source={require('../../assets/icons/delete.png')} />
        </TouchableHighlight>
    )
}

export default App;

const styles = StyleSheet.create({
    likeIconFalse: {
        marginTop: 2,
        height: 30,
        width: 30,
    },
    likeIconTrue: {
        marginTop: 2,
        height: 30,
        width: 30,
    },
})