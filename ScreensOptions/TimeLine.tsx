import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
// import { Button } from '../Components/Inputs';
import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList } from 'react-native-gesture-handler';
import { Rendering } from '../Components/Rendering';

import { WatchScrollList } from '../Components/Inputs';


const App : FC = (props) => {

    const [approvedPost, setApprovedPosts] = useState<any>(null) 
    const [filteredPost, setFilteredPosts] = useState<any>(null) 
    const [userDetails, setUserDetails] = useState<any>(null)
    const [userId, setUserId] = useState<any>(null)
    const [watchFilter, setWatchFilter] = useState<any>(null)

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id, ...user.data()})
        setUserId(user.id)
    }

    const getApprovedPosts = async () => {
        firebase.firestore().collection('posts').onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
        })
    }

    const changeFilter = async (name: string) => {
        console.log('NAME',name)
        setWatchFilter(name);
    
        // setTimeout(
        //     () => { console.log('result',watchFilter) },
        //     3000
        //   )
        getFilteredPosts();

    }
    console.log('I have bbeen added', watchFilter);
    
    const getFilteredPosts = async () => {
        console.log('I am being clicked')
        firebase.firestore().collection('posts').where('brand', '==', watchFilter ).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setFilteredPosts(documents)
            console.log('WATCH FILTER WE HOPE',watchFilter)
        })
    }

    const testing = () => {
        // console.log('USER ID',userId)
        console.log('WATCH FILTER', watchFilter)
        console.log('WatchDOcs', filteredPost)
    }

    const clearWatchFilter = () => {
        setWatchFilter(null)
        setFilteredPosts(null)
    }
    
    useEffect(() => {
        console.log('INSIUDE USE EFFECT')
        getUserDetails()
        getApprovedPosts()
        getFilteredPosts()
    }, [])
    return (
        <View style={styles.container}>
            {/* <View style={styles.header}>
                <Text>Hello From HOME</Text>
            </View> */}
            {/* <Button title='Testing' onPress={testing} /> */}
            <WatchScrollList sendWatchFilter={(name: string) => changeFilter(name)} />
            <TouchableOpacity style={styles.button} title='Clear Selected' onPress={clearWatchFilter}>
                <Text style={styles.text}>Clear Filter</Text>
            </TouchableOpacity>
            {/* <Button style={styles.button} title='Clear Selected' onPress={clearWatchFilter} /> */}
            <View style={styles.approvedPosts}>
                {watchFilter ?
                <View>
                        <Text>{watchFilter}</Text>
                        <FlatList
        
                        data={filteredPost}
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
                                    approved={item.data().approved}
                                    onApprove={() => console.log(item.data().id)}
                                    onReject={() => console.log(item.data().id)}
                                />
                                } 
                            />
                    </View>
                :
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
                                    approved={item.data().approved} onApprove={() => onApproval(item.data().id)}
                                    onReject={() => onRegect(item.data().id)}
                                />
                            } 
                    />
                }
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
    },
    button: {
        // backgroundColor: 'red',
        backgroundColor: "#44D0DF",
        // minWidth: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '98%',
        
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius:5,
        marginVertical: 2,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    }
})