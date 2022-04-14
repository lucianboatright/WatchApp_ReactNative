import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { FilterLines, FollowButton, WatchScrollList } from '../Components/Inputs';

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { FlatList } from 'react-native-gesture-handler';
import { getAuth, signOut } from 'firebase/auth';
import { Rendering } from '../Components/Rendering';

interface Props {
    id: any;
    name: any;
}

const NestedScreen: React.FC<Props> = ({ route, navigation }) => {

    const { id } = route.params
    const { name } = route.params


    const [approvedPost, setApprovedPosts] = useState<any>(null)
    const [userId, setUserId] = useState<any>(null)
    const [watchNumber, setWatchNumber] = useState<any>(null)
    const [filteredPost, setFilteredPosts] = useState<any>(null)
    const [watchFilter, setWatchFilter] = useState<any>(null)


    const [startFilter, setStartFilter] = useState<boolean>(false)
    const [forSaleFilter, setForSaleFilter] = useState<boolean>(false)
    const [notForSaleFilter, setNotForSaleFilter] = useState<boolean>(false)
    const [userDetials, setUserDetails] = useState<any>(null)
    const [watchesForSale, setWatchesForSale] = useState<number>(0)
    const [watchesNotForSale, setWatchesNotForSale] = useState<number>(0)
    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [followerArray, setFollowerArray] = useState<any>(null)
    console.log('isfollowing2', isFollowing)


    let saleItems = 0
    let notSaleItem = 0

    const auth = getAuth()
    const user = auth.currentUser?.uid

    const getPostsandUserInfo = async () => {
        firebase.firestore().collection('posts').where('userIdNumber', '==', id).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
            setWatchNumber(documents.length)
        })
        const userDeta = await firebase.firestore().collection('users').doc(id).get();
        setUserDetails(userDeta)
        getWatchSale()
        getFollowers()
        console.log('user', userDeta.data().followers)
        setFollowerArray(userDeta.data().followers)
    }

    const getWatchSale = async () => {
        approvedPost.forEach((item: { data: () => { (): any; new(): any; cost: string; }; }) => {
            if (item.data().cost === 'Not for sale') {
                notSaleItem += 1
            } else if (item.data().cost !== 'Not for sale') {
                saleItems += 1

            }
        })
        setWatchesForSale(saleItems)
        setWatchesNotForSale(notSaleItem)

    }
    // console.log('isfollowing', isFollowing)

    const getFollowers = async () => {
        if (followerArray.includes((e: { followerId: string | undefined; }) => e.followerId === user)) {
            setIsFollowing(true)
        }
    }
    const testing = () => {
        console.log('FOORR SSAALLEE', watchesForSale)
        console.log('NNOOTT FOORR SSAALLEE', watchesNotForSale)

    }

    const changeFilter = (name: string) => {
        console.log(name)
        setStartFilter(true)
        setWatchFilter(name);
        // setKeyfilter('brand')
        getFilteredPosts();
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
        } else if (notForSaleFilter && !watchFilter) {
            const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
        } else {
            const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().brand == watchFilter)
            setFilteredPosts(filtered)
        }
    }

    // const setForSaleFilter = () => {
    //     const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; cost: string; }; }) => item.data().cost != 'Not for sale')
    //     setFilteredPosts(filtered)
    //     setFilterSwitch(true)
    // }

    // const setNotForSaleFilter = () => {
    //     const filtered = approvedPost.filter((item: { data: () => { (): any; new(): any; cost: string; }; }) => item.data().cost == 'Not for sale')
    //     setFilteredPosts(filtered)
    //     setFilterSwitch(true)
    // }

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
        getPostsandUserInfo()
        getFilteredPosts()
        // getWatchSale()
    }, [userId, startFilter, notForSaleFilter, forSaleFilter])

    return (
        <View style={styles.screen}>
            <View style={styles.headerContainter}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{name}'s Watch Box</Text>
                    <FollowButton authUser={user} isFollowing={isFollowing} postUser={id} />
                    <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.goBackText}>{"<-"} Back</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>They currently have {watchNumber >= 2 ? `${watchNumber} watches` : `${watchNumber} watch`}</Text>
                <TouchableOpacity style={styles.button} onPress={clearWatchFilter}>
                    <Text style={styles.filterButtonText}>Clear Filter</Text>
                </TouchableOpacity>
                <View style={styles.showInfo}>
                    <View style={styles.saleFilter}>
                        <Text style={styles.filterText}>{watchesForSale}  : </Text>
                        <TouchableOpacity style={forSaleFilter === true ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterForSale}>
                            <Text style={styles.filterButtonText}>View For Sale</Text>
                        </TouchableOpacity>
                        {/* <Button title='View For Sale' onPress={setForSaleFilter} /> */}
                    </View>
                    <View style={styles.saleFilter}>
                        <Text style={styles.filterText}>{watchesNotForSale}  : </Text>
                        <TouchableOpacity style={notForSaleFilter === true ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterNotForSale}>
                            <Text style={styles.filterButtonText}>View Not For Sale</Text>
                        </TouchableOpacity>
                        {/* <Button style={styles.filterButton} title='View Not For Sale' onPress={setNotForSaleFilter} /> */}
                    </View>
                </View>
                {/* <WatchScrollList sendWatchFilter={(name: string) => changeFilter(name)} /> */}
            </View>
            <View style={styles.approvedPosts}>
                {startFilter ?
                    <View>
                        {filteredPost.length === 0 ?
                            <View>
                                <Text style={styles.NoWatches}>Be the first to add a {watchFilter}</Text>
                                <FlatList
                                    data={approvedPost}
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
                                            userIdNumber={item.data().userIdNumber}
                                            // userDetails={item.data().uid}
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
                                    data={filteredPost}
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
                                            userIdNumber={item.data().userIdNumber}
                                            // userDetails={item.data().uid}
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
                                    userIdNumber={item.data().userIdNumber}
                                    // userDetails={item.data().uid}
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
    )
}

export default NestedScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
    },
    headerContainter: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    text: {
        paddingTop: 5,
        marginLeft: 5,
        color: '#000',
        fontWeight: '700',
        fontSize: 20,
    },
    container: {
        flex: 1,
    },
    header: {
        flex: 0.5
    },
    approvedPosts: {
        flex: 2
    },
    goBackButton: {
        backgroundColor: 'red',
        // borderRadius: 10,
        marginRight: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    goBackText: {
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 3,
    },
    saleFilter: {
        paddingLeft: 10,
        margin: -10,
        flexDirection: 'row',
        marginTop: 2
    },
    filterText: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 4,
        fontSize: 15,
        width: 30,
    },
    filterButton: {
        marginLeft: 5,
        backgroundColor: '#44D0DF',
        borderRadius: 5,
        margin: 5,
    },
    filterButtonText: {
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: 'bold',
        color: 'white'
    },
    showInfo: {
        marginBottom: 10,
    },
    buttonSmall: {
        backgroundColor: "#44D0DF",
        // minWidth: 100,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        width: '40%',

        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius: 5,
        marginVertical: 2,
    },
    buttonSmallHilight: {
        backgroundColor: "orange",
        // minWidth: 100,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        width: '40%',

        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius: 5,
        marginVertical: 2,
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
        borderRadius: 5,
        marginVertical: 2,
    },


})