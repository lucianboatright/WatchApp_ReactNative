import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileImagePicker } from '../Components/ExpoImage';

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { FlatList } from 'react-native-gesture-handler';
import { getAuth, signOut } from 'firebase/auth';
import { Rendering } from '../Components/Rendering';
import { ScrollWithLink } from '../Components/Inputs';

import { WatchList } from '../Components/DataLists';


const App: FC = (props) => {

    const [userDetails, setUserDetails] = useState<any>(null)
    const [userEmail, setUserEmail] = useState<any>(null)
    const [userName, setUserName] = useState<any>(null)
    const [approvedPost, setApprovedPosts] = useState<any>(null)
    const [filteredPost, setFilteredPosts] = useState<any>(null)
    const [userId, setUserId] = useState<any>(null)
    const [watchNumber, setWatchNumber] = useState<any>(null)
    const [forSaleCount, setForSaleCount] = useState<number>(0)
    const [notForSaleCount, setNotForSaleCount] = useState<number>(0)
    const [forSale, setForSale] = useState<any>(null)
    const [notForSale, setNotForSale] = useState<any>(null)
    const [userPic, setUserPic] = useState<any | null>(null)

    const [watchFilter, setWatchFilter] = useState<any>(null)
    const [followerFilter, setFollowerFilter] = useState<any>(null)
    const [startFilter, setStartFilter] = useState<boolean>(false)
    const [forSaleFilter, setForSaleFilter] = useState<boolean>(false)
    const [notForSaleFilter, setNotForSaleFilter] = useState<boolean>(false)
    const [followersList, setFollowersList] = useState<any>(null)
    const [followingList, setFollowingList] = useState<any>(null)
    const [followerLength, setFollowerLength] = useState<any>(null)
    const [followingLength, setFollowingLength] = useState<any>(null)


    const signOutUser = async () => {
        const auth = getAuth()
        signOut(auth).then(() => {
            alert('Clicked signout')
            navigation.navigate('Login')

        })
    }

    const getApprovedPosts = async () => {
        await firebase.firestore().collection('posts').where('userIdNumber', '==', userId).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
            setWatchNumber(documents.length)
        })
        runSaleCounter()
    }

    const runFilters = async (approvedPost: { data: () => { (): any; new(): any; cost: string; }; }) => {
        if (forSaleFilter && approvedPost.data().cost != 'Not for sale') {
            return false
        }
        if (notForSaleFilter && approvedPost.data().cost === 'Not for sale') {
            return false
        }
        return true
    }

    const runSaleCounter = async () => {
        const forSale = await approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost != 'Not for sale')
        const notForSale = await approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost == 'Not for sale')
        setForSaleCount(forSale.length)
        setNotForSaleCount(notForSale.length)
        setForSale(forSale)
        setNotForSale(notForSale)
    }

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        setUserId(uid)
        const user = await firebase.firestore().collection('users').doc(uid).get();
        await setUserDetails({ id: user.id, ...user.data() })
        await setUserEmail(user.data().email)
        await setUserName(user.data().name)
        await setUserPic(user.data().profilePicture)
        await setFollowersList(user.data().followers)
        await setFollowingList(user.data().following)
        await setFollowerLength(user.data().followers.length)
        await setFollowingLength(user.data().followers.length)
    }
    const testing = () => {
        // console.log('DOCS LENGTH', approvedPost.length)
        console.log('forsale', forSale)
        console.log('Notforsale', notForSale)
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
        // getFilteredPosts()
    }, [userId, userEmail, watchFilter, startFilter, notForSaleFilter, forSaleFilter, userPic, followersList])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerInfo}>
                        <View>
                            <Text style={styles.infoText}>UserName : {userName}</Text>
                            <Text style={styles.infoText}>User Email : {userEmail}</Text>
                            <Text style={styles.infoText}>You have {watchNumber} in you collection</Text>
                            <Text style={styles.infoText}>For Sale: {forSaleCount} Not for Sale: {notForSaleCount}</Text>
                        </View>
                        <View>
                            <View style={styles.profileImageBox}>
                                <ProfileImagePicker profilePic={userPic} userId={userId} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.infoText}>Following:  {followingLength}</Text>
                        <ScrollWithLink inportData={followingList} bgcolor={'#61A5C2'} />
                        <Text style={styles.infoText}>Followers:  {followerLength}</Text>
                        <ScrollWithLink inportData={followersList} bgcolor={'#468FAF'} />
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={forSaleFilter === true ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterForSale}>
                                <Text style={styles.text}>For Sale </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={notForSaleFilter === true ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterNotForSale}>
                                <Text style={styles.text}>Not for Sale</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={clearWatchFilter}>
                            <Text style={styles.text}>Clear Filter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Button onPress={testing} title="testing" /> */}
                <View style={styles.approvedPosts}>
                    {startFilter ?
                        <View >
                            <FlatList
                                data={approvedPost.filter(runFilters).length > 0 ? approvedPost.filter(runFilters) : approvedPost}
                                // contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                                renderItem={
                                    ({ item }) => <Rendering
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
                                        year={item.data().year}
                                        watchStyle={item.data().watchStyle}
                                        postId={item.id}
                                        likes={item.data().likes}
                                        userIdNumber={item.data().userIdNumber}
                                        comments={item.data().comments}
                                        approved={''}
                                        onApprove={function (): void {
                                            throw new Error('Function not implemented.');
                                        }} onReject={function (): void {
                                            throw new Error('Function not implemented.');
                                        }}
                                    />
                                }
                            />
                        </View>
                        :
                        <View>
                            <FlatList
                                data={approvedPost}
                                // contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                                renderItem={
                                    ({ item }) => <Rendering
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
                                        year={item.data().year}
                                        watchStyle={item.data().watchStyle}
                                        postId={item.id}
                                        likes={item.data().likes}
                                        userIdNumber={item.data().userIdNumber}
                                        comments={item.data().comments}
                                        approved={''}
                                        onApprove={function (): void {
                                            throw new Error('Function not implemented.');
                                        }} onReject={function (): void {
                                            throw new Error('Function not implemented.');
                                        }}
                                    />
                                }
                            />
                        </View>

                    }
                </View>
            </View>
        </SafeAreaView>

    )
}

export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.5,
        paddingLeft: 5,
        backgroundColor: "#C2DFE3",
        margin: 5,
        borderRadius: 5,
        padding: 5,
    },
    profileImageBox: {
        height: 10,
        marginLeft: 20,
        paddingRight: 5,
        width: '55%',
    },
    headerInfo: {
        flex: 1,
        flexDirection: 'row',
    },
    approvedPosts: {
        marginLeft: 5,
        flex: 1,
    },
    button: {
        backgroundColor: "#2A6F97",
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '98%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius: 5,
        marginVertical: 2,
    },
    buttonSmall: {
        backgroundColor: "#2C7DA0",
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius: 5,
        marginVertical: 2,
    },
    buttonSmallHilight: {
        backgroundColor: "#61A5C2",
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',

        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius: 5,
        marginVertical: 2,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    infoText: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 15,
    },
    NoWatches: {
        fontSize: 25,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
})