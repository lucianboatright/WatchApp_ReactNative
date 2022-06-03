import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, StatusBar } from 'react-native'
import { FollowButton } from '../Components/Inputs';

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
    const [watchNumber, setWatchNumber] = useState<any>(null)
    const [forSaleCount, setForSaleCount] = useState<number>(0)
    const [notForSaleCount, setNotForSaleCount] = useState<number>(0)

    const [userPic, setUserPic] = useState<any | null>(null)

    const [watchFilter, setWatchFilter] = useState<any>(null)
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
        firebase.firestore().collection('posts').where('userIdNumber', '==', id).onSnapshot(querySnapShot => {
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
        const forSaleInfo = await approvedPost.filter((item: any) => item.data().cost != 'Not for sale')
        const notForSaleInfo = await approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost == 'Not for sale')
        setForSaleCount(forSaleInfo.length)
        setNotForSaleCount(notForSaleInfo.length)
    }


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
        }
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
    }, [startFilter, watchNumber])

    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }} >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerInfo}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.infoTextHighlight}>UserName :</Text>
                                <Text style={styles.infoText}> {name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '50%' }}>
                                <Text style={styles.infoTextHighlight}>User Email : </Text>
                                <Text numberOfLines={1} style={styles.infoText}>{userEmail}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                {/* <Text style={styles.infoText}>{watchNumber}:</Text> */}
                                <Text style={styles.infoText}>{watchNumber}: Currently in Box</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.infoText}>For Sale:</Text>
                                <Text style={styles.infoText}>{forSaleCount}</Text>
                                <Text style={styles.infoText}>& Not for Sale:</Text>
                                <Text style={styles.infoText}> {notForSaleCount}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.profileImageBox}>
                                <View >
                                    {userPic ? <Image style={{ height: 80, width: 80, marginTop: '-5%' }} source={userPic} /> : <Image style={{ height: 80, width: 80, marginTop: '-5%' }} source={require('../assets/icons/profileIcon.png')} />}
                                </View>
                                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                                    <Text style={styles.goBackText}>X</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: '64%' }}>
                                <FollowButton isFollowing={isFollowing} postUser={id} postUserName={name} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.lowerHeader}>
                        <View style={styles.followingContainer}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.infoText}>Following:  {followingLength}</Text>
                                {followerLength == 0 ? <ScrollWithLink inportData={followingList} bgcolor={'#61A5C2'} /> : <Text style={styles.infoText}>Not Following</Text>}
                            </View>
                            <View>
                                <Text style={styles.infoText}>Followers:  {followerLength}</Text>
                                {followingLength == 0 ? <ScrollWithLink inportData={followersList} bgcolor={'#61A5C2'} /> : <Text style={styles.infoText}>No Followers</Text>}
                            </View>
                        </View>
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
                <View style={styles.approvedPosts}>
                    {startFilter ?
                        <View >
                            <FlatList
                                data={approvedPost.filter(runFilters).length > 0 ? approvedPost.filter(runFilters) : approvedPost}
                                // contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                                numColumns={2}
                                columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
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
                                numColumns={2}
                                columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
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
        flex: 0.4,
        paddingLeft: 5,
        backgroundColor: "#C2DFE3",
        // marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        padding: 5,
    },
    // lowerHeader: {
    //     flex: 1
    // },
    profileImageBox: {
        flexDirection: 'row',
        height: 1,
    },
    headerInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    approvedPosts: {
        marginLeft: 5,
        marginRight: 5,
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
        backgroundColor: "#2A6F97",
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
    goBackButton: {
        backgroundColor: 'red',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        marginTop: -5,
        height: 20,
    },
    goBackText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    infoText: {
        color: '#012A4A',
        marginLeft: 5,
        fontFamily: 'NunitoSemiBold',
        fontSize: 15,
    },
    infoTextHighlight: {
        marginLeft: 5,
        fontFamily: 'NunitoSemiBold',
        fontSize: 15,
        maxWidth: 210,
        color: "#013A63",
    },
    NoWatches: {
        fontSize: 25,
        fontFamily: 'NunitoSemiBold',
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    followingContainer: {
        flexDirection: 'row',
    },
})
