import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Platform, Dimensions, ScrollView, Button } from 'react-native';
import { Input, MultiLineInput, ForSale } from '../Components/Inputs';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { ImagePicker } from '../Components/imagePicker';
import { Imagepicker } from '../Components/ExpoImage';
// import { Camera } from '../Components/ExpoCamera';

import { WatchDropDown, CaseDropDown, MaterialDropDown, LugDropDown, MechDropDown } from '../Components/DropDowns';

import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import Watch_1 from '../assets/icons/watch_1.png'
import Watch_2 from '../assets/icons/watch_2.png'
import Watch_3 from '../assets/icons/watch_3.png'
import Watch_4 from '../assets/icons/watch_4.png'

const {height, width} = Dimensions.get('screen')

const App : FC <Props> = (props) => {

    const [post, setPost] = useState<string | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    const [userId, setUserId] = useState<string | null>(null)

    const [url_1, setUrl_1] = useState<any | null>(null)
    const [url_2, setUrl_2] = useState<any | null>(null)
    const [url_3, setUrl_3] = useState<any | null>(null)
    const [url_4, setUrl_4] = useState<any | null>(null)
    const [selectedWatch, setSelectedWatch] = useState<string | null>(null)
    const [selectedCase, setSelectedCase] = useState<string | null>(null)
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
    const [selectedLug, setSelectedLug] = useState<string | null>(null)
    const [selectedMech, setSelectedMech] = useState<string | null>(null)
    const [message, setMessage] = useState<string>('')
    const [cost, setCost] = useState<string | null>('Not For Sale')

    const submitPost = async () => {
        if(message === null) {
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
                userName: userDetails.name,
                userIdNumber: userId,
                timeStamp: Date.now(),
                likes: [],
                comments: [],
                // approved: true
            }
            console.log('POST', data)
            try{
                await firebase.firestore().collection('posts').add(data);
            } catch(err){
                console.log(err)
            }
        }
        setPost(null)
        setCost('')
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
        props.navigation.navigate('Home')
    }

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id, ...user.data()})
        setUserId(user.id)
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.ImageSelectors}>
                    <Imagepicker watchImage={Watch_1} sendUrl={(url) => setUrl_1(url) } margintop={25} />
                    <Imagepicker watchImage={Watch_2} sendUrl={(url) => setUrl_2(url)} margintop={25} />
                </View>
                <View style={styles.ImageSelectors}>
                    <Imagepicker watchImage={Watch_3} sendUrl={(url) => setUrl_3(url)} margintop={25} />
                    <Imagepicker watchImage={Watch_4} sendUrl={(url) => setUrl_4(url)} margintop={25} />
                </View>
            </ScrollView>
            <View>
                <View>
                    <MultiLineInput sendMessage={(value: string) => setMessage(value)} setBorder={{borderBottomWidth: 1}} setHeight={{padding: 10, height: 60}} />
                    <WatchDropDown placeHolder='Select Watch' title='Select Watch' sendSelectedWatch={(selected) => setSelectedWatch(selected)}/>
                    <CaseDropDown placeHolder="Select Case Size" sendSelectedCase={(selectedCase: any) => setSelectedCase(selectedCase)} />
                    <MaterialDropDown placeHolder='Select Material' sendSelectedMaterial={(selectedMaterial: any) => setSelectedMaterial(selectedMaterial)} />
                    <LugDropDown placeHolder='Select Lug Size' sendSelectedLug={(selectedLug) => setSelectedLug(selectedLug)}/>
                    <MechDropDown placeHolder='Select Mechanism' sendSelectedMech={(selectedMech: any) => setSelectedMech(selectedMech)} />
                    <ForSale sendCost={(cost) => setCost(cost)} />
                    <Button title='Post' onPress={submitPost} />
                </View>
                {userDetails ? userDetails.isAdmin ? (
                    <View>
                        <Button title="AuthDashboard" onPress={() => props.navigation.navigate('AuthDashboard')} />
                    </View>
                ) : null : null}
            </View>
            {/* <Button title='TESTING' onPress={testing} /> */}
        </View>
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
        // backgroundColor: 'red',
        justifyContent: 'space-between'
    },
    uploadButton: {
        backgroundColor: "#44D0DF",
        minWidth: 100,
        marginLeft: 10,
        marginRight: 10,
        // width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius:5,
        marginVertical: 10
    }
})