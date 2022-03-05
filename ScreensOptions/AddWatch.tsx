import React, { FC, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'
import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import {getStorage, ref, uploadBytes } from 'firebase/storage'
import { Button } from '../Components/Inputs';
// import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';


const App : FC = () => {
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          const storage = getStorage(); //the storage itself
          const ref = ref(storage, 'image.jpg'); //how the image will be addressed inside the storage
    
          //convert image to array of bytes
          const img = await fetch(result.uri);
          const bytes = await img.blob();
    
          await uploadBytes(ref, bytes); //upload images
        }
      };
    
      return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
            {/* //     <TouchableHighlight onPress={pickImage}>
            //         <Text>select image</Text>
            //     </TouchableHighlight> */}
                <Button title="Choose Image"  onPress={pickImage} />
            </View>
      );
}

export default App


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