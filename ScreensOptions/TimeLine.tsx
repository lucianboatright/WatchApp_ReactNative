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
    const [keyFilter, setKeyfilter] = useState<any>(null)
    const [condition, setCondition] = useState<any>(null)

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
        setWatchFilter(name);
        setKeyfilter('brand')
        getFilteredPosts();

    }

    const changeFilterForSale = async () => {
        console.log('clicked')
        setKeyfilter('cost')
    }
    
    const changeFilterNotForSale = async () => {
        console.log('clicked')
    }
    
    const getFilteredPosts = async () => {
        // console.log('I am being clicked')
        const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; }; }) => item.data().brand == watchFilter)
        setFilteredPosts(filtered)
        // firebase.firestore().collection('posts').where(`${keyFilter}`, '==', watchFilter ).onSnapshot(querySnapShot => {
        //     const documents = querySnapShot.docs;
        //     setFilteredPosts(documents)
        // })
    }

    const getFilterForSale = async () => {
        console.log('I am being clicked')
        // setWatchFilter('name');
        const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; cost: string; }; }) => item.data().cost != 'Not for sale')
        setFilteredPosts(filtered)
    }

    const getFilterNotForSale = async () => {
        console.log('I am being clicked')
        // setWatchFilter('name');
        const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; cost: string; }; }) => item.data().cost == 'Not for sale')
        setFilteredPosts(filtered)
    }

    const testing = () => {
        console.log('WATCH FILTER', watchFilter)
        console.log('WatchDOcs', approvedPost[0].data().comments)
    }

    const clearWatchFilter = () => {
        setWatchFilter(null)
        setFilteredPosts(null)
    }
    
    useEffect(() => {
        getUserDetails()
        getApprovedPosts()
        getFilteredPosts()
    }, [watchFilter])
    return (
        <View style={styles.container}>
            <WatchScrollList sendWatchFilter={(name: string) => changeFilter(name)} />
            <TouchableOpacity style={styles.button} onPress={clearWatchFilter}>
                <Text style={styles.text}>Clear Filter</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.buttonSmall} onPress={getFilterForSale}>
                    <Text style={styles.text}>For Sale </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSmall} onPress={getFilterNotForSale}>
                    <Text style={styles.text}>Not for Sale</Text>
                </TouchableOpacity>
            </View>
            {/* <Button style={styles.button} title='Clear Selected' onPress={testing} /> */}
            <View style={styles.approvedPosts}>
                {watchFilter ?
                <View>
                    {filteredPost.length === 0 ?
                    <View>
                        <Text style={styles.NoWatches}>Currently No watches by {watchFilter}</Text>
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
                                    userIdNumber={item.data().userIdNumber}
                                    postId={item.id}
                                    likes={item.data().likes}
                                    comments={item.data().comments}
                                    approved={item.data().approved} onApprove={() => onApproval(item.data().id)}
                                    onReject={() => onRegect(item.data().id)}
                                />
                            } 
                        />
                        </View>
                    :
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
                                postId={item.id}
                                comments={item.data().comments}
                                likes={item.data().likes}
                                userIdNumber={item.data().userIdNumber}
                                // userDetails={undefined}
                                approved={''}
                                onApprove={function (): void {
                                    throw new Error('Function not implemented.');
                                } } onReject={function (): void {
                                    throw new Error('Function not implemented.');
                                } }
                                />
                                } 
                            />
                        }
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
                                    postId={item.id}
                                    comments={item.data().comments}
                                    likes={item.data().likes}
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
    },
    NoWatches: {
        fontSize: 25,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    buttonSmall: {
        backgroundColor: "#44D0DF",
        // minWidth: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',
        
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius:5,
        marginVertical: 2,
    },
})