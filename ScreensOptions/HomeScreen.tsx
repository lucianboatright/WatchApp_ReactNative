import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList } from 'react-native-gesture-handler';
import { Rendering } from '../Components/Rendering';
import { Button } from '../Components/Inputs';


const App : FC = (props) => {

    const [approvedPost, setApprovedPosts] = useState<any>(null) 
    const [userDetails, setUserDetails] = useState<any>(null)

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id, ...user.data()})
    }

    const getApprovedPosts = async () => {
        firebase.firestore().collection('posts').onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
        })
    }

    const testing = () => {
        console.log('OOOOOOOOOOOOOOOOOOOO')
    }
    
    useEffect(() => {
        getUserDetails()
        getApprovedPosts()
    }, [])


    return (
        <View style={styles.container}>
            {/* <View style={styles.header}>
                <Text>Hello From HOME</Text>
            </View> */}
            <Button title="TESTING" onPress={testing} />

            <View style={styles.approvedPosts}>
                <FlatList
                    data={approvedPost}
                    renderItem={
                            ({item}) => <Rendering
                                message={item.data().message}
                                name={item.data().userName}
                                iamge_1={item.data().iamge_1}
                                iamge_2={item.data().iamge_2}
                                iamge_3={item.data().iamge_3}
                                iamge_4={item.data().iamge_4}
                                brand={item.data().brand}
                                caseSize={item.data().caseSize}
                                caseMaterial={item.data().caseMaterial}
                                lugsWidth={item.data().lugsWidth}
                                mechanism={item.data().mechanism}
                                cost={item.data().cost}
                                timeStamp={item.data().timeStamp}
                                postId={item.id}
                           />
                            } 
                />
            </View>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    header: {
        flex: 0.1
    },
    approvedPosts: {
        flex: 2
    },
    addPost: {
        flex: 1
    }
})