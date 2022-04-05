import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// import { Button } from '../Components/Inputs'; 
import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { FlatList } from 'react-native-gesture-handler';
import { getAuth, signOut } from 'firebase/auth';
import { Rendering } from '../Components/Rendering';


const App : FC = (props) => {

    const [userDetails, setUserDetails] = useState<any>(null)
    const [userEmail, setUserEmail] = useState<any>(null)
    const [userName, setUserName] = useState<any>(null)
    const [approvedPost, setApprovedPosts] = useState<any>(null)
    const [filteredPost, setFilteredPosts] = useState<any>(null) 
    const [userId, setUserId] = useState<any>(null)
    const [watchNumber, setWatchNumber] = useState<any>(null)
    const [forSaleCount, setForSaleCount] = useState<number>(0)
    const [notForSaleCount, setNotForSaleCount] = useState<number>(0)

    const [watchFilter, setWatchFilter] = useState<any>(null)
    const [startFilter, setStartFilter] = useState<boolean>(false)
    const [forSaleFilter, setForSaleFilter] = useState<boolean>(false)
    const [notForSaleFilter, setNotForSaleFilter] = useState<boolean>(false)


    const signOutUser = async () => {
        const auth = getAuth()
        signOut(auth).then(() => {
            alert('Clicked signout')
            navigation.navigate('Login')

        })
    }

    const getApprovedPosts = async () => {
        firebase.firestore().collection('posts').where('userIdNumber', '==', userId).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
            setWatchNumber(documents.length)
        })
        runSaleCounter()
    }

    const getFilteredPosts = async () => {
        // console.log('I am being clicked')
        if (forSaleFilter && watchFilter) {
            const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().brand == watchFilter && item.data().cost != 'Not for sale')
            setFilteredPosts(filtered)
        } else if (forSaleFilter && !watchFilter) {
            const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost != 'Not for sale')
            setFilteredPosts(filtered)
        } else if (notForSaleFilter && watchFilter) {
            const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().brand == watchFilter && item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
        } else if ( notForSaleFilter && !watchFilter) {
            const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
        } else {
            const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().brand == watchFilter )
            setFilteredPosts(filtered)
        }
    }

    const runSaleCounter = () => {
        const forSale = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost != 'Not for sale')
        const notForSale = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost == 'Not for sale')
        setForSaleCount(forSale.length)
        setNotForSaleCount(notForSale.length)
    }

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        setUserId(uid)
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id,  ...user.data()})
        setUserEmail(user.data().email)
        setUserName(user.data().name)
    }

    const testing = () => {
        console.log('DOCS LENGTH',approvedPost.length)

    }

    useEffect(() => {
        getUserDetails()
        getApprovedPosts()
    }, [userName])

    return (
        <View style={styles.container}>
            <Button title="SignOut" onPress={signOutUser} />
            <Button title="TESTING" onPress={testing} />
            <Text>Hello From Dashboard</Text>
            <View style={styles.header}>
                <Text>UserName : {userName}</Text>
                <Text>User Email : {userEmail}</Text>
                <Text>You have {watchNumber} in you collection</Text>
                <Text>For Sale: {forSaleCount} Not for Sale: {notForSaleCount}</Text>

            </View>
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
                />
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