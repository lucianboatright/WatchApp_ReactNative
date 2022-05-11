import React, { FC, useState, useEffect, Props } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MultiLineInput, ForSale } from '../Components/Inputs';
import { Imagepicker } from '../Components/ExpoImage';
import { WatchList, CaseSize, Mechanism, Material, Lugs, Styles, Straps, Years } from '../Components/DataLists';

import { DropDown } from '../Components/DropDowns';
import { getAuth, signOut } from 'firebase/auth'
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import Watch_1 from '../assets/icons/watch_1.png'
import Watch_2 from '../assets/icons/watch_2.png'
import Watch_3 from '../assets/icons/watch_3.png'
import Watch_4 from '../assets/icons/watch_4.png'

const { height, width } = Dimensions.get('screen')

const App: FC = (props) => {

    const [post, setPost] = useState<string | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    const [userId, setUserId] = useState<string>('')
    const [userName, setUserName] = useState<string>('null')

    const [url_1, setUrl_1] = useState<any | null>(null)
    const [url_2, setUrl_2] = useState<any | null>(null)
    const [url_3, setUrl_3] = useState<any | null>(null)
    const [url_4, setUrl_4] = useState<any | null>(null)
    const [selectedWatch, setSelectedWatch] = useState<string | null>(null)
    const [selectedCase, setSelectedCase] = useState<string | null>(null)
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
    const [selectedLug, setSelectedLug] = useState<string | null>(null)
    const [selectedMech, setSelectedMech] = useState<string | null>(null)
    const [selectedYear, setSelectedYear] = useState<string>('')
    const [selectedStyle, setSelectedStyle] = useState<string>('')
    const [selectedType, setSelectedType] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [cost, setCost] = useState<string | null>('Not For Sale')

    const submitPost = async () => {
        console.log('clicked')
        if (message === null) {
            Alert.alert('Please enter somthing before submitting')
        } else {
            // alert('Post Button')
            const data = {
                message,
                iamge_1: url_1,
                iamge_2: url_2,
                iamge_3: url_3,
                iamge_4: url_4,
                brand: selectedWatch,
                caseSize: selectedCase,
                caseMaterial: selectedMaterial,
                lugsWidth: selectedLug,
                mechanism: selectedMech,
                cost: cost,
                year: selectedYear,
                watchStyle: selectedStyle,
                watchType: selectedType,
                userName: userName,
                userIdNumber: userId,
                timeStamp: Date.now(),
                likes: [],
                comments: [],
                // approved: true
            }
            console.log('POST', data)
            try {
                await firebase.firestore().collection('posts').add(data);
            } catch (err) {
                console.log(err)
            }
        }
        setPost(null)
        setCost('Not For Sale')
        setMessage("")
        setSelectedCase('')
        setSelectedLug('')
        setSelectedMech('')
        setSelectedWatch('')
        setSelectedMaterial('')
        setUrl_1(null)
        setUrl_2(null)
        setUrl_3(null)
        setUrl_4(null)
        props.navigation.navigate('Timeline')
    }

    useEffect(() => {
        const auth = getAuth()
        const user = auth.currentUser?.uid
        const currentUserName = auth.currentUser?.displayName
        setUserId(String(user))
        setUserName(String(currentUserName))
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.ImageSelectors}>
                        <Imagepicker watchImage={Watch_1} sendUrl={(url) => setUrl_1(url)} margintop={25} />
                        <Imagepicker watchImage={Watch_2} sendUrl={(url) => setUrl_2(url)} margintop={25} />
                    </View>
                    <View style={styles.ImageSelectors}>
                        <Imagepicker watchImage={Watch_3} sendUrl={(url) => setUrl_3(url)} margintop={25} />
                        <Imagepicker watchImage={Watch_4} sendUrl={(url) => setUrl_4(url)} margintop={25} />
                    </View>
                </ScrollView>
                <View>
                    <View>
                        <MultiLineInput sendMessage={(value: string) => setMessage(value)} setBorder={{ borderBottomWidth: 1 }} setHeight={{ padding: 10, height: 60 }} />
                        {/* <DropDown title='Type' inputData={WatchList} placeHolder='Type' sendSelected={(selected: any) => setSelectedWatch(selected)} /> */}
                        <DropDown title='Select Brand' inputData={WatchList} placeHolder='Select Watch' sendSelected={(selected: any) => setSelectedWatch(selected)} />
                        <DropDown title='Case Size' inputData={CaseSize} placeHolder="Select Case Size" sendSelected={(selected: any) => setSelectedCase(selected)} />
                        <DropDown title='Lug Size' inputData={Lugs} placeHolder='Select Lug Size' sendSelected={(selected) => setSelectedLug(selected)} />
                        <DropDown title='Material' inputData={Material} placeHolder='Select Material' sendSelected={(selected: any) => setSelectedMaterial(selected)} />
                        <DropDown title='Movment' inputData={Mechanism} placeHolder='Select Mechanism' sendSelected={(selected: any) => setSelectedMech(selected)} />
                        <DropDown title='Select Year' inputData={Years} placeHolder='Select Year' sendSelected={(selected: any) => setSelectedYear(selected)} />
                        <DropDown title='Select Style' inputData={Styles} placeHolder='Select Style' sendSelected={(selected: any) => setSelectedStyle(selected)} />
                        <DropDown title='Strap Type' inputData={Straps} placeHolder='Strap Type' sendSelected={(selected: any) => setSelectedType(selected)} />
                        <ForSale sendCost={(cost) => setCost(cost)} />
                        <Pressable style={styles.buttonSmall} onPress={submitPost}>
                            <Text style={styles.text}>Submit</Text>
                        </Pressable>
                    </View>
                    {/* {userDetails ? userDetails.isAdmin ? (
                        <View>
                            <Button title="AuthDashboard" onPress={() => props.navigation.navigate('AuthDashboard')} />
                        </View>
                    ) : null : null} */}
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
    loginButton: {
        backgroundColor: '#44D0DF',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    ImageSelectors: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '97%',
        justifyContent: 'space-between'
    },
    uploadButton: {
        backgroundColor: "#44D0DF",
        minWidth: 100,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10
    },
    buttonSmall: {
        backgroundColor: "#44D0DF",
        // minWidth: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '48%',
        // marginBottom: 100,

        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
        borderRadius: 5,
        marginVertical: 2,
    },
    text: {
        fontFamily: 'NunitoBold',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
})

