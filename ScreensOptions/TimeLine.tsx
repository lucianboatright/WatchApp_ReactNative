import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Pressable } from 'react-native';
// import { Button } from '../Components/Inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList } from 'react-native-gesture-handler';
import { Rendering } from '../Components/Rendering';

import { CaseSize, Mechanism, Styles, WatchList } from '../Components/DataLists';
import { WatchScrollList } from '../Components/Inputs';
import watchNamesList from '../Components/DataLists/watchMakes';

// import { fullList } from '../Components/DataLists/fullList'
// import { stringify } from '@firebase/util';

const App: FC = (props) => {

    const [approvedPost, setApprovedPosts] = useState<any | null>(null)
    const [filteredPost, setFilteredPosts] = useState<any | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    const [userId, setUserId] = useState<any>(null)
    const [watchFilter, setWatchFilter] = useState<string | null>('')
    const [watchCaseFilter, setWatchCaseFilter] = useState<string | null>('')
    const [watchMechanismFilter, setWatchMechanismFilter] = useState<string | null>('')
    const [watchTypeFilter, setWatchTypeFilter] = useState<string | null>('')

    const [keyFilter, setKeyfilter] = useState<any>(null)
    const [condition, setCondition] = useState<any>(null)

    const [filterLength, setFilterLength] = useState<number>(0)


    const [startFilter, setStartFilter] = useState<boolean>(false)
    const [forSaleFilter, setForSaleFilter] = useState<boolean>(false)
    const [notForSaleFilter, setNotForSaleFilter] = useState<boolean>(false)
    const [openBoxContainer, setOpenBoxContainer] = useState<boolean>(false)
    const [colomns, setColomns] = useState<number>(2)

    const [forSaleCount, setForSaleCount] = useState<any>(null)
    const [notForSaleCount, setNotForSaleCount] = useState<any>(null)


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
        // runSaleCounter()
    }

    // const runSaleCounter = async () => {
    //     const forSale = await approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost != 'Not for sale')
    //     const notForSale = await approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost == 'Not for sale')
    //     setForSaleCount(forSale)
    //     setNotForSaleCount(notForSale)
    // }

    const changeFilterWatch = async (name: string) => {
        setStartFilter(true)
        setWatchFilter(name);
        getFilteredPostsWatch();
    }
    const changeFilterCase = async (name: string) => {
        setStartFilter(true)
        setWatchCaseFilter(name);
        getFilteredPostsWatchCase(name);
    }
    const changeFilterMechanism = async (name: string) => {
        setStartFilter(true)
        setWatchMechanismFilter(name);
        getFilteredPostsMechanism(name);
    }
    const changeFilterType = async (name: string) => {
        setStartFilter(true)
        setWatchTypeFilter(name);
        getFilteredPostsWatchType(name);
    }
    const getFilterForSale = async () => {
        setStartFilter(true)
        if (notForSaleFilter) {
            // console.log('pre for sale', forSaleFilter)
            setNotForSaleFilter(!notForSaleFilter)
            setForSaleFilter(!forSaleFilter)
        }
        setForSaleFilter(!forSaleFilter)
    }
    // console.log('post for sale', forSaleFilter)


    const getFilterNotForSale = async () => {
        setStartFilter(true)
        // if (!watchCaseFilter && !watchMechanismFilter && !watchFilter && !watchTypeFilter) {
        //     getForSaleFilter()
        // }
        if (forSaleFilter) {
            setNotForSaleFilter(!notForSaleFilter)
            setForSaleFilter(!forSaleFilter)
        }
        setNotForSaleFilter(!notForSaleFilter)
    }


    const getFilteredPostsWatch = async () => {
        if (filterLength > 0) {
            if (forSaleFilter && watchFilter) {
                const filtered = await filteredPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) =>
                        item.data().brand == watchFilter
                        &&
                        item.data().cost != 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else if (forSaleFilter && !watchFilter) {
                const filtered = await filteredPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) =>
                        item.data().cost != 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else if (notForSaleFilter && watchFilter) {
                const filtered = await filteredPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) =>
                        item.data().brand == watchFilter && item.data().cost == 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)

            } else if (notForSaleFilter && !watchFilter) {
                const filtered = await filteredPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) =>
                        item.data().cost == 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else {
                const filtered = await filteredPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) =>
                        item.data().brand == watchFilter)
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            }
        }
        if (forSaleFilter && watchFilter) {
            const filtered = await approvedPost.filter(
                (item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) =>
                    item.data().brand == watchFilter
                    &&
                    item.data().cost != 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (forSaleFilter && !watchFilter) {
            const filtered = await approvedPost.filter(
                (item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) =>
                    item.data().cost != 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (notForSaleFilter && watchFilter) {
            const filtered = await approvedPost.filter(
                (item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) =>
                    item.data().brand == watchFilter && item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)

        } else if (notForSaleFilter && !watchFilter) {
            const filtered = await approvedPost.filter(
                (item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) =>
                    item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else {
            const filtered = await approvedPost.filter(
                (item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) =>
                    item.data().brand == watchFilter)
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        }
    }
    const getFilteredPostsWatchCase = async (name: string) => {
        if (filterLength > 0) {
            if (forSaleFilter && name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; caseSize: string; cost: string; }; }) => item.data().caseSize == name && item.data().cost != 'Not for sale')
                await setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else if (forSaleFilter && !name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; caseSize: string; cost: string; }; }) => item.data().cost != 'Not for sale')
                await setFilteredPosts(filtered)
                setFilterLength(filtered.length)
                console.log(filtered.length)
            } else if (notForSaleFilter && name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; caseSize: string; cost: string; }; }) => item.data().caseSize == name && item.data().cost == 'Not for sale')
                await setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else if (notForSaleFilter && !name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; caseSize: string; cost: string; }; }) => item.data().cost == 'Not for sale')
                await setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; caseSize: string; cost: string; }; }) => item.data().caseSize == name)
                await setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            }
        }
        if (forSaleFilter && name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; caseSize: string; cost: string; }; }) => item.data().caseSize == name && item.data().cost != 'Not for sale')
            await setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (forSaleFilter && !name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; caseSize: string; cost: string; }; }) => item.data().cost != 'Not for sale')
            await setFilteredPosts(filtered)
            setFilterLength(filtered.length)
            console.log(filtered.length)
        } else if (notForSaleFilter && name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; caseSize: string; cost: string; }; }) => item.data().caseSize == name && item.data().cost == 'Not for sale')
            await setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (notForSaleFilter && !name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; caseSize: string; cost: string; }; }) => item.data().cost == 'Not for sale')
            await setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; caseSize: string; cost: string; }; }) => item.data().caseSize == name)
            await setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        }
    }
    const getFilteredPostsMechanism = async (name: string) => {
        // console.log('I am being clicked')
        if (filterLength > 0) {
            console.log('here i am now')
            if (forSaleFilter && name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; mechanism: string; cost: string; }; }) => item.data().mechanism == name && item.data().cost != 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else if (forSaleFilter && !name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; mechanism: string; cost: string; }; }) => item.data().cost != 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else if (notForSaleFilter && name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; mechanism: string; cost: string; }; }) => item.data().mechanism == name && item.data().cost == 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else if (notForSaleFilter && !name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; mechanism: string; cost: string; }; }) => item.data().cost == 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; mechanism: string; cost: string; }; }) => item.data().mechanism == name)
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            }
        }
        if (forSaleFilter && name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; mechanism: string; cost: string; }; }) => item.data().mechanism == name && item.data().cost != 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (forSaleFilter && !name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; mechanism: string; cost: string; }; }) => item.data().cost != 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (notForSaleFilter && name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; mechanism: string; cost: string; }; }) => item.data().mechanism == name && item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (notForSaleFilter && !name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; mechanism: string; cost: string; }; }) => item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; mechanism: string; cost: string; }; }) => item.data().mechanism == name)
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        }
    }
    const getFilteredPostsWatchType = async (name: string) => {
        // console.log('I am being clicked')
        if (filterLength > 0) {
            if (forSaleFilter && name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().watchStyle == name && item.data().cost != 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else if (forSaleFilter && !name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().cost != 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else if (notForSaleFilter && name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().watchStyle == name && item.data().cost == 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else if (notForSaleFilter && !name) {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().cost == 'Not for sale')
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else {
                const filtered = await filteredPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().watchStyle == name)
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            }
        }
        if (forSaleFilter && name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().watchStyle == name && item.data().cost != 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (forSaleFilter && !name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().cost != 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (notForSaleFilter && name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().watchStyle == name && item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (notForSaleFilter && !name) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().watchStyle == name)
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        }
    }

    const getForSaleFilter = async () => {
        console.log('im HEEERRREEE')
        console.log('for sale', forSaleFilter)
        console.log('NOT for sale', notForSaleFilter)
        if (forSaleFilter) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().cost != 'Not for sale')
            setFilteredPosts(filtered)
        } else if (forSaleFilter) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().cost != 'Not for sale')
            setFilteredPosts(filtered)
        } else if (notForSaleFilter) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
        } else if (notForSaleFilter) {
            const filtered = await approvedPost.filter((item: { data: () => { (): any; new(): any; watchStyle: string; cost: string; }; }) => item.data().cost == 'Not for sale')
            setFilteredPosts(filtered)
        }
    }

    const changeView = async () => {
        console.log('clicked')
    }

    const testing = () => {
        // console.log('WATCH FILTER', filteredPost.length)
        // console.log('WatchDOcs', filteredPost[0].data().watchStyle)
        // console.log('WatchDOcs', filteredPost.length)
        console.log(filterLength)
        // console.log(filteredPost)
        // console.log(approvedPost)
        // console.log('opening', openBoxContainer)
    }

    const clearWatchFilter = () => {
        setWatchFilter('')
        setFilteredPosts(null)
        setWatchCaseFilter('')
        setWatchMechanismFilter('')
        setWatchTypeFilter('')
        setForSaleFilter(false)
        setNotForSaleFilter(false)
        setStartFilter(false)
        setOpenBoxContainer(false)
        setFilterLength(0)
    }

    useEffect(() => {
        getUserDetails()
        getApprovedPosts()
        // getFilteredPostsWatch()
    }, [watchFilter, startFilter, notForSaleFilter, forSaleFilter, filteredPost])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelText}>
                        Brand:
                    </Text>
                    {watchFilter ?
                        <Text style={styles.selectedFilter}>
                            {watchFilter}
                        </Text>
                        :
                        null
                    }
                    <WatchScrollList inportData={WatchList} bgcolor={'orange'} sendFilter={(name: string) => changeFilterWatch(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelText}>
                        Case Size:
                    </Text>
                    {watchCaseFilter ?
                        <Text style={styles.selectedFilter}>
                            {watchCaseFilter}
                        </Text>
                        :
                        null
                    }
                    <WatchScrollList inportData={CaseSize} bgcolor={'orange'} sendFilter={(name: string) => changeFilterCase(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelText}>
                        Mechanism:
                    </Text>
                    {watchMechanismFilter ?
                        <Text style={styles.selectedFilter}>
                            {watchMechanismFilter}
                        </Text>
                        :
                        null
                    }
                    <WatchScrollList inportData={Mechanism} bgcolor={'orange'} sendFilter={(name: string) => changeFilterMechanism(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelText}>
                        Type:
                    </Text>
                    {watchTypeFilter ?
                        <Text style={styles.selectedFilter}>
                            {watchTypeFilter}
                        </Text>
                        :
                        null
                    }
                    <WatchScrollList inportData={Styles} bgcolor={'orange'} sendFilter={(name: string) => changeFilterType(name)} />
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

                <Button style={styles.button} title='TESTING' onPress={testing} />
                <View style={styles.approvedPosts}>
                    {startFilter ?
                        <View>
                            {filterLength === 0 ?
                                <View style={styles.test}>
                                    <Text style={{ fontSize: 20, margin: 2, fontFamily: 'NunitoBold', textAlign: 'center', color: "#44D0DF" }}> Nothing with the Filter Selected </Text>
                                    <FlatList
                                        data={approvedPost}
                                        keyExtractor={(item, index) => item + index}

                                        // contentContainerStyle={{ alignSelf: 'flex-start' }}
                                        // numColumns={Math.ceil(2)}
                                        // showsVerticalScrollIndicator={false}
                                        // showsHorizontalScrollIndicator={false}
                                        // numColumns={1}
                                        // key={1}
                                        // numColumns={openBoxContainer ? 1 : 2}
                                        // key={openBoxContainer ? 1 : 2}
                                        // style={styles.grid}
                                        // contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                                        renderItem={
                                            ({ item }) => <Rendering
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
                                                postId={item.data().id}
                                                year={item.data().year}
                                                watchStyle={item.data().watchStyle}
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
                                        }
                                    />
                                </View>
                                :
                                <View style={styles.test}>
                                    <Text style={{ fontSize: 20 }}> something with the Filter { }</Text>
                                    <FlatList
                                        data={filteredPost}
                                        keyExtractor={(item, index) => item + index}
                                        // contentContainerStyle={{ alignSelf: 'flex-start' }}
                                        // numColumns={Math.ceil(2)}
                                        // showsVerticalScrollIndicator={false}
                                        // showsHorizontalScrollIndicator={false}
                                        // numColumns={1}
                                        // key={1}
                                        // numColumns={openBoxContainer ? 1 : 2}
                                        // key={openBoxContainer ? 1 : 2}
                                        // style={styles.grid}
                                        // contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                                        renderItem={
                                            ({ item }) => <Rendering
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
                                                year={item.data().year}
                                                watchStyle={item.data().watchStyle}
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
                                        }
                                    />
                                </View>
                            }
                        </View>
                        :
                        <View style={styles.test}>
                            {/* <Text>All clear</Text> */}
                            <FlatList
                                data={approvedPost}
                                // contentContainerStyle={{ alignSelf: 'flex-start' }}
                                // numColumns={Math.ceil(2)}
                                // showsVerticalScrollIndicator={false}
                                // showsHorizontalScrollIndicator={false}
                                // numColumns={1}
                                // key={1}
                                // numColumns={openBoxContainer ? 1 : 2}
                                // key={openBoxContainer ? 1 : 2}
                                // style={styles.grid}
                                // numColumns={2}
                                // contentContainerStyle={{ flexDirection: "row" }}
                                keyExtractor={(item, index) => item + index}
                                // horizontal={false}
                                // numColumns={2}
                                // contentContainerStyle={{ flexDirection: 'row', flexWrap: "wrap" }}
                                renderItem={
                                    ({ item }) => <Rendering
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
                                        year={item.data().year}
                                        watchStyle={item.data().watchStyle}
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
        marginLeft: 5,
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
        padding: 0,
        borderRadius: 5,
        marginVertical: 2,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'NunitoBold',
    },
    labelText: {
        fontFamily: 'NunitoBold',
        // flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5
        // minWidth: '19%',
    },
    selectedFilter: {
        fontFamily: 'NunitoBold',
        // flexDirection: 'row',
        // marginLeft: 5,
        minWidth: '10%',
        color: "orange",
        borderColor: "#44D0DF",
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
        // marginTop: 2,
        marginBottom: 2,
        marginRight: 4,
        fontSize: 12,
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
        padding: 0,
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
        padding: 0,
        borderRadius: 5,
        marginVertical: 2,
    },
})