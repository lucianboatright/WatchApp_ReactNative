import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

const App = () => {
  const [filePath, setFilePath] = useState({});

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example of Image Picker in React Native
      </Text>
      <View style={styles.container}>
        {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> */}
        <Image
          source={{uri: filePath.uri}}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>
            Launch Camera for Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('video')}>
          <Text style={styles.textStyle}>
            Launch Camera for Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('video')}>
          <Text style={styles.textStyle}>Choose Video</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});


// import React, { FC, useState, useEffect } from 'react'
// import { View, Text, StyleSheet, Image, Platform } from 'react-native';
// import { TouchableHighlight } from 'react-native-gesture-handler';
// import * as ImagePicker from 'expo-image-picker'
// import firebase  from "firebase/compat/app";
// import "firebase/compat/auth"
// import "firebase/compat/firestore"
// import {getStorage, ref, uploadBytes } from 'firebase/storage'
// import { Button } from '../Components/Inputs';
// // import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';


// const App : FC = () => {
//     useEffect(() => {
//         (async () => {
//           if (Platform.OS !== 'web') {
//             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (status !== 'granted') {
//               alert('Sorry, we need camera roll permissions to make this work!');
//             }
//           }
//         })();
//       }, []);
    
//       const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.All,
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 1,
//         });
    
//         if (!result.cancelled) {
//           const storage = getStorage(); //the storage itself
//           const ref = ref(storage, 'image.jpg'); //how the image will be addressed inside the storage
    
//           //convert image to array of bytes
//           const img = await fetch(result.uri);
//           const bytes = await img.blob();
    
//           await uploadBytes(ref, bytes); //upload images
//         }
//       };
    
//       return (
//             <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
//             <TouchableHighlight onPress={pickImage}>
//                   <Text>select image</Text>
//              </TouchableHighlight>
//                 {/* <Button title="Choose Image"  onPress={pickImage} /> */}
//             </View>
//       );
// }

// export default App


// import React, { FC, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import { Button, Input } from '../Components/Inputs';
// import firebase  from "firebase/compat/app";
// import "firebase/compat/auth"
// import "firebase/compat/firestore"


// const App : FC = () => {

//     const [post, setPost] = useState<string | null>(null)
//     const [userDetails, setUserDetails] = useState<any>(null)

//     const submitPost = async () => {
//         if(post === null) {
//             Alert.alert('Please enter somthing before submitting')
//         } else {
//             alert('Post Button')
//             const data = {
//                 post,
//                 timeStamp: Date.now(),
//                 approved: true
//             }
//             try{
//                 await firebase.firestore().collection('posts').add(data);
//             } catch(err){
//                 console.log(err)
//             }
//         }
//         setPost(null)
//     }

//     const getUserDetails = async () => {
//         const uid = firebase.auth().currentUser.uid;
//         const user = await firebase.firestore().collection('users').doc(uid).get();
//         setUserDetails({id: user.id, ...user.data()})
//     }

//     useEffect(() => {
//         getUserDetails()
//     }, [])

//     return (
//         <View style={styles.container}>
//             <Text>Hello From Add watch</Text>
//             <View style={styles.addPost}>
//                 <View>
//                     <Input placeholder='Add Post' onChangeText={(text) => setPost(text)} />
//                     <Button title='Post' onPress={submitPost} />
//                 </View>
//                 {userDetails ? userDetails.isAdmin ? (
//                     <View>
//                         <Button title="AuthDashboard" onPress={() => props.navigation.navigate('AuthDashboard')} />
//                     </View>
//                 ) : null : null}
//             </View>
//         </View>
//     )
// }

// export default App;


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })