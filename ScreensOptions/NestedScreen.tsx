import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView, Image } from 'react-native'
import { FilterLines, FollowButton, WatchScrollList } from '../Components/Inputs';
import { WatchList } from '../Components/DataLists';

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { FlatList } from 'react-native-gesture-handler';
import { getAuth, signOut } from 'firebase/auth';
import { Rendering } from '../Components/Rendering';
import { ScrollWithLink } from '../Components/Inputs';



interface Props {
    id: any;
    name: any;
}

const App: React.FC<Props> = ({ route, navigation }) => {

    const { id } = route.params
    const { name } = route.params

    const auth = getAuth()
    const authUser = auth.currentUser?.uid
    const displayName = auth.currentUser?.displayName

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
    const [followerLength, setFollowerLength] = useState<number>(0)
    const [followingLength, setFollowingLength] = useState<number>(0)
    const [isFollowing, setIsFollowing] = useState<any>(null)


    const signOutUser = async () => {
        const auth = getAuth()
        signOut(auth).then(() => {
            alert('Clicked signout')
            navigation.navigate('Login')

        })
    }

    const getApprovedPosts = async () => {
        await firebase.firestore().collection('posts').where('userIdNumber', '==', id).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
            setWatchNumber(documents.length)
        })
        runSaleCounter()
    }

    const runSaleCounter = async () => {
        const forSaleInfo = await approvedPost.filter((item: any) => item.data().cost != 'Not for sale')
        const notForSaleInfo = await approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost == 'Not for sale')
        setForSaleCount(forSaleInfo.length)
        setNotForSaleCount(notForSaleInfo.length)
        setForSale(forSaleInfo)
        setNotForSale(notForSaleInfo)
    }

    // const setRunSaleCounter = async (forSaleInfo: string | any[], notForSaleInfo: string | any[]) => {
    //     setForSaleCount(forSaleInfo.length)
    //     setNotForSaleCount(notForSaleInfo.length)
    //     setForSale(forSaleInfo)
    //     setNotForSale(notForSaleInfo)
    // }
    const getUserDetails = async () => {
        const userDeta = await firebase.firestore().collection('users').doc(id).get()
        setDetails(userDeta)
    }

    const setDetails = async (userDeta: any) => {
        setUserDetails({ id: (userDeta).id, ...(userDeta).data() })
        await setUserEmail(userDeta.data().email)
        await setUserName(userDeta.data().name)
        await setUserPic(userDeta.data().profilePicture)
        await setFollowersList(userDeta.data().followers)
        await setFollowingList(userDeta.data().following)
        await setFollowerLength(userDeta.data().followers.length)
        await setFollowingLength(userDeta.data().following.length)
        if ((userDeta.data().followers).filter((item: { followerId: string | undefined; }) => item.followerId === authUser)) {
            await setIsFollowing(true)
            console.log('YESS HE IS FOLLOWING')
        }
    }


    const testing = () => {
        // console.log('DOCS LENGTH', approvedPost.length)
        // console.log('forsale', forSale)
        // console.log('Notforsale', notForSale)
        console.log('Notforsale', userDetails.following)
    }

    const getFilterForSale = async () => {
        setStartFilter(true)
        if (notForSaleFilter) {
            setNotForSaleFilter(!notForSaleFilter)
            setForSaleFilter(!forSaleFilter)

        }
        setForSaleFilter(!forSaleFilter)
    }

    // const changeFolowerFilter = async (name: string) => {
    //     setStartFilter(true)
    //     setFollowerFilter(name);
    //     getFilteredFollowersPosts();
    // }

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
        // runSaleCounter()
    }, [startFilter, forSale, notForSale])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerInfo}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.infoTextHighlight}>UserName :</Text>
                                <Text style={styles.infoText}> {name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.infoTextHighlight}>User Email : </Text>
                                <Text numberOfLines={1} style={styles.infoText}>{userEmail}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                {/* <Text style={styles.infoText}>They have </Text> */}
                                <Text style={styles.infoTextHighlight}>{watchNumber}</Text>
                                <Text style={styles.infoText}>in their collection</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.infoText}>For Sale: </Text>
                                <Text style={styles.infoTextHighlight}>{forSaleCount}</Text>
                                <Text style={styles.infoText}>& Not for Sale: </Text>
                                <Text style={styles.infoTextHighlight}> {notForSaleCount}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.profileImageBox}>
                                {/* <ProfileImagePicker profilePic={userPic} userId={userId} /> */}
                                <Image source={require('../assets/icons/profileIcon.png')} />
                                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                                    <Text style={styles.goBackText}>Back</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: '60%' }}>
                                <FollowButton isFollowing={isFollowing} postUser={id} postUserName={name} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.infoText}>Following:  {followingLength}</Text>
                        <ScrollWithLink inportData={followingList} bgcolor={'#44D0DF'} />
                        <Text style={styles.infoText}>Followers:  {followerLength}</Text>
                        <ScrollWithLink inportData={followersList} bgcolor={'#44D0DF'} />
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
                            {notForSaleFilter && !forSaleFilter ? (
                                <View>
                                    <FlatList
                                        data={notForSale}
                                        initialNumToRender={8}
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
                                                postId={item.id}
                                                likes={item.data().likes}
                                                year={item.data().year}
                                                watchStyle={item.data().watchStyle}
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
                            ) : forSaleFilter && !notForSaleFilter ? (
                                <View>
                                    <FlatList
                                        data={forSale}
                                        initialNumToRender={8}
                                        keyExtractor={(item, index) => item + index}
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
                                                }} userDetails={undefined} />
                                        }
                                    />
                                </View>
                            )
                                :
                                <View>
                                    <FlatList
                                        data={approvedPost}
                                        initialNumToRender={8}
                                        keyExtractor={(item, index) => item + index}
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
        // backgroundColor: "orange",
        borderColor: 'grey',
        borderWidth: 0.5,
        margin: 5,
        borderRadius: 5,
        padding: 5,
    },
    profileImageBox: {
        flexDirection: 'row',
        height: 10,
        // marginLeft: 20,
        // paddingRight: 5,
        // width: '10%',
    },
    headerInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    approvedPosts: {
        marginLeft: 5,
        flex: 1,
    },
    button: {
        backgroundColor: "#44D0DF",
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
        backgroundColor: "#44D0DF",
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
        backgroundColor: "orange",
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',

        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius: 5,
        marginVertical: 2,
    },
    goBackButton: {
        backgroundColor: 'red',
        // borderRadius: 10,
        // marginRight: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 12,
        marginTop: -5,
        height: 40,
    },
    goBackText: {
        color: 'white',
        fontWeight: 'bold',
        // paddingTop: 3,
        fontSize: 15,
        // height: 30,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    infoText: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 15,
        maxWidth: 128,
        // flex: 1,
    },
    infoTextHighlight: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 16,
        maxWidth: 210,
        color: "#44D0DF",
        // flex: 1,
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
// const NestedScreen: React.FC<Props> = ({ route, navigation }) => {

