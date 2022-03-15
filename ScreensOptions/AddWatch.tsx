import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Platform } from 'react-native';
import { Button, Input } from '../Components/Inputs';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { ImagePicker } from '../Components/imagePicker';
import { Imagepicker } from '../Components/ExpoImage';
// import { Camera } from '../Components/ExpoCamera';

import { WatchDropDown, CaseDropDown, MaterialDropDown } from '../Components/DropDowns';

import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const App : FC = ({ navigation }) => {

    const [post, setPost] = useState<string | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    const [userId, setUserId] = useState<string | null>(null)

    const [url_1, setUrl_1] = useState<any | null>(null)
    const [selectedWatch, setSelectedWatch] = useState<any>(null)
    const [selectedCase, setSelectedCase] = useState<any>(null)
    const [selectedMaterial, setSelectedMaterial] = useState<any>(null)


    const submitPost = async () => {
        if(post === null) {
            Alert.alert('Please enter somthing before submitting')
        } else {
            alert('Post Button')
            const data = {
                post,
                userName: userDetails.name,
                userIdNumber: userId,
                timeStamp: Date.now(),
                approved: true
            }
            try{
                await firebase.firestore().collection('posts').add(data);
            } catch(err){
                console.log(err)
            }
        }
        setPost(null)
        navigation.navigate('Home')
    }

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id, ...user.data()})
        setUserId(user.id)
    }

    const testing = () => {
        // Alert.alert('TEESTING BUTTON')
        console.log('URL_111', url_1)
        console.log('Selected Watch', selectedWatch)
    }

    useEffect(() => {
        getUserDetails()
        // console.log('BACK IN THE COMPONENT!!!!', url_1)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.ImageSelectors}>
                <Imagepicker sendUrl={(url_1) => setUrl_1(url_1)} />
                <Imagepicker sendUrl={(url_1) => setUrl_1(url_1)} />
            </View>
            <View style={styles.ImageSelectors}>
                <Imagepicker sendUrl={(url_1) => setUrl_1(url_1)} />
                <Imagepicker sendUrl={(url_1) => setUrl_1(url_1)} />
            </View>
            <View style={styles.addPost}>
                <View>
                    <Input placeholder='Extra Info' onChangeText={(text) => setPost(text)} />
                    <WatchDropDown sendSelectedWatch={(selectedWatch) => setSelectedWatch(selectedWatch)}/>
                    <CaseDropDown sendSelectedCase={(selectedCase: any) => setSelectedCase(selectedCase)} />
                    <MaterialDropDown sendSelectedMaterial={(selectedMaterial: any) => setSelectedMaterial(selectedMaterial)} />
                    <Button title='Post' onPress={submitPost} />
                </View>
                {userDetails ? userDetails.isAdmin ? (
                    <View>
                        <Button title="AuthDashboard" onPress={() => props.navigation.navigate('AuthDashboard')} />
                    </View>
                ) : null : null}
            </View>
            <Button title='TESTING' onPress={testing} />
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        flexDirection: 'row'
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