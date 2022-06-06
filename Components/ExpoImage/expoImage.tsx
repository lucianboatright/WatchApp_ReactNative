import React, { useState, useEffect, FC } from 'react';
import { Image, View, Platform, Text, StyleSheet, Alert, TouchableHighlight, Dimensions, Button } from 'react-native';
// import { Button } from '../Inputs';
import * as ImagePicker from 'expo-image-picker';
import { ImageEditor } from "expo-image-editor";
import { Camera } from 'expo-camera';
// import { Button } from '../Inputs';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import uuid from 'react-native-uuid';
import { useLinkProps } from '@react-navigation/native';


const { height, width } = Dimensions.get('screen')

interface Props {
  sendUrl: (url: any | null) => void;
  watchImage: any;
  margintop: any;
}

const App: FC<Props> = (props) => {
  const [image, setImage] = useState<any | null>(null);

  const [uploading, setUploading] = useState<boolean>(false)

  const [update, setUpdate] = useState<any>(null)

  const [start, setStart] = useState<boolean>(false)

  const [url, setUrl] = useState<any | null>(null)

  const [marginHeight, setMarginHeight] = useState<any | null>(null)

  const [editorVisible, setEditorVisible] = useState<boolean>(false);

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
    // try {
    setUploading(true);
    blob = await getPictureBlob(image);
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
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

  const launchEditor = (uri: string) => {
    setImage(uri);;
    // console.log(uri);
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

  }, []);

  return (
    <View style={styles.outerContainer}>
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
          {image ? <Image source={{ uri: image }} style={styles.imageView} /> : <View style={styles.imageContainer}><Image source={props.watchImage} style={{ ...styles.holdingImage, marginTop: props.margintop }} /></View>}
        </View>
      </View>
    </View>
  );
}

export default App

const styles = StyleSheet.create({
  outerContainer: {
    width: '50%'

  },
  container: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: "#012A4A",
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#EAE8E3"
  },
  buttonContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: "#012A4A",
    backgroundColor: '#DAD7CD',
  },
  imageContainer: {
    height: 150
  },
  holdingImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
    margin: 5
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
    height: 275,
    width: 175,
    borderWidth: 2,

  }
})