//     const { id } = route.params
//     const { name } = route.params


//     const [approvedPost, setApprovedPosts] = useState<any | null>(null)
//     const [userId, setUserId] = useState<any>(null)
//     const [watchNumber, setWatchNumber] = useState<any | null>(null)
//     const [filteredPost, setFilteredPosts] = useState<any | null>(null)
//     const [watchFilter, setWatchFilter] = useState<any | null>(null)
//     const [forSaleCount, setForSaleCount] = useState<number | null>(0)
//     const [notForSaleCount, setNotForSaleCount] = useState<number | null>(0)
//     const [forSale, setForSale] = useState<any>(null)
//     const [notForSale, setNotForSale] = useState<any>(null)

//     const [startFilter, setStartFilter] = useState<boolean>(false)
//     const [forSaleFilter, setForSaleFilter] = useState<boolean>(false)
//     const [notForSaleFilter, setNotForSaleFilter] = useState<boolean>(false)
//     const [userDetials, setUserDetails] = useState<any>(null)
//     const [watchesForSale, setWatchesForSale] = useState<number>(0)
//     const [watchesNotForSale, setWatchesNotForSale] = useState<number>(0)
//     const [isFollowing, setIsFollowing] = useState<boolean>(false)
//     const [followerArray, setFollowerArray] = useState<any | null>(null)
//     // console.log('isfollowing2', isFollowing)


//     // let saleItems = 0
//     // let notSaleItem = 0

//     const auth = getAuth()
//     const user = auth.currentUser?.uid
//     // console.log(auth.currentUser?.metadata)

