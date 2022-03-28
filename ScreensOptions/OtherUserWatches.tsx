import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// import { Button } from '../Components/Inputs'; 
import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { FlatList } from 'react-native-gesture-handler';
import { getAuth, signOut } from 'firebase/auth';
import { Rendering } from '../Components/Rendering';


const App :  React.FC = (props) => {

    const [userDetails, setUserDetails] = useState<any>(null)
    const [userEmail, setUserEmail] = useState<any>(null)
    const [userName, setUserName] = useState<any>(null)
    const [approvedPost, setApprovedPosts] = useState<any>(null) 
    const [userId, setUserId] = useState<any>(null)
    const [watchNumber, setWatchNumber] = useState<any>(null)

    const signOutUser = async () => {
        const auth = getAuth()
        signOut(auth).then(() => {
            alert('Clicked signout')
            navigation.navigate('Login')

        })
        // firebase.auth().signOut().then(() => {
        //     alert('Clicked signout')
        //     navigation.navigate('Login')
        // });
    }

    // const { }


    const getApprovedPosts = async () => {
        firebase.firestore().collection('posts').where('userIdNumber', '==', userId).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
            setWatchNumber(documents.length)
            // console.log('DOCS LENGTH',documents.)
        })
    }

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        setUserId(uid)
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id,  ...user.data()})
        // console.log(user)
        // console.log('DATA', user.data())
        setUserEmail(user.data().email)
        setUserName(user.data().name)
        console.log('USER email',userEmail)
        console.log('USER NAME',userName)
    }

    const testing = () => {
        console.log('DOCS LENGTH',approvedPost.length)

    }

    useEffect(() => {
        getUserDetails()
        getApprovedPosts()
    }, [])

    return (
        <View style={styles.container}>
            <Button title="SignOut" onPress={signOutUser} />
            <Button title="TESTING" onPress={testing} />
            <Text>Hello From Dashboard</Text>
            {/* <View style={styles.header}>
                <Text>UserName : {userName}</Text>
                <Text>User Email : {userEmail}</Text>
                <Text>You have {watchNumber} in you collection</Text>
            </View> */}
            <View style={styles.approvedPosts}>
                {/* <FlatList
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
                                likes={item.data().likes}
                                userDetails={undefined}
                                comments={item.data().comments}
                                approved={''}
                                onApprove={function (): void {
                                    throw new Error('Function not implemented.');
                                } } onReject={function (): void {
                                    throw new Error('Function not implemented.');
                                } }
                            />
                            } 
                /> */}
            </View>
        </View>
    )
}

export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    header: {
        flex: 0.5
    },
    approvedPosts: {
        flex: 2
    },
})