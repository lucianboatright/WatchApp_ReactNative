import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
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

    const getFilterForSale = async () => {
        setStartFilter(true)
        if (notForSaleFilter) {
            setNotForSaleFilter(!notForSaleFilter)
            setForSaleFilter(!forSaleFilter)
            
        }
        setForSaleFilter(!forSaleFilter)
    }

    const getFilterNotForSale = async () => {
        setStartFilter(true)
        if (forSaleFilter) {
            setNotForSaleFilter(!notForSaleFilter)
            setForSaleFilter(!forSaleFilter)
        }
        setNotForSaleFilter(!notForSaleFilter)
    }

    const clearWatchFilter = () => {
        setWatchFilter(null)
        setFilteredPosts(null)
        setForSaleFilter(false)
        setNotForSaleFilter(false)
        setStartFilter(false)
    }

    useEffect(() => {
        getUserDetails()
        getApprovedPosts()
        getFilteredPosts()
    }, [userEmail, watchFilter, startFilter, notForSaleFilter, forSaleFilter])

    return (
        <View style={styles.container}>

            {/* <Button title="TESTING" onPress={testing} /> */}
            {/* <View> */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.infoText}>UserName : {userName}</Text>
                        <Text style={styles.infoText}>User Email : {userEmail}</Text>
                        <Text style={styles.infoText}>You have {watchNumber} in you collection</Text>
                        <Text style={styles.infoText}>For Sale: {forSaleCount} Not for Sale: {notForSaleCount}</Text>
                        <Button title="SignOut" onPress={signOutUser} />
                    </View>
                    <View>
                        <Image style={styles.profileImage} source={require('../assets/icons/profileIcon.png')} />
                    </View>
                </View>

            {/* </View> */}
            <TouchableOpacity style={styles.button} onPress={clearWatchFilter}>
                <Text style={styles.text}>Clear Filter</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={forSaleFilter === true ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterForSale}>
                    <Text style={styles.text}>For Sale </Text>
                </TouchableOpacity>
                <TouchableOpacity style={notForSaleFilter === true ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterNotForSale}>
                    <Text style={styles.text}>Not for Sale</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.approvedPosts}>
            {startFilter ?
                <View>
                    {filteredPost.length === 0 ?
                    <View>
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
                                userIdNumber={item.data().userIdNumber}
                                // userDetails={item.data().uid}
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
                    :
                        <View>
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
                                        likes={item.data().likes}
                                        userIdNumber={item.data().userIdNumber}
                                        // userDetails={item.data().uid}
                                        comments={item.data().comments}
                                        approved={''}
                                        onApprove={function (): void {
                                            throw new Error('Function not implemented.');
                                        } } onReject={function (): void {
                                            throw new Error('Function not implemented.');
                                        } } userDetails={undefined}                                    />
                                    } 
                                />
                            </View>
                        }
                    </View>
                :
                    <View>
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
                                    userIdNumber={item.data().userIdNumber}
                                    // userDetails={item.data().uid}
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
            
                }
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
        flex: 0.3,
        paddingLeft: 5,
        backgroundColor: "orange",
        margin: 5,
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 30,

    },
    approvedPosts: {
        flex: 2
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
        padding: 2.5,
        borderRadius:5,
        marginVertical: 2,
    },
    buttonSmall: {
        backgroundColor: "#44D0DF",
        // minWidth: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius:5,
        marginVertical: 2,
    },
    buttonSmallHilight: {
        backgroundColor: "orange",
        // minWidth: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',
        
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius:5,
        marginVertical: 2,
    },
    // profileImage: {
    //     paddingBottom: 10,
    // },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    infoText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
})