import React, { useState, useEffect, FC } from 'react';
import { Image, View, Platform, Text, StyleSheet, Alert, TouchableHighlight, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import uuid from 'react-native-uuid';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import ProfileImage from '../../assets/icons/profileIcon.png'

const { height, width } = Dimensions.get('screen')

interface Props {
  profilePic: string;
  userId: any;
}

const App: FC<Props> = (props) => {

  const [image, setImage] = useState<any | null>(null);

  const [uploading, setUploading] = useState<boolean>(false)

  const [start, setStart] = useState<boolean>(false)

  const [urlPic, setPicUrl] = useState<any | null>(null)

  const [profilePicture, setProfilePicture] = useState<any | null>(null)

  const [resetPic, setResetPic] = useState<boolean>(false)

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [10, 16],
        quality: 1,

      });
      if (!pickerResult.cancelled) {
        setImage(pickerResult.uri)
      }
    } else {
      Alert.alert(
        "Please enable camera roll permissions for this app in your settings."
      );
    }
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,

      });
      if (!pickerResult.cancelled) {
        setImage(pickerResult.uri)
      }
    } else {
      Alert.alert(
        "Please enable camera roll permissions for this app in your settings."
      );
    }
  }

  const getPictureBlob = async (uri: String) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
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
    setUploading(true);
    blob = await getPictureBlob(image);
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
          console.log(url)
          setPicUrl(url)
        })
        .catch((error) => {
          console.log(error)
        })
    }).catch((err) => {
      console.log('ERRORRRRR', err.name)
    })
  };

  const submitPost = async () => {
    try {
      await firebase.firestore().collection('users').doc(props.userId).update({ profilePicture: (urlPic) })
      setUploading(false);
    } catch (err) {
      console.log(err)
    }
  }

  const UpdateImage = async () => {
    setStart(true)
    let imgUrl = await uploadImageToBucket();
    submitPost()
    setResetPic(!resetPic)
  };

  const launchEditor = (uri: string) => {
    setImage(uri);;
  }

  const changeProfile = async () => {
    console.log('HEHEHEH')
    console.log(resetPic);
    setResetPic(!resetPic)
  }

  const reset = () => {
    setImage(null)
    setUrl(null)
    setStart(false)
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

  }, [profilePicture, resetPic]);

  return (
    <View style={styles.outerContainer}>
      {props.profilePic && !resetPic ?
        <View style={styles.profileImage}>
          <Image style={{ height: 100, width: 100, borderRadius: 50 }} source={{ uri: props.profilePic }} />
          <TouchableHighlight onPress={changeProfile} style={styles.refresh}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <Image style={{ height: 20, width: 20 }} source={require('../../assets/icons/changeIcon.png')} />
              <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1, paddingRight: 3 }}>Change</Text>
            </View>
          </TouchableHighlight>
        </View>
        :
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={() => openCamera()} >
              <Image source={require('../../assets/icons/CameraIcon.png')} style={styles.loadingIcon} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => pickImage()} >
              <Image source={require('../../assets/icons/imageSelect_2.png')} style={styles.loadingIcon} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => UpdateImage()} >
              {start ? <View>{uploading ? <Image style={styles.loadingIcon} source={require('../../assets/icons/loading.gif')} /> : <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/greenTickBox.png')} />}</View> : <Image style={styles.tickBox} source={require('../../assets/icons/tickBox.png')} />}
            </TouchableHighlight>
          </View>
          <View>
            {image ? <Image source={{ uri: image }} style={styles.imageView} /> : <View style={styles.imageContainer}><Image source={ProfileImage} style={{ ...styles.holdingImage, marginTop: 2 }} /></View>}
          </View>
        </View>
      }
    </View>
  );
}

export default App

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    height: 140,
  },
  buttonContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  imageContainer: {
  },
  holdingImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  loadingIcon: {
    width: 40,
    height: 40,
  },
  tickBox: {
    width: 39,
    height: 39,
  },
  button: {
    backgroundColor: "#44D0DF",
    minWidth: 100,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  imageView: {
    height: 100,
    width: 100,
    borderWidth: 2,
    backgroundColor: "#fff"
  },
  profileImage: {
  },
  refresh: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
})