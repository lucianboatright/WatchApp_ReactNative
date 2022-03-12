import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import firebase from "firebase/compat/app"
// import "firebase/compat/auth"
// import "firebase/compat/firestore"
// import { storage } from '../../config/config';
import { getStorage, ref, uploadBytes } from 'firebase/storage' 

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [update, setUpdate] = useState<boolean>(false)

  // const [blob, setBlob] = useState<any>(null)

  // const storageForDefaultApp = storage();

  // const permissions = async () => {
  //   if (Platform.OS !== "web") {
  //     const {
  //       status,
  //     } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("Sorry, we need camera roll permissions to make this work!");
  //     }
  //   }
  // }
  

  const pickImage = async () => {
    // getPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // const upload = async () => {
  //   console.log('Clicked')
  //   console.log(image)
  // }

  const getPictureBlob = async (uri) => {
    console.log('URIIIIII', uri)
    return new Promise((resolve, reject) => {
      // console.log('HERE 1')
      const xhr = new XMLHttpRequest();
      // console.log('HERE 2')
      // console.log('XHR', xhr)
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "text";
      xhr.open("GET", uri, true);
      // console.log('HERE 5')
      xhr.send(null);
    });
    // const response = await fetch(uri);
    // const blob_t = await response.blob();

    // var ref = firebase.storage().ref().child("images/");
    // console.log('REFFF',ref)
    // setBlob(ref.put(blob_t))

  };

  const uploadImageToBucket = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, "imageProfile");
    let blob: Blob
    // try {
      setUploading(true);
      console.log('HEERE')
      blob = await getPictureBlob(image);
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('UPLOAD MIGHT BE SUCCSESFULLLLLLLLL')
      }).catch((err) => {
        console.log(Object.keys(err));
        console.log('ERRORRRRR', err.name)
      })
      // console.log('BLOBBB', blob)
      // const ref = await storage.ref.put().child("imageProfile/");
      // console.log('POST STORAGE TEST')
      // const snapshot = await ref.put(blob).then((snapshot) => {
        // console.log('SNAPSHOT', snapshot)
      // }).catch((err) => {
        // console.log('ERRROR', err)
      // });
      // return await snapshot.ref.getDownloadURL();
    // } catch (e) {
    //   console.log(e)
    //   alert("Please Select a Photo First");
    //   setUploading(false);
    //   setUpdate(false);
    // } finally {
    //   blob.close();
    //   setUploading(false);
    //   setUpdate(false);
    //   console.log('PREE SAVED SIGNAL')
    //   alert("saved successfully");
    // }
    // console.log(blob)
  };

  const UpdateImage = async () => {
    console.log('Clicked')
    setUpdate(true);
    let imgUrl = await uploadImageToBucket();

    // await firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(firebase.auth().currentUser.uid)
    //   .update({
    //     photoURL: imgUrl,
    //     displayName: FullName,
    //     Email: Email,
    //     description: Description,
    //     age: Age,
    //   })
    //   .then(() => navigation.navigate("UserProfileScreen"))
    //   .catch((err) => {
    //     alert(err, "Please Select a Photo First");
    //     setUploading(false);
    //     setUpdate(false);
    //   });
  };

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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title='Upload Image' onPress={UpdateImage} />
    </View>
  );
}
