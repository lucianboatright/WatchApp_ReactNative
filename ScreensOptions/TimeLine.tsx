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

    const runSaleCounter = async () => {
        const forSale = await approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost != 'Not for sale')
        const notForSale = await approvedPost.filter((item: { data: () => { (): any; new(): any; brand: string; cost: string; }; }) => item.data().cost == 'Not for sale')
        setForSaleCount(forSale)
        setNotForSaleCount(notForSale)
    }

    // const changeFilterWatch = async (name: string) => {
    //     // clearBandFilter()
    //     setStartFilter(true)
    //     setWatchFilter(name);
    //     getFilteredPostsWatch();
    // }
    // const changeFilterCase = async (name: string) => {
    //     // clearBandFilter()
    //     setStartFilter(true)
    //     setWatchCaseFilter(name);
    //     getFilteredPostsWatch()
    //     // getFilteredPostsWatchCase(name);
    // }
    // const changeFilterMechanism = async (name: string) => {
    //     // clearBandFilter()
    //     setStartFilter(true)
    //     setWatchMechanismFilter(name);
    //     getFilteredPostsWatch()
    //     // getFilteredPostsMechanism(name);
    // }
    // const changeFilterType = async (name: string) => {
    //     // clearBandFilter()
    //     setStartFilter(true)
    //     setWatchTypeFilter(name);
    //     getFilteredPostsWatch()
    //     // getFilteredPostsWatchType(name);
    // }

    const getFilterForSale = async () => {
        setStartFilter(true)
        if (notForSaleFilter) {
            // console.log('pre for sale', forSaleFilter)
            setNotForSaleFilter(!notForSaleFilter)
            setForSaleFilter(!forSaleFilter)
            getFilteredPostsWatch()
        } else {
            setForSaleFilter(!forSaleFilter)
            getFilteredPostsWatch()
        }
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
            // getFilteredPostsWatch('')
        } else {
            setNotForSaleFilter(!notForSaleFilter)
        }
    }


    const getFilteredPostsWatch = async () => {
        console.log('start of filter post')
        if (forSaleFilter) {
            console.log('for sale filter')
            const filtered = await forSaleCount.flatMap(
                (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) =>
                    [[watchFilter != null ? item.data().brand == watchFilter : null],
                    [watchCaseFilter != null ? item.data().caseSize == watchCaseFilter : null],

                    [watchMechanismFilter != null ? item.data().mechanism == watchMechanismFilter : null],

                    [watchTypeFilter != null ? item.data().watchStyle == watchTypeFilter : null],

                    [item.data().cost !== 'Not for sale']]
            )
            console.log('for SALE filtered posts ', filtered)
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (notForSaleFilter) {
            console.log('not for sale filter')
            const filtered = await notForSaleCount.flatMap(
                (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) =>
                    (watchFilter != null ? item.data().brand == watchFilter : null)
                    &&
                    (watchCaseFilter != null ? item.data().caseSize == watchCaseFilter : null)
                    &&
                    (watchMechanismFilter != null ? item.data().mechanism == watchMechanismFilter : null)
                    &&
                    (watchTypeFilter != null ? item.data().watchStyle == watchTypeFilter : null)
                    &&
                    item.data().cost == 'Not for sale')
            console.log('nto for sale filtered posts ', filtered)
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
        } else if (!notForSaleFilter && !forSaleFilter) {
            console.log('no sale filters HERE')
            const filtered = await approvedPost.flatMap(
                (item: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) =>
                    (watchFilter != null ? item.data().brand == watchFilter : null)
                    &&
                    (watchCaseFilter != null ? item.data().caseSize == watchCaseFilter : null)
                    &&
                    (watchMechanismFilter != null ? item.data().mechanism == watchMechanismFilter : null)
                    &&
                    (watchTypeFilter != null ? item.data().watchStyle == watchTypeFilter : null))
            console.log('JUST fitlers', filtered)
            setFilteredPosts(filtered)
            setFilterLength(filtered.length)
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
        console.log(forSaleFilter)
        console.log('brand', watchFilter)
        console.log('case', watchCaseFilter)
        console.log('style', watchTypeFilter)
        console.log('mech', watchMechanismFilter)
        console.log('for sale', forSaleFilter)
        console.log('NOT for sale', notForSaleFilter)


        // console.log(approvedPost)
        // console.log('opening', openBoxContainer)
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
            runSaleCounter()
        } else {
            getUserDetails()
            getFilteredPostsWatch()
            runSaleCounter()
        }

    }, [notForSaleFilter, forSaleFilter, watchCaseFilter, watchFilter, watchMechanismFilter, watchTypeFilter])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Brand:'} filter={watchFilter} clearButton={() => setWatchFilter(null)} />
                    <WatchScrollList inportData={WatchList} bgcolor={'orange'} sendFilter={(name: string | null) => setWatchFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Case Size:'} filter={watchCaseFilter} clearButton={() => setWatchCaseFilter(null)} />
                    <WatchScrollList inportData={CaseSize} bgcolor={'orange'} sendFilter={(name: string | null) => setWatchCaseFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Mechanism:'} filter={watchMechanismFilter} clearButton={() => setWatchMechanismFilter(null)} />
                    <WatchScrollList inportData={Mechanism} bgcolor={'orange'} sendFilter={(name: string | null) => setWatchMechanismFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Type:'} filter={watchTypeFilter} clearButton={() => setWatchTypeFilter(null)} />
                    <WatchScrollList inportData={Styles} bgcolor={'orange'} sendFilter={(name: string | null) => setWatchTypeFilter(name)} />
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
                    {/* {startFilter ?
                        <View> */}
                    {filterLength === 0 ?
                        <View style={styles.test}>
                            {filterLength === 0 && startFilter ? <Text style={{ fontSize: 20, margin: 2, fontFamily: 'NunitoBold', textAlign: 'center', color: "#44D0DF" }}> Nothing with the Filter Selected </Text> : null}
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