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

interface Watch {
    data: () => WatchData;

}

interface WatchData {
    cost: string;
}

const App: React.FC<Props> = ({ route, navigation }) => {

    const { id } = route.params
    const { name } = route.params

    const auth = getAuth()
    const authUser = auth.currentUser?.uid
    const displayName = auth.currentUser?.displayName

    const [userDetails, setUserDetails] = useState<any>(null)
    const [userEmail, setUserEmail] = useState<string>('')
    const [userName, setUserName] = useState<any>(null)
    const [approvedPost, setApprovedPosts] = useState<any | null>(null)
    const [watchNumber, setWatchNumber] = useState<number>(0)
    const [forSaleCount, setForSaleCount] = useState<number>(0)
    const [notForSaleCount, setNotForSaleCount] = useState<number>(0)

    const [userPic, setUserPic] = useState<any | null>(null)

    const [watchFilter, setWatchFilter] = useState<string>('')
    const [startFilter, setStartFilter] = useState<boolean>(false)
    const [forSaleFilter, setForSaleFilter] = useState<boolean>(false)
    const [notForSaleFilter, setNotForSaleFilter] = useState<boolean>(false)
    const [followersList, setFollowersList] = useState<any | null>(null)
    const [followingList, setFollowingList] = useState<any | null>(null)
    const [followerLength, setFollowerLength] = useState<number>(0)
    const [followingLength, setFollowingLength] = useState<number>(0)
    const [isFollowing, setIsFollowing] = useState<any>(null)

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

    const getApprovedPosts = async () => {
        firebase.firestore().collection('posts').where('userIdNumber', '==', id).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
            setWatchNumber(documents.length)

            const forSaleInfo = documents.filter((item: WatchData) => item.data().cost != 'Not for sale')
            const notForSaleInfo = documents.filter((item: WatchData) => item.data().cost == 'Not for sale')
            setForSaleCount(forSaleInfo.length)
            setNotForSaleCount(notForSaleInfo.length)
        })
        // runSaleCounter()
    }

    const getFilterForSale = async () => {
        setStartFilter(true)
        if (notForSaleFilter) {
            setNotForSaleFilter(!notForSaleFilter)
            setForSaleFilter(!forSaleFilter)

        } else {
            setForSaleFilter(!forSaleFilter)
        }
    }


    const getFilterNotForSale = async () => {
        setStartFilter(true)
        if (forSaleFilter) {
            setNotForSaleFilter(!notForSaleFilter)
            setForSaleFilter(!forSaleFilter)
        } else {
            setNotForSaleFilter(!notForSaleFilter)
        }
    }

    const clearWatchFilter = () => {
        setForSaleFilter(false)
        setNotForSaleFilter(false)
        setStartFilter(false)
    }

    const runFilters = (approvedPost: Watch) => {
        if (forSaleFilter && approvedPost.data().cost != 'Not for sale') {
            return false
        }
        if (notForSaleFilter && approvedPost.data().cost === 'Not for sale') {
            return false
        }
        return true
    }

    useEffect(() => {
        if (approvedPost == null) {
            getApprovedPosts()
            getUserDetails()
        } else {
            getUserDetails()
        }
    }, [startFilter, forSaleCount])

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerInfo}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.infoTextHighlight}>User Name :</Text>
                                <Text style={styles.infoText}>{userName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '50%' }}>
                                <Text style={styles.infoTextHighlight}>User Email :</Text>
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
                                    {userPic ? <Image style={{ height: 100, width: 100, marginTop: '-5%' }} source={userPic} /> : <Image style={{ height: 100, width: 100, marginTop: '-5%' }} source={require('../assets/icons/profileIcon.png')} />}
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
                    <View>
                        <View style={styles.followingContainer}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.infoText}>Following:  {followingLength}</Text>
                                {followingLength != 0 ? <ScrollWithLink inportData={followingList} bgcolor={'#815839'} /> : <Text style={styles.infoText}>Not Following</Text>}

                                <Text style={styles.infoText}>Followers:  {followerLength}</Text>
                                {followerLength != 0 ? <ScrollWithLink inportData={followersList} bgcolor={'#815839'} /> : <Text style={styles.infoText}>No Followers</Text>}
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
                    {approvedPost ?
                        <View >
                            <FlatList
                                data={approvedPost.filter(runFilters).length > 0 ? approvedPost.filter(runFilters) : approvedPost}
                                numColumns={2}
                                columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                                renderItem={
                                    ({ item }) => <Rendering
                                        {...item.data()}
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
                            <Text>Loading</Text>
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
        flex: 0.45,
        paddingLeft: 5,
        backgroundColor: "#EAE8E3",
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        padding: 5,
        borderColor: '#CDC9BC',
        borderWidth: 0.5,
    },
    profileImageBox: {
        flexDirection: 'row',
        height: 1,
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    approvedPosts: {
        marginLeft: 5,
        marginRight: 5,
        flex: 1,
    },
    button: {
        backgroundColor: "#143642",
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
        backgroundColor: "#4A473E",
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',
        color: 'white',
        // fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius: 5,
        marginVertical: 2,
    },
    buttonSmallHilight: {
        backgroundColor: "#2A6F97",
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
        backgroundColor: '#B76935',
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
        fontFamily: 'NunitoBold',
    },
    infoText: {
        color: '#143642',
        marginLeft: 5,
        fontFamily: 'NunitoBold',
        fontSize: 15,
    },
    infoTextHighlight: {
        marginLeft: 5,
        fontFamily: 'NunitoBold',
        fontSize: 15,
        color: "#143642",
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
    divider: {
    },
})
