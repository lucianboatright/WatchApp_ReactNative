import React, { useState, useEffect } from 'react';
import { Image, View, Platform, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../Inputs';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage' 
import uuid from 'react-native-uuid';

export default function ImagePickerExample() {
  const [image, setImage] = useState<any | null>(null);

  const [uploading, setUploading] = useState<boolean>(false)

  const [update, setUpdate] = useState<any>(null)

  const [start, setStart] = useState<boolean>(false)

  const [url, setUrl] = useState<any | null>(null)


  const pickImage = async () => {
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

  const getPictureBlob = async (uri: String) =>  {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  const uploadImageToBucket = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, String(uuid.v4()));
    let blob: Blob
    // try {
      setUploading(true);
      console.log('HEERE')
      blob = await getPictureBlob(image);
      console.log("BLLLOOOBB", blob)
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('UPLOAD MIGHT BE SUCCSESFULLLLLLLLL')
        getDownloadURL(storageRef)
        .then((url) => {
          console.log(url)
          setUrl(url)
          setUploading(false);
        })
        .catch((error) => {
          console.log(error)
        })
      }).catch((err) => {
        console.log(Object.keys(err));
        console.log('ERRORRRRR', err.name)
      })
  };

  const UpdateImage = async () => {
    setStart(true)
    setUpdate(true);
    let imgUrl = await uploadImageToBucket();
    console.log('SHOWING IMG', imgUrl)
  };

  // const reset = () => {
  //   setStart(false)
  // }

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
      <View style={{flexDirection: 'row'}}>
        <Button title='Upload Image' onPress={UpdateImage} />
        {start ?  <View>{uploading ? <Image style={styles.loadingIcon} source={require('../../assets/icons/loading.gif')} /> : <Image style={{width: 50, height: 50}} source={require('../../assets/icons/complete.png')} />}</View> : null}
      </View>
      {/* <Button title='RESET' onPress={reset} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingIcon: {
    width: 50,
    height: 50
  }
})