//     const getPostsandUserInfo = async () => {
//         console.log('I have run the get users and posts')
//         await firebase.firestore().collection('posts').where('userIdNumber', '==', id).onSnapshot(querySnapShot => {
//             const documents = querySnapShot.docs;
//             setApprovedPosts(documents)
//             setWatchNumber(documents.length)
//         })
//         const userDeta = await firebase.firestore().collection('users').doc(id).get();
//         await setUserDetails(userDeta)
//         // getFollowers()
//         // console.log('user', userDeta.data().followers)
//         await setFollowerArray(userDeta.data()!.followers)

//         // getWatchSale()
//         // await approvedPost.forEach((item: { data: () => { (): any; new(): any; cost: string; }; }) => {
//         //     if (item.data().cost === 'Not for sale') {
//         //         notSaleItem += 1
//         //     } else if (item.data().cost !== 'Not for sale') {
//         //         saleItems += 1

//         //     }
//         // })
//         // setWatchesForSale(saleItems)
//         // setWatchesNotForSale(notSaleItem)
//     }

//     const runSaleCounter = async () => {
//         console.log('I have run the sale count')
//         const forSale = await approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost != 'Not for sale')
//         const notForSale = await approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost == 'Not for sale')
//         setForSaleCount(forSale.length)
//         setNotForSaleCount(notForSale.length)
//         setForSale(forSale)
//         setNotForSale(notForSale)
//     }

//     // console.log('isfollowing', isFollowing)

//     const getFollowers = async () => {
//         console.log('I am here at least')
//         if (Object.values(followerArray).includes((e: { followerId: string | undefined; }) => e.followerId === user)) {
//             setIsFollowing(true)
//         }
//     }
//     const testing = () => {
//         // console.log('FOORR SSAALLEE', watchesForSale)
//         // console.log('NNOOTT FOORR SSAALLEE', watchesNotForSale)
//         console.log('is following', isFollowing)
//         console.log('user Id', user)
//         // console.log('for sale', forSaleCount)
//         // console.log('for sale', notForSaleCount)
//         // console.log('user Details', userDetials.data())
//         // console.log('user followers', followerArray)
//     }

//     const changeFilter = (name: string) => {
//         // console.log(name)
//         setStartFilter(true)
//         setWatchFilter(name);
//         // setKeyfilter('brand')
//         getFilteredPosts();
//     }

//     const getFilteredPosts = async () => {
//         console.log('I am being filtered')
//         if (forSaleFilter && watchFilter) {
//             const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().brand == watchFilter && item.data().cost != 'Not for sale')
//             setFilteredPosts(filtered)
//         } else if (forSaleFilter && !watchFilter) {
//             const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost != 'Not for sale')
//             setFilteredPosts(filtered)
//         } else if (notForSaleFilter && watchFilter) {
//             const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().brand == watchFilter && item.data().cost == 'Not for sale')
//             setFilteredPosts(filtered)
//         } else if (notForSaleFilter && !watchFilter) {
//             const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost == 'Not for sale')
//             setFilteredPosts(filtered)
//         } else {
//             const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().brand == watchFilter)
//             setFilteredPosts(filtered)
//         }
//     }

//     const getFilterForSale = async () => {
//         setStartFilter(true)
//         if (notForSaleFilter) {
//             setNotForSaleFilter(!notForSaleFilter)
//             setForSaleFilter(!forSaleFilter)

//         }
//         setForSaleFilter(!forSaleFilter)
//     }

//     const getFilterNotForSale = async () => {
//         setStartFilter(true)
//         if (forSaleFilter) {
//             setNotForSaleFilter(!notForSaleFilter)
//             setForSaleFilter(!forSaleFilter)
//         }
//         setNotForSaleFilter(!notForSaleFilter)
//     }

//     const clearWatchFilter = () => {
//         setWatchFilter(null)
//         setFilteredPosts(null)
//         setForSaleFilter(false)
//         setNotForSaleFilter(false)
//         setStartFilter(false)
//     }

