import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { FilterLines } from '../Components/Inputs';

import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { FlatList } from 'react-native-gesture-handler';
import { getAuth, signOut } from 'firebase/auth';
import { Rendering } from '../Components/Rendering';

interface Props {
    id: any;
    name: any;
}

const NestedScreen:  React.FC<Props> = ({ route, navigation }) => {

    const { id } = route.params
    const { name } = route.params


    const [approvedPost, setApprovedPosts] = useState<any>(null)
    const [userEmail, setUserEmail] = useState<any>(null)
    const [userName, setUserName] = useState<any>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    const [userId, setUserId] = useState<any>(null)
    const [watchNumber, setWatchNumber] = useState<any>(null)
    const [filter, setFilter] = useState<any>(null)
    const [filteredPost, setFilteredPosts] = useState<any>(null)
    const [filterSwitch, setFilterSwitch] = useState<boolean>(false)

    const [watchesForSale, setWatchesForSale] = useState<number>(0)
    const [watchesNotForSale, setWatchesNotForSale] = useState<number>(0)


    // const forSale: any | never[] = []
    // const notForSale: any | never[] = []
    // const user = message

    const saleItems: React.SetStateAction<number> | { data: () => { (): any; new(): any; cost: string; }; }[] = []
    const notSaleItem: React.SetStateAction<number> | { data: () => { (): any; new(): any; cost: string; }; }[] = []

    const getApprovedPosts = async () => {
        firebase.firestore().collection('posts').where('userIdNumber', '==', id).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setApprovedPosts(documents)
            setWatchNumber(documents.length)
        })
        getWatchSale()
    }

    const getWatchSale = async () => {
        approvedPost.forEach((item: { data: () => { (): any; new(): any; cost: string; }; }) => {
            if (item.data().cost === 'Not for sale') {
                notSaleItem.push(item)
            } else if (item.data().cost !== 'Not for sale') {
                saleItems.push(item)
            }
        })
        // setWatchesForSale(saleItems)
        // setWatchesNotForSale(notSaleItem)

    }

    const testing = () => {
        // console.log('COST SEAERCH',approvedPost[0].data().cost)
        console.log('FOORR SSAALLEE', watchesForSale)
        console.log('NNOOTT FOORR SSAALLEE', watchesNotForSale)
    
    }

    const getFilteredWatchesForSale = () => {
        approvedPost.forEach((item: { data: () => { (): any; new(): any; cost: string; }; }) => {
            if (item.data().cost)
        setFilteredPosts('')
    })

    const getFilteredWatchesNotForSale = () => {
        console.log('I am being clicked')
        firebase.firestore().collection('posts').where('cost', '==', filter ).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setFilteredPosts(documents)
        })
    }

    const setForSaleFilter = () => {
        setFilter('Not for sale')
        setFilterSwitch(true)
        getFilteredWatchesForSale()
    }

    const setNotForSaleFilter = () => {
        setFilter('Not for sale')
        setFilterSwitch(true)
        getFilteredWatchesNotForSale()
    }


    useEffect(() => {
        getApprovedPosts()
        // getWatchSale()
    }, [userId, watchNumber])

    return (
        <View style={styles.screen}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.text}>{name}'s Watch Box</Text>
                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.goBackText}>{"<-"} Back</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>{name} currently has {watchNumber >= 2 ? `${watchNumber} watches` : `${watchNumber} watch`}</Text>
            {/* <FilterLines filterNumber={watchesForSale} text={'currently for sale'} title="Filter for Sale" onPress={() => setViewFilter()} />
            <FilterLines filterNumber={watchesNotForSale} text={'currently for Not sale'} title="Filter not for Sale" onPress={testing} /> */}
            <View style={styles.saleFilter}>
                <Text style={styles.filterText}>{watchesForSale} are for sale </Text>
                <Button title='View For Sale' onPress={setForSaleFilter} />
            </View>
            <View style={styles.saleFilter}>
                <Text style={styles.filterText}>{watchesNotForSale} are for not sale </Text>
                <Button style={styles.filterButton} title='View Not For Sale' onPress={setNotForSaleFilter} />
            </View>
            <View style={styles.approvedPosts}>
                {filterSwitch ? 
                    <FlatList
                        data={filteredPost}
                        renderItem={
                                ({item}) => <Rendering
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
                                    userDetails={undefined}
                                    comments={item.data().comments}
                                    approved={''}
                                    onApprove={function (): void {
                                        throw new Error('Function not implemented.');
                                    } } onReject={function (): void {
                                        throw new Error('Function not implemented.');
                                    } }
                                />
                                } 
                    />
                :
                    <FlatList
                        data={approvedPost}
                        renderItem={
                                ({item}) => <Rendering
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
                                    userDetails={undefined}
                                    comments={item.data().comments}
                                    approved={''}
                                    onApprove={function (): void {
                                        throw new Error('Function not implemented.');
                                    } } onReject={function (): void {
                                        throw new Error('Function not implemented.');
                                    } }
                                />
                                } 
                    />
                }
            </View>
        </View>
    )
}

export default NestedScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        display:'flex',
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'#00000025',
    },
    text:{
        marginLeft: 5,
        color:'#000',
        fontWeight:'700',
        fontSize:20,
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    header: {
        flex: 0.5
    },
    approvedPosts: {
        flex: 2
    },
    goBackButton: {
        backgroundColor: 'red',
        borderRadius: 10,
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
        marginTop: 9,
        fontSize: 15,
    },
    // buttonText: {
    //     // alignItems: 'center',
    //     // justifyContent: 'center',
    //     padding: 3,
    //     color: 'white',
    //     paddingLeft: 5,
    //     paddingRight: 5,
    // },
    filterButton: {
        marginLeft: 5,
        backgroundColor: '#44D0DF',
        borderRadius: 10
        // marginBottom: 10
    },

})