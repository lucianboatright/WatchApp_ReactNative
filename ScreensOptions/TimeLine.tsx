import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Pressable } from 'react-native';
// import { Button } from '../Components/Inputs';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList } from 'react-native-gesture-handler';
import { Rendering } from '../Components/Rendering';

import { WatchList } from '../Components/DataLists';
import { WatchScrollList } from '../Components/Inputs';
import watchNamesList from '../Components/DataLists/watchMakes';

import { fullList } from '../Components/DataLists/fullList'
import { stringify } from '@firebase/util';

const App: FC = (props) => {

    const [approvedPost, setApprovedPosts] = useState<any>(null)
    const [filteredPost, setFilteredPosts] = useState<any>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    const [userId, setUserId] = useState<any>(null)
    const [watchFilter, setWatchFilter] = useState<any>(null)
    const [keyFilter, setKeyfilter] = useState<any>(null)
    const [condition, setCondition] = useState<any>(null)

    const [startFilter, setStartFilter] = useState<boolean>(false)
    const [forSaleFilter, setForSaleFilter] = useState<boolean>(false)
    const [notForSaleFilter, setNotForSaleFilter] = useState<boolean>(false)
    const [openBoxContainer, setOpenBoxContainer] = useState<boolean>(false)
    const [colomns, setColomns] = useState<number>(2)


    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({ id: user.id, ...user.data() })
        setUserId(user.id)
    }

    const getApprovedPosts = async () => {
        firebase.firestore().collection('posts').onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
        })
    }

    const changeFilter = async (name: string) => {
        setStartFilter(true)
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

    const changeView = async () => {
        console.log('clicked')
        // if (colomns === 1) {
        //     setColomns(2)
        // } else {
        //     setColomns(1)
        // }
    }

    // const changeBoxView = async (openBox: boolean) => {
    //     setOpenBoxContainer(openBox)
    //     if (openBox) {
    //         setColomns(1)
    //     }
    //     setColomns(2)
    //     console.log('hey', openBox)
    // }

    const forYear = async () => {
        // console.log(watchNamesList)
        console.log('starting')
        // const finList: { id: number; name: any; color: string; }[] = []
        // let count = 0

        // watchNamesList.forEach((item: any) => {
        //     finList.push({
        //         "id": count,
        //         'name': item,
        //         'color': 'orange'
        //     })
        //     count += 1
        // })
        // console.log(JSON.stringify(finList))
        const finList: { id: number; year: number; }[] = []
        let count = 1900
        let setyear = 1900
        if (count < 2022)
            watchNamesList.forEach((item: any) => {
                finList.push({
                    id: count,
                    year: setyear
                })
                count += 1
                setyear += 1
            })
        console.log(JSON.stringify(finList))

    }

    const testing = () => {
        // console.log('WATCH FILTER', watchFilter)
        // console.log('WatchDOcs', approvedPost[0].data().comments)
        console.log('opening', openBoxContainer)
    }

    const clearWatchFilter = () => {
        setWatchFilter(null)
        setFilteredPosts(null)
        setForSaleFilter(false)
        setNotForSaleFilter(false)
        setStartFilter(false)
        setOpenBoxContainer(false)
    }

    useEffect(() => {
        getUserDetails()
        getApprovedPosts()
        getFilteredPosts()
    }, [watchFilter, startFilter, notForSaleFilter, forSaleFilter])
    return (
        <View style={styles.container}>
            <WatchScrollList inportData={WatchList} bgcolor={'orange'} sendFilter={(name: string) => changeFilter(name)} />
            <TouchableOpacity style={styles.button} onPress={clearWatchFilter}>
                <Text style={styles.text}>Clear Filter</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={forSaleFilter === true ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterForSale}>
                    <Text style={styles.text}>For Sale </Text>
                </TouchableOpacity>
                <TouchableOpacity style={notForSaleFilter === true ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterNotForSale}>
                    <Text style={styles.text}>Not for Sale</Text>
                </TouchableOpacity>
            </View>
            <Button style={styles.button} title='TESTING' onPress={forYear} />
            <View style={styles.approvedPosts}>
                {startFilter ?
                    <View>
                        {filteredPost.length === 0 ?
                            <View>
                                <Text style={styles.NoWatches}>Be the first to add a {watchFilter}</Text>
                                <FlatList
                                    data={approvedPost}
                                    numColumns={openBoxContainer ? 1 : 2}
                                    key={openBoxContainer ? 1 : 2}
                                    renderItem={
                                        ({ item }) => <Rendering
                                            // onPress={() => setOpenBoxContainer(!openBoxContainer)}
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
                                    numColumns={openBoxContainer ? 1 : 2}
                                    key={openBoxContainer ? 1 : 2}
                                    renderItem={
                                        ({ item }) => <Rendering
                                            // onPress={() => setOpenBoxContainer(!openBoxContainer)}
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
                    <View style={styles.test}>
                        <TouchableOpacity onPress={() => changeView()}></TouchableOpacity>
                        <FlatList
                            data={approvedPost}
                            // contentContainerStyle={{ alignSelf: 'flex-start' }}
                            // numColumns={Math.ceil(2)}
                            // showsVerticalScrollIndicator={false}
                            // showsHorizontalScrollIndicator={false}
                            // numColumns={1}
                            // key={1}
                            numColumns={1}
                            key={1}
                            style={styles.grid}
                            renderItem={
                                ({ item }) => <TouchableOpacity onPress={() => console.log('WEEEEEHAAA')}><Rendering
                                    // sendBoxOpening={(openBox: boolean) => changeBoxView(openBox)}
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
                                    }} userDetails={undefined}
                                />
                                </TouchableOpacity>
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
    test: {
    },
    container: {
        flex: 1,
        marginTop: 10,
    },
    header: {
        flex: 0.1
    },
    approvedPosts: {
        flex: 1
    },

    grid: {
        paddingLeft: 4,
        // marginLeft: 'auto',
        // justifyContent: 'center',
        // marginRight: 'auto',
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
        padding: 2.5,
        borderRadius: 5,
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
        padding: 2.5,
        borderRadius: 5,
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
        borderRadius: 5,
        marginVertical: 2,
    },
})