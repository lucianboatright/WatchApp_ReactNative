import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ApprovalRendering } from '../Components/Rendering';
import firebase  from "firebase/compat/app";
import { getAuth, signOut } from 'firebase/auth'
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList } from 'react-native-gesture-handler';

const App : FC = () => {

    const [posts, setPosts] = useState<any>(null)

    const fetchingPendingPost = async () => {
        firebase.firestore().collection('posts').where('approved', '==', 'false').onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setPosts(documents)
        })
    }

    const onApproval = (id: string) => {
        console.log(id);
        alert(`item of ${id} is being Approved`)
    }

    const onRegect = (id: string) => {
        console.log(id);
        alert(`item of ${id} is being Regected`)
    }

    // const onApproval = async () => {
    //     firebase.firestore().collection('posts').where('id', '==', item.id)
    //     .then()
    // }

    useEffect(() => {
        fetchingPendingPost()
    }, [])

    return (
        <View style={styles.container}>
            <Text>Hello From Auth Dashboard</Text>
            <FlatList data={posts} renderItem={({item}) => <ApprovalRendering  post={item.data().post} timeStamp={item.data().timeStamp} approved={item.data().approved} onApprove={() => onApproval(item.data().id)} onReject={() => onRegect(item.data().id)} />} />
        </View>
    )
}

export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})