import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList } from 'react-native-gesture-handler';
import { Rendering } from '../Components/Rendering';


const App : FC = (props) => {

    const [approvedPost, setApprovedPosts] = useState<any>(null) 
    const [userDetails, setUserDetails] = useState<any>(null)

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id, ...user.data()})
    }

    const getApprovedPosts = async () => {
        firebase.firestore().collection('posts').where('approved', '==', true).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
        })
    }
    
    useEffect(() => {
        getUserDetails()
        getApprovedPosts()
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Hello From HOME</Text>
                {/* <Text>User Details:</Text>
                <Button title="SignOut" onPress={signOutUser} /> */}
            </View>

            <View style={styles.approvedPosts}>
                <FlatList
                    data={approvedPost}
                    renderItem={({item}) => <Rendering post={item.data().post} name={item.data().userName} timeStamp={item.data().timeStamp} approved={item.data().approved} onApprove={() => onApproval(item.data().id)} onReject={() => onRegect(item.data().id)} />} 
                />
            </View>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flex: 0.5
    },
    approvedPosts: {
        flex: 2
    },
    addPost: {
        flex: 1
    }
})