//     useEffect(() => {
//         getPostsandUserInfo()
//         // getFilteredPosts()
//         // getWatchSale()
//         // runSaleCounter()
//         getFollowers()
//     }, [isFollowing])

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <View style={styles.screen}>
//                 <View style={styles.headerContainter}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                         <Text style={styles.text}>{name}'s Watch Box</Text>
//                         <FollowButton authUser={user} isFollowing={isFollowing} postUser={id} postUserName={name} />
//                         <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
//                             <Text style={styles.goBackText}>X</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <Text style={styles.textSmall}>{name} currently has {watchNumber >= 2 ? `${watchNumber} watches` : `${watchNumber} watch`}</Text>
//                     <View style={styles.showInfo}>
//                         <View style={styles.saleFilter}>
//                             <Text style={styles.filterText}>{forSaleCount}  : </Text>
//                             <TouchableOpacity style={forSaleFilter === true ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterForSale}>
//                                 <Text style={styles.filterButtonText}>View For Sale</Text>
//                             </TouchableOpacity>
//                             {/* <Button title='View For Sale' onPress={setForSaleFilter} /> */}
//                         </View>
//                         <View style={styles.saleFilter}>
//                             <Text style={styles.filterText}>{notForSaleCount}  : </Text>
//                             <TouchableOpacity style={notForSaleFilter === true ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterNotForSale}>
//                                 <Text style={styles.filterButtonText}>View Not For Sale</Text>
//                             </TouchableOpacity>
//                             {/* <Button style={styles.filterButton} title='View Not For Sale' onPress={setNotForSaleFilter} /> */}
//                         </View>
//                     </View>
//                     <View style={{ paddingTop: 5 }}>
//                         <WatchScrollList inportData={WatchList} bgcolor={'orange'} sendFilter={(name: string) => changeFilter(name)} />
//                     </View>
//                     <TouchableOpacity style={styles.button} onPress={clearWatchFilter}>
//                         <Text style={styles.filterButtonText}>Clear Filter</Text>
//                     </TouchableOpacity>
//                     <Button onPress={testing} title="testing" />
//                 </View>
//                 <View style={styles.approvedPosts}>
//                     {startFilter ?
//                         <View>
//                             {filteredPost.length === 0 ?
//                                 <View>
//                                     <Text style={styles.NoWatches}>Be the first to add a {watchFilter}</Text>
//                                     <FlatList
//                                         data={approvedPost}
//                                         renderItem={
//                                             ({ item }) => <Rendering
//                                                 message={item.data().message}
//                                                 name={item.data().userName}
//                                                 iamge_1={item.data().iamge_1}
//                                                 iamge_2={item.data().iamge_2}
//                                                 iamge_3={item.data().iamge_3}
//                                                 iamge_4={item.data().iamge_4}
//                                                 brand={item.data().brand}
//                                                 caseSize={item.data().caseSize}
//                                                 caseMaterial={item.data().caseMaterial}
//                                                 lugsWidth={item.data().lugsWidth}
//                                                 mechanism={item.data().mechanism}
//                                                 cost={item.data().cost}
//                                                 timeStamp={item.data().timeStamp}
//                                                 postId={item.id}
//                                                 likes={item.data().likes}
//                                                 userIdNumber={item.data().userIdNumber}
//                                                 // userDetails={item.data().uid}
//                                                 comments={item.data().comments}
//                                                 approved={''}
//                                                 onApprove={function (): void {
//                                                     throw new Error('Function not implemented.');
//                                                 }} onReject={function (): void {
//                                                     throw new Error('Function not implemented.');
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </View>
//                                 :
//                                 <View>
//                                     <FlatList
//                                         data={filteredPost}
//                                         renderItem={
//                                             ({ item }) => <Rendering
//                                                 message={item.data().message}
//                                                 name={item.data().userName}
//                                                 iamge_1={item.data().iamge_1}
//                                                 iamge_2={item.data().iamge_2}
//                                                 iamge_3={item.data().iamge_3}
//                                                 iamge_4={item.data().iamge_4}
//                                                 brand={item.data().brand}
//                                                 caseSize={item.data().caseSize}
//                                                 caseMaterial={item.data().caseMaterial}
//                                                 lugsWidth={item.data().lugsWidth}
//                                                 mechanism={item.data().mechanism}
//                                                 cost={item.data().cost}
//                                                 timeStamp={item.data().timeStamp}
//                                                 postId={item.id}
//                                                 likes={item.data().likes}
//                                                 userIdNumber={item.data().userIdNumber}
//                                                 // userDetails={item.data().uid}
//                                                 comments={item.data().comments}
//                                                 approved={''}
//                                                 onApprove={function (): void {
//                                                     throw new Error('Function not implemented.');
//                                                 }} onReject={function (): void {
//                                                     throw new Error('Function not implemented.');
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </View>
//                             }
//                         </View>
//                         :
//                         <View>
//                             <FlatList
//                                 data={approvedPost}
//                                 renderItem={
//                                     ({ item }) => <Rendering
//                                         message={item.data().message}
//                                         name={item.data().userName}
//                                         iamge_1={item.data().iamge_1}
//                                         iamge_2={item.data().iamge_2}
//                                         iamge_3={item.data().iamge_3}
//                                         iamge_4={item.data().iamge_4}
//                                         brand={item.data().brand}
//                                         caseSize={item.data().caseSize}
//                                         caseMaterial={item.data().caseMaterial}
//                                         lugsWidth={item.data().lugsWidth}
//                                         mechanism={item.data().mechanism}
//                                         cost={item.data().cost}
//                                         timeStamp={item.data().timeStamp}
//                                         postId={item.id}
//                                         likes={item.data().likes}
//                                         userIdNumber={item.data().userIdNumber}
//                                         // userDetails={item.data().uid}
//                                         comments={item.data().comments}
//                                         approved={''}
//                                         onApprove={function (): void {
//                                             throw new Error('Function not implemented.');
//                                         }} onReject={function (): void {
//                                             throw new Error('Function not implemented.');
//                                         }}
//                                     />
//                                 }
//                             />
//                         </View>

