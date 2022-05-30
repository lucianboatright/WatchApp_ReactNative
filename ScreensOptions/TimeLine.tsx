import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Pressable } from 'react-native';
// import { Button } from '../Components/Inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList, State } from 'react-native-gesture-handler';
import { Rendering } from '../Components/Rendering';

import { CaseSize, Mechanism, Styles, WatchList } from '../Components/DataLists';
import { FilterLable, WatchScrollList } from '../Components/Inputs';
import watchNamesList from '../Components/DataLists/watchMakes';

// import { fullList } from '../Components/DataLists/fullList'
// import { stringify } from '@firebase/util';

const App: FC = (props) => {

    const [approvedPost, setApprovedPosts] = useState<any | null>(null)
    const [filteredPost, setFilteredPosts] = useState<any | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    const [userId, setUserId] = useState<any>(null)
    const [watchFilter, setWatchFilter] = useState<null>(null)
    const [watchCaseFilter, setWatchCaseFilter] = useState<null>(null)
    const [watchMechanismFilter, setWatchMechanismFilter] = useState<null>(null)
    const [watchTypeFilter, setWatchTypeFilter] = useState<null>(null)

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

    const [testState, setTestState] = useState<any | null>(null)


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

    const getFilterForSale = async () => {
        setStartFilter(true)
        if (notForSaleFilter) {
            setNotForSaleFilter(!notForSaleFilter)
            setForSaleFilter(!forSaleFilter)
            getFilteredPostsWatch()
        } else {
            setForSaleFilter(!forSaleFilter)
            getFilteredPostsWatch()
        }
    }

    const getFilterNotForSale = async () => {
        setStartFilter(true)
        if (forSaleFilter) {
            setNotForSaleFilter(!notForSaleFilter)
            setForSaleFilter(!forSaleFilter)
            getFilteredPostsWatch()
        } else {
            setNotForSaleFilter(!notForSaleFilter)
            getFilteredPostsWatch()
        }
    }

    const runWatchFilter = (name: any) => {
        setStartFilter(true)
        if (watchFilter != null) {
            setWatchFilter(null)
            getFilteredPostsWatch()
        } else if (watchFilter === null) {
            setWatchFilter(name)
            getFilteredPostsWatch()
        }
    }

    const runWatchCaseFilter = (name: any) => {
        setStartFilter(true)
        if (watchCaseFilter != null) {
            setWatchCaseFilter(null)
            getFilteredPostsWatch()
        } else if (watchCaseFilter === null) {
            setWatchCaseFilter(name)
            getFilteredPostsWatch()
        }
    }

    const runWatchMechanismFilter = (name: any) => {
        setStartFilter(true)
        if (watchMechanismFilter != null) {
            setWatchMechanismFilter(null)
            getFilteredPostsWatch()
        } else if (watchMechanismFilter === null) {
            setWatchMechanismFilter(name)
            getFilteredPostsWatch()
        }
    }

    const runWatchTypeFilter = (name: any) => {
        setStartFilter(true)
        if (watchTypeFilter != null) {
            setWatchTypeFilter(null)
            getFilteredPostsWatch()
        } else if (watchTypeFilter != null) {
            setWatchTypeFilter(name)
            getFilteredPostsWatch()
        }
    }

    const getFilteredPostsWatch = async () => {
        console.log('start of filter post')
        // if (forSaleFilter) {
        //     console.log('for sale filter')
        const test: number | null = (0)
        if (forSaleFilter) {
            console.log('for sale')
            if (test === 0) {
                console.log('now here')
                const filtered = await approvedPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().cost == '')
                setTestState(filtered)
                setFilterLength(filtered.length)
                test + 1
            } else {
                console.log('no here instead')
                const filtered = await testState.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().cost == '')
                // setFilteredPosts(filtered)
                setTestState(filtered)
                setFilterLength(filtered.length)
                test + 1
            }
        }

        if (notForSaleFilter) {
            if (testState.length === 0) {
                console.log('Not for sale')
                const filtered = await approvedPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().cost != '')
                // setFilteredPosts(filtered)
                setTestState(testState + filtered)
                setFilterLength(filtered.length)
            } else {
                console.log('Not for sale')
                const filtered = await testState.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().cost != '')
                // setFilteredPosts(filtered)
                setTestState(testState + filtered)
                setFilterLength(filtered.length)
            }
        }

        if (watchFilter != null) {
            console.log('watch filter')
            if (testState.length === 0) {
                const filtered = await approvedPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().brand == watchFilter)
                // setFilteredPosts(filtered)
                setTestState(testState + filtered)
                setFilterLength(filtered.length)
            } else {
                const filtered = await testState.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().brand == watchFilter)
                // setFilteredPosts(filtered)
                setTestState(testState + filtered)
                setFilterLength(filtered.length)
            }
        }

        if (watchCaseFilter != null) {
            console.log('watch case')
            if (testState.length === 0) {
                const filtered = await approvedPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().caseSize == watchCaseFilter)
                // setFilteredPosts(filtered)
                setTestState(testState + filtered)
                setFilterLength(filtered.length)
            } else {
                const filtered = await testState.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().caseSize == watchCaseFilter)
                // setFilteredPosts(filtered)
                setTestState(testState + filtered)
                setFilterLength(filtered.length)
            }
        }

        if (watchMechanismFilter != null) {
            console.log('watch mech')
            if (testState.length === 0) {
                const filtered = await approvedPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().mechanism == watchMechanismFilter)
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else {
                const filtered = await testState.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().mechanism == watchMechanismFilter)
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            }
        }

        if (watchTypeFilter != null) {
            console.log('watch type')
            if (testState.length === 0) {
                const filtered = await approvedPost.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().watchStyle == watchTypeFilter)
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            } else {
                const filtered = await testState.filter(
                    (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => item.data().watchStyle == watchTypeFilter)
                setFilteredPosts(filtered)
                setFilterLength(filtered.length)
            }
        }

        setFilteredPosts(testState)


        // (watchCaseFilter != null ? item.data().caseSize == watchCaseFilter : null)

        // (watchMechanismFilter != null ? item.data().mechanism == watchMechanismFilter : null)

        // (watchTypeFilter != null ? item.data().watchStyle == watchTypeFilter : null)

        // item.data().cost !== 'Not for sale'

        // console.log('for SALE filtered posts ', testState)
    }

    const testing = () => {
        // console.log('approved post', filteredPost)
        // console.log('filtered function', typeof (filteredPost))
        // console.log('approved post', approvedPost[1])
        // console.log('filtered function', typeof (approvedPost))
        console.log('START FILTER', startFilter)
        console.log('filtered function', testState)
        // console.log('filtered function', testState[-1])
        // console.log('length', testState.length)
        // console.log('WATCH FILTER', filteredPost.length)
        // console.log('WatchDOcs', filteredPost[0].data().watchStyle)
        // console.log('WatchDOcs', filteredPost.length)
        // console.log(filterLength)
        // console.log(filteredPost)
        //     console.log(forSaleFilter)
        //     console.log('brand', watchFilter)
        //     console.log('case', watchCaseFilter)
        //     console.log('style', watchTypeFilter)
        //     console.log('mech', watchMechanismFilter)
        //     console.log('for sale', forSaleFilter)
        //     console.log('NOT for sale', notForSaleFilter)
    }
    const testing2 = () => {
        console.log('filtered function', testState)
        setTestState('')
    }

    const clearWatchFilter = () => {
        setFilterLength(0)
        setWatchFilter(null)
        setFilteredPosts(null)
        setWatchCaseFilter(null)
        setWatchMechanismFilter(null)
        setWatchTypeFilter(null)
        setForSaleFilter(false)
        setNotForSaleFilter(false)
        setStartFilter(false)
        // setOpenBoxContainer(false)
    }

    const clearBandFilter = () => {
        setWatchFilter(null)
        setWatchCaseFilter(null)
        setWatchMechanismFilter(null)
        setWatchTypeFilter(null)
    }

    useEffect(() => {
        if (approvedPost == null) {
            getApprovedPosts()
            getUserDetails()
            getFilteredPostsWatch()
            // runSaleCounter()
        } else {
            getUserDetails()
            getFilteredPostsWatch()
            // runSaleCounter()
        }

    }, [notForSaleFilter, forSaleFilter, watchCaseFilter, watchFilter, watchMechanismFilter, watchTypeFilter])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Brand:'} filter={watchFilter} clearButton={() => runWatchFilter(name)} />
                    <WatchScrollList inportData={WatchList} bgcolor={'#A9D6E5'} sendFilter={(name: any | null) => runWatchFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Case Size:'} filter={watchCaseFilter} clearButton={() => runWatchCaseFilter(name)} />
                    <WatchScrollList inportData={CaseSize} bgcolor={'#89C2D9'} sendFilter={(name: any | null) => runWatchCaseFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Mechanism:'} filter={watchMechanismFilter} clearButton={() => runWatchMechanismFilter(name)} />
                    <WatchScrollList inportData={Mechanism} bgcolor={'#61A5C2'} sendFilter={(name: any | null) => runWatchMechanismFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Type:'} filter={watchTypeFilter} clearButton={() => runWatchTypeFilter(name)} />
                    <WatchScrollList inportData={Styles} bgcolor={'#468FAF'} sendFilter={(name: any | null) => runWatchTypeFilter(name)} />
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
                {/* <Button style={styles.button} title='TESTING2' onPress={testing2} /> */}
                <View style={styles.approvedPosts}>
                    {/* {startFilter ?
                        <View> */}
                    {!startFilter ?
                        <View style={styles.test}>
                            <Text>HERE 1</Text>

                            {/* {startFilter ? <Text style={{ fontSize: 20, margin: 2, fontFamily: 'NunitoBold', textAlign: 'center', color: "#2A6F97" }}> Nothing with the Filter Selected </Text> : null} */}
                            {/* <Text style={{ fontSize: 20, margin: 2, fontFamily: 'NunitoBold', textAlign: 'center', color: "#44D0DF" }}> Nothing with the Filter Selected </Text> */}
                            <FlatList
                                data={approvedPost}
                                keyExtractor={(item, index) => item + index}
                                initialNumToRender={8}
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
                            <Text>HERE 2</Text>

                            {/* <Text style={{ fontSize: 20 }}> something with the Filter { }</Text> */}
                            <FlatList
                                data={filteredPost}
                                keyExtractor={(item, index) => item + index}
                                initialNumToRender={8}
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
                    {/* </View>
                        :
                        <View style={styles.test}>
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

                    } */}
                </View>
            </View>
        </SafeAreaView>

    )
}

export default App;

const styles = StyleSheet.create({
    test: {
        // flex: 1,
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
        // flex: 1
        height: '100%',
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
        backgroundColor: "#2A6F97",
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
    filterLables: {
        flexDirection: 'row',
        borderRadius: 10,
        // borderColor: 'red',
        // borderRadius: 10,
        // borderWidth: 1,
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
        backgroundColor: "#2C7DA0",
        // minWidth: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        color: '#5C6B73',
        borderRadius: 5,
        marginVertical: 2,
    },
    buttonSmallHilight: {
        backgroundColor: "#A9D6E5",
        // minWidth: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',
        color: '#5C6B73',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        borderRadius: 5,
        marginVertical: 2,
    },
})