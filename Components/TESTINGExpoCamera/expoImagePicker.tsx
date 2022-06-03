import React, { useState, useEffect, FC } from 'react';
import { Image, View, Platform, Text, StyleSheet } from 'react-native';
import { Button } from '../Inputs';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import uuid from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';

interface Props {
  sendUrl: (url: any | null) => void;
}

const App: FC<Props> = (props) => {
  const [image, setImage] = useState<any | null>(null);

  const [uploading, setUploading] = useState<boolean>(false)

  const [update, setUpdate] = useState<any>(null)

  const [start, setStart] = useState<boolean>(false)

  const [url, setUrl] = useState<any | null>(null)

  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();


    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  const getPictureBlob = async (uri: String) => {
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
    blob = await getPictureBlob(image);
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
          console.log(url)
          setUrl(url)
          setUploading(false);
          setUpdate(true)
          props.sendUrl(url)
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
    let imgUrl = await uploadImageToBucket();
  };


  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" />
      </View>

      <View style={styles.imageContainer}>
        {
          image !== '' && <Image
            source={{ uri: image }}
            style={styles.image}
          />
        }
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button title='Upload Image' onPress={UpdateImage} />
        {start ? <View>{uploading ? <Image style={styles.loadingIcon} source={require('../../assets/icons/loading.gif')} /> : <Image style={{ width: 50, height: 50 }} source={require('../../assets/icons/complete.png')} />}</View> : null}
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  },
  loadingIcon: {
    width: 50,
    height: 50
  }
});