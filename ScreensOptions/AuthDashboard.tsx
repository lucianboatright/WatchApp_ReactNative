import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ApprovalRendering } from '../Components/Rendering';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList } from 'react-native-gesture-handler';

const App: FC = () => {

    const [posts, setPosts] = useState<any>(null)

    const fetchingPendingPost = async () => {
        firebase.firestore().collection('posts').where('approved', '==', false).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setPosts(documents)
        })
    }

    const onApproval = (id: string) => {
        alert(`item of ${id} is being Approved`)
    }

    const onRegect = (id: string) => {
        alert(`item of ${id} is being Regected`)
    }

    useEffect(() => {
        fetchingPendingPost()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ fontSize: '20', alignContent: 'center', fontWeight: 'bold', color: 'blue' }}>Admin Background </Text>
                <Text style={{ fontSize: '20' }}>Un-Approved Posts below </Text>
            </View>
            <FlatList data={posts} renderItem={({ item }) => <ApprovalRendering post={item.data().post} timeStamp={item.data().timeStamp} approved={item.data().approved} onApprove={() => onApproval(item.data().id)} onReject={() => onRegect(item.data().id)} name={''} />} />
        </View>
    )
}

export default App;


const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 20
    }

})