//                     }
//                 </View>
//             </View>
//         </SafeAreaView>
//     )
// }

// export default NestedScreen

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         display: 'flex',
//         backgroundColor: 'white',
//     },
//     headerContainter: {
//         paddingBottom: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: 'grey'
//     },
//     text: {
//         paddingTop: 5,
//         marginLeft: 5,
//         color: '#000',
//         fontWeight: '700',
//         fontSize: 18,
//     },
//     textSmall: {
//         // paddingTop: 5,
//         marginLeft: 5,
//         color: '#000',
//         fontWeight: '700',
//         fontSize: 15,
//     },
//     container: {
//         flex: 1,
//     },
//     header: {
//         flex: 0.5
//     },
//     approvedPosts: {
//         flex: 2
//     },
//     goBackButton: {
//         backgroundColor: 'red',
//         // borderRadius: 10,
//         marginRight: 5,
//         borderBottomLeftRadius: 5,
//         borderBottomRightRadius: 5,
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingTop: 2,
//     },
//     goBackText: {
//         color: 'white',
//         fontWeight: 'bold',
//         paddingTop: 3,
//         fontSize: 20,
//     },
//     saleFilter: {
//         paddingLeft: 10,
//         margin: -10,
//         flexDirection: 'row',
//         marginTop: 2
//     },
//     filterText: {
//         fontWeight: 'bold',
//         marginLeft: 10,
//         marginTop: 4,
//         fontSize: 15,
//         width: 30,
//     },
//     filterButton: {
//         marginLeft: 5,
//         backgroundColor: '#44D0DF',
//         borderRadius: 5,
//         margin: 5,
//     },
//     filterButtonText: {
//         paddingLeft: 5,
//         paddingRight: 5,
//         fontWeight: 'bold',
//         color: 'white'
//     },
//     showInfo: {
//         marginBottom: 10,
//     },
//     buttonSmall: {
//         backgroundColor: "#44D0DF",
//         // minWidth: 100,
//         // marginLeft: 'auto',
//         // marginRight: 'auto',
//         width: '40%',

//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 2.5,
//         borderRadius: 5,
//         marginVertical: 2,
//     },
//     buttonSmallHilight: {
//         backgroundColor: "orange",
//         // minWidth: 100,
//         // marginLeft: 'auto',
//         // marginRight: 'auto',
//         width: '40%',

//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 2.5,
//         borderRadius: 5,
//         marginVertical: 2,
//     },
//     button: {
//         // backgroundColor: 'red',
//         backgroundColor: "#44D0DF",
//         // minWidth: 100,
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         width: '98%',

//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 2.5,
//         borderRadius: 5,
//         marginVertical: 2,
//     },


// })