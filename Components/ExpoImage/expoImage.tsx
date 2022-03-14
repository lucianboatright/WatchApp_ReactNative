import React, { useState, useEffect, FC } from 'react';
import { Image, View, Platform, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, ImageButton } from '../Inputs';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage' 
import uuid from 'react-native-uuid';

interface Props {
    sendUrl: (url: any | null) => void;
}

const App : FC <Props> = (props) => {
  const [image, setImage] = useState<any | null>(null);

  const [uploading, setUploading] = useState<boolean>(false)

  const [update, setUpdate] = useState<any>(null)

  const [start, setStart] = useState<boolean>(false)

  const [url, setUrl] = useState<any | null>(null)

  const [pickedImagePatch, setPickedImagePath] = useState<any>(null)


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 16],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }


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
    console.log('SHOWING IMG', imgUrl)
  };

//   const Passing = async () => {
//     if (update === true) {

//     }
//   }
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
    <View style={styles.container}>
      <ImageButton style={styles.imageButton} title="Pick an image" onPress={pickImage} />
      <ImageButton style={styles.imageButton} title="Use Camera" onPress={openCamera} />
      {image && <Image style={{margin: 30}} source={{ uri: image }} style={styles.imageContainer} />}
      <View style={{flexDirection: 'row'}}>
        <Button title='Upload Image' onPress={UpdateImage} />
        {start ?  <View>{uploading ? <Image style={styles.loadingIcon} source={require('../../assets/icons/loading.gif')} /> : <Image style={styles.loadingIcon} source={require('../../assets/icons/complete.png')} />}</View> : null}
      </View>
      {/* <Button title='RESET' onPress={reset} /> */}
    </View>
  );
}

export default App

const styles = StyleSheet.create({
  loadingIcon: {
    width: 50,
    height: 50,
    marginLeft: 35,
    marginRight: 5
  },
  imageContainer: {
      width: 200,
      height: 300
  },
  imageButton: {
    width: 100
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})