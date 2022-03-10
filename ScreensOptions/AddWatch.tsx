import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Platform, Share, StatusBar } from 'react-native';
import { Button, Input } from '../Components/Inputs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import * as Clipboard from "expo-clipboard";
import uuid from "uuid";

import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const App : FC = () => {

    const [post, setPost] = useState<string | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)

    const [image, setImage] = useState<any>(null);

    const [expoImage, setExpoImage] = useState<any | null>(null)
    const [uploading, setUpLoading] = useState<boolean>(false)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
        console.log({ pickerResult });
    
        _handleImagePicked(pickerResult);
    
        if (!result.cancelled) {
          setImage(result.uri);
          setExpoImage(result.url)
        }
      };

      const _share = () => {
        Share.share({
          message: expoImage,
          title: "Check out this photo",
          url: expoImage,
        });
      };
    
      const _copyToClipboard = () => {
        Clipboard.setString(expoImage);
        alert("Copied image URL to clipboard");
      };
    
      const _takePhoto = async () => {
        const pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        _handleImagePicked(pickerResult);
      };
    
    //   const pickImage = async () => {
    //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //     });
    
    //     console.log({ pickerResult });
    
    //     this._handleImagePicked(pickerResult);
    //   };
    
      const _handleImagePicked = async (pickerResult: { cancelled: any; uri: any; }) => {
        try {
          setUpLoading(true);
    
          if (!pickerResult.cancelled) {
            const uploadUrl = await uploadImageAsync(pickerResult.uri);
            expoImage(uploadUrl);
          }
        } catch (e) {
          console.log(e);
          alert("Upload failed, sorry :(");
        } finally {
            setUpLoading(false);
        }
      };

    const uploadImageAsync = async (uri) => {
      // Why are we using XMLHttpRequest? See:
      // https://github.com/expo/expo/issues/2402#issuecomment-443726662
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
    
      const fileRef = ref(getStorage(), "1234");
      const result = await uploadBytes(fileRef, blob);
    
      // We're done with the blob, close and release it
      blob.close();
    
      return await getDownloadURL(fileRef);
    }

    const submitPost = async () => {
        if(post === null) {
            Alert.alert('Please enter somthing before submitting')
        } else {
            alert('Post Button')
            const data = {
                post,
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
        navigation.navigate('Login')
    }

    const getUserDetails = async () => {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUserDetails({id: user.id, ...user.data()})
    }

    const testing = () => {
        Alert.alert('TEESTING BUTTON')
    }

    const getPermission = async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        }
    } 
    
    const _maybeRenderImage = () => {
        let { image } = expoImage;
        if (!image) {
          return;
        }
    }

    useEffect(() => {
        getPermission()
        getUserDetails()
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {!!image && (
                <Text
                    style={{
                    fontSize: 20,
                    marginBottom: 20,
                    textAlign: "center",
                    marginHorizontal: 15,
                    }}
                >
                    Example: Upload ImagePicker result
                </Text>
                )}

                <Button
                onPress={pickImage}
                title="Pick an image from camera roll"
                />

                <Button onPress={_takePhoto} title="Take a photo" />
                
                {_maybeRenderImage()}
                {_maybeRenderUploadingOverlay()}

                <StatusBar barStyle="default" />
            </View>
            <Text>Hello From Add watch</Text>
            <View style={styles.addPost}>
                <View>
                    <Input placeholder='Add Post' onChangeText={(text) => setPost(text)} />
                    <Button title='Post' onPress={submitPost} />
                    {/* <Button title='TESTING' onPress={testing} /> */}
                    {/* <TouchableOpacity style={styles.loginButton} onPress={console.log('Clicked')}>
                    <Text>Signup Here</Text>
                </TouchableOpacity> */}

                </View>
                {userDetails ? userDetails.isAdmin ? (
                    <View>
                        <Button title="AuthDashboard" onPress={() => props.navigation.navigate('AuthDashboard')} />
                    </View>
                ) : null : null}
            </View>
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

    }
})

const _maybeRenderImage = () => {
    throw new Error('render.');
}
const _maybeRenderUploadingOverlay = () => {
    throw new Error('upload.');
}

const pickerResult = (pickerResult: any) => {
    throw new Error('picker.');
}

const getStorage = () => {
    throw new Error('getstorage.');
}

const uploadBytes = (fileRef: any, blob: unknown) => {
    throw new Error('uploadbytes.');
}

const getDownloadURL = (fileRef: any) => {
    throw new Error('getdownload.');
}

const ref = (arg0: any, arg1: string) => {
    throw new Error('ref.');
}

