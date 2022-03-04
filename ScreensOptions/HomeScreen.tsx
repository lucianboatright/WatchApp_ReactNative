import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Input } from '../Components/Inputs';
import firebase  from "firebase/compat/app";
import { getAuth, signOut } from 'firebase/auth'
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList } from 'react-native-gesture-handler';
import { Rendering } from '../Components/Rendering';


const App : FC = (props) => {

    const [post, setPost] = useState<string | null>(null)
    const [approvedPost, setApprovedPost] = useState<any>(null) 
    const [userDetails, setUserDetails] = useState<any>(null)

    const signOutUser = async () => {
        // const auth = getAuth()
        // signOut(auth).then(() => {
        //     alert('Clicked signout')
        // })
        firebase.auth().signOut().then(() => {
            alert('Clicked signout')
        });
    }

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id, ...user.data()})
    }

    const getApprovedPosts = async () => {
        firebase.firestore().collection('posts').where('approved', '==', true).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPost(documents)
        })
    }
    

    const submitPost = async () => {
        if(post === null) {
            Alert.alert('Please enter somthing before submitting')
        } else {
            alert('Post Button')
            const data = {
                post,
                timeStamp: Date.now(),
                approved: true
            }
            try{
                await firebase.firestore().collection('posts').add(data);
            } catch(err){
                console.log(err)
            }
        }
        setPost(null)
    }

    useEffect(() => {
        getUserDetails()
        getApprovedPosts()
    }, [])

    // console.log('IS ADMINi', isUserAdmin)


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Hello From HOME</Text>
                <Text>User Details:</Text>
                <Button title="SignOut" onPress={signOutUser} />
            </View>

            <View style={styles.approvedPosts}>
                <FlatList
                    data={approvedPost}
                    renderItem={({item}) => <Rendering post={item.data().post}  timeStamp={item.data().timeStamp} approved={item.data().approved} onApprove={() => onApproval(item.data().id)} onReject={() => onRegect(item.data().id)} />} 
                />
            </View>
            <View style={styles.addPost}>
                <View>
                    <Input placeholder='Add Post' onChangeText={(text) => setPost(text)} />
                    <Button title='Post' onPress={submitPost} />
                </View>
                {userDetails ? userDetails.isAdmin ? (
                    <View>
                        <Button title="AuthDashboard" onPress={() => props.navigation.navigate('AuthDashboard')} />
                    </View>
                ) : null : null}
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