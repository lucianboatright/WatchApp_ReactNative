import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { FlatList } from 'react-native-gesture-handler';
import { Rendering } from '../Components/Rendering';

import { CaseSize, Mechanism, Styles, WatchList } from '../Components/DataLists';
import { FilterLable, WatchScrollList } from '../Components/Inputs';
import { stringify } from '@firebase/util';


interface Watch {
    data: () => WatchData;

}

interface WatchData {
    brand: string;
    cost: string;
    caseSize: string;
    mechanism: string;
    watchStyle: string;

}

const App: FC = (props) => {

    const [approvedPost, setApprovedPosts] = useState<any | null>(null)
    // const [filteredPost, setFilteredPosts] = useState<object | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    const [userId, setUserId] = useState<any>(null)
    const [watchFilter, setWatchFilter] = useState<string | null>(null)
    const [watchCaseFilter, setWatchCaseFilter] = useState<string | null>(null)
    const [watchMechanismFilter, setWatchMechanismFilter] = useState<string | null>(null)
    const [watchTypeFilter, setWatchTypeFilter] = useState<string | null>(null)

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

    const runWatchFilter = (name: string | null) => {
        setStartFilter(true)
        if (watchFilter != null) {
            setWatchFilter(null)
        } else if (watchFilter === null) {
            setWatchFilter(name)
        }
    }

    const runWatchCaseFilter = (name: string | null) => {
        setStartFilter(true)
        if (watchCaseFilter != null) {
            setWatchCaseFilter(null)
        } else if (watchCaseFilter === null) {
            setWatchCaseFilter(name)
        }
    }

    const runWatchMechanismFilter = (name: string | null) => {
        setStartFilter(true)
        if (watchMechanismFilter != null) {
            setWatchMechanismFilter(null)
        } else if (watchMechanismFilter === null) {
            setWatchMechanismFilter(name)
        }
    }

    const runWatchTypeFilter = (name: string | null) => {
        setStartFilter(true)
        if (watchTypeFilter != null) {
            setWatchTypeFilter(null)
        } else if (watchTypeFilter === null) {
            setWatchTypeFilter(name)
        }
    }

    const runFilters = (approvedPost: Watch) => {
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
        // setFilteredPosts(null)
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#DAD7CD', }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Brand:'} filter={watchFilter} clearButton={() => setWatchFilter(null)} />
                    <WatchScrollList inportData={WatchList} bgcolor={'#A56336'} sendFilter={(name: any | null) => runWatchFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Case Size:'} filter={watchCaseFilter} clearButton={() => setWatchCaseFilter(null)} />
                    <WatchScrollList inportData={CaseSize} bgcolor={'#815839'} sendFilter={(name: any | null) => runWatchCaseFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Mechanism:'} filter={watchMechanismFilter} clearButton={() => setWatchMechanismFilter(null)} />
                    <WatchScrollList inportData={Mechanism} bgcolor={'#6F523B'} sendFilter={(name: any | null) => runWatchMechanismFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FilterLable lable={'Type:'} filter={watchTypeFilter} clearButton={() => setWatchTypeFilter(null)} />
                    <WatchScrollList inportData={Styles} bgcolor={'#4A473E'} sendFilter={(name: any | null) => runWatchTypeFilter(name)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={forSaleFilter ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterForSale}>
                        <Text style={forSaleFilter ? styles.textHilight : styles.text}>For Sale </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={notForSaleFilter ? styles.buttonSmallHilight : styles.buttonSmall} onPress={getFilterNotForSale}>
                        <Text style={notForSaleFilter ? styles.textHilight : styles.text}>Not for Sale</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={clearWatchFilter}>
                    <Text style={styles.text}>Clear Filter</Text>
                </TouchableOpacity>
                <View style={styles.approvedPosts}>

                    <View>
                        {approvedPost ?
                            <View>
                                {approvedPost.filter(runFilters).length === 0 ? <Text style={{ fontSize: 20, margin: 2, fontFamily: 'NunitoBold', textAlign: 'center', color: "#2A6F97" }}> Nothing with the Filter Selected </Text> : null}
                                <FlatList
                                    data={(approvedPost.filter(runFilters).length > 0 ? approvedPost.filter(runFilters) : approvedPost)}
                                    keyExtractor={(item, index) => item + index}
                                    initialNumToRender={8}
                                    numColumns={2}
                                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
                                    renderItem={
                                        ({ item }) => <Rendering
                                            {...item.data()}
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
                            <Text>Loading   </Text>
                        }
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#DAD7CD',

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
        backgroundColor: "#143642",
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
        color: '#EAE8E3',
        // fontWeight: 'bold',
        fontFamily: 'NunitoBold',
    },
    textHilight: {
        color: '#EAE8E3',
        // fontWeight: 'bold',
        fontFamily: 'NunitoBold',
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
        backgroundColor: "#263C41",
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        borderRadius: 5,
        marginVertical: 2,
        fontFamily: 'NunitoSemiBold',

    },
    buttonSmallHilight: {
        fontFamily: 'NunitoSemiBold',
        backgroundColor: "#2C7DA0",
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