import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList } from 'react-native-gesture-handler';
import { Rendering } from '../Components/Rendering';

import { CaseSize, Mechanism, Styles, WatchList } from '../Components/DataLists';
import { FilterLable, WatchScrollList } from '../Components/Inputs';
import { stringify } from '@firebase/util';

const App: FC = (props) => {

    const [approvedPost, setApprovedPosts] = useState<any | null>(null)
    const [filteredPost, setFilteredPosts] = useState<any | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    const [userId, setUserId] = useState<any>(null)
    const [watchFilter, setWatchFilter] = useState<null>(null)
    const [watchCaseFilter, setWatchCaseFilter] = useState<null>(null)
    const [watchMechanismFilter, setWatchMechanismFilter] = useState<null>(null)
    const [watchTypeFilter, setWatchTypeFilter] = useState<null>(null)

    const [filterLength, setFilterLength] = useState<number>(0)


    const [startFilter, setStartFilter] = useState<boolean>(false)
    const [forSaleFilter, setForSaleFilter] = useState<boolean>(false)
    const [notForSaleFilter, setNotForSaleFilter] = useState<boolean>(false)

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

    const runWatchFilter = (name: any) => {
        setStartFilter(true)
        if (watchFilter != null) {
            setWatchFilter(null)
        } else if (watchFilter === null) {
            setWatchFilter(name)
        }
    }

    const runWatchCaseFilter = (name: any) => {
        setStartFilter(true)
        if (watchCaseFilter != null) {
            setWatchCaseFilter(null)
        } else if (watchCaseFilter === null) {
            setWatchCaseFilter(name)
        }
    }

    const runWatchMechanismFilter = (name: any) => {
        setStartFilter(true)
        if (watchMechanismFilter != null) {
            setWatchMechanismFilter(null)
        } else if (watchMechanismFilter === null) {
            setWatchMechanismFilter(name)
        }
    }

    const runWatchTypeFilter = (name: any) => {
        setStartFilter(true)
        if (watchTypeFilter != null) {
            setWatchTypeFilter(null)
        } else if (watchTypeFilter === null) {
            setWatchTypeFilter(name)
        }
    }


    const runFilters = (approvedPost: { data: () => { (): any; new(): any; brand: string; cost: string; caseSize: string; mechanism: string; watchStyle: string; }; }) => {
        if (forSaleFilter && approvedPost.data().cost != 'Not for sale') {
            return false
        }
        if (watchCaseFilter && approvedPost.data().caseSize != watchCaseFilter) {
            return false
        }
        if (watchFilter && approvedPost.data().brand != watchFilter) {
            return false
        }
        if (watchMechanismFilter && approvedPost.data().mechanism != watchMechanismFilter) {
            return false
        }
        if (watchTypeFilter && approvedPost.data().watchStyle != watchTypeFilter) {
            return false
        }
        if (notForSaleFilter && approvedPost.data().cost === 'Not for sale') {
            return false
        }
        return true
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
    }

    useEffect(() => {
        if (approvedPost == null) {
            getApprovedPosts()
            getUserDetails()
        } else {
            getUserDetails()
        }

    }, [startFilter])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Brand:'} filter={watchFilter} clearButton={() => setWatchFilter(null)} />
                    <WatchScrollList inportData={WatchList} bgcolor={'#A9D6E5'} sendFilter={(name: any | null) => runWatchFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Case Size:'} filter={watchCaseFilter} clearButton={() => setWatchCaseFilter(null)} />
                    <WatchScrollList inportData={CaseSize} bgcolor={'#89C2D9'} sendFilter={(name: any | null) => runWatchCaseFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Mechanism:'} filter={watchMechanismFilter} clearButton={() => setWatchMechanismFilter(null)} />
                    <WatchScrollList inportData={Mechanism} bgcolor={'#61A5C2'} sendFilter={(name: any | null) => runWatchMechanismFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Type:'} filter={watchTypeFilter} clearButton={() => setWatchTypeFilter(null)} />
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
                <View style={styles.approvedPosts}>
                    {startFilter ?
                        <View style={styles.test}>
                            {approvedPost.filter(runFilters).length === 0 ? <Text style={{ fontSize: 20, margin: 2, fontFamily: 'NunitoBold', textAlign: 'center', color: "#2A6F97" }}> Nothing with the Filter Selected </Text> : null}
                            <FlatList
                                data={(approvedPost.filter(runFilters).length > 0 ? approvedPost.filter(runFilters) : approvedPost)}
                                keyExtractor={(item, index) => item + index}
                                initialNumToRender={8}
                                contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
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
                                        postId={item.data().id}
                                        year={item.data().year}
                                        watchStyle={item.data().watchStyle}
                                        likes={item.data().likes}
                                        userIdNumber={item.data().userIdNumber}
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
                            <FlatList
                                data={approvedPost}
                                keyExtractor={(item, index) => item + index}
                                initialNumToRender={8}
                                contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
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
                                        year={item.data().year}
                                        watchStyle={item.data().watchStyle}
                                        likes={item.data().likes}
                                        userIdNumber={item.data().userIdNumber}
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
    },
    header: {
        flex: 0.1
    },
    approvedPosts: {
        marginLeft: 5,
        marginRight: 5,
        height: '100%',
        flex: 1,
    },

    grid: {
        paddingLeft: 4,

    },
    addPost: {
        flex: 1
    },
    button: {
        backgroundColor: "#2A6F97",
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
        // fontWeight: 'bold',
        fontFamily: 'NunitoSemiBold',
    },
    labelText: {
        fontFamily: 'NunitoBold',
        marginLeft: 5,
        marginRight: 5
    },
    filterLables: {
        flexDirection: 'row',
        borderRadius: 10,

    },
    NoWatches: {
        fontSize: 25,
        // fontWeight: 'bold',
        fontFamily: 'NunitoSemiBold',
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonSmall: {
        backgroundColor: "#2C7DA0",
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