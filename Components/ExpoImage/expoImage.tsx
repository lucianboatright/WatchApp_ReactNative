import React, { useState, useEffect, FC } from 'react';
import { Image, View, Platform, Text, StyleSheet, Button, Alert, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageEditor } from "expo-image-editor";
import { Camera } from 'expo-camera';
// import { Button } from '../Inputs';
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

  const [pickedImagePath, setPickedImagePath] = useState('');

  const [editorVisible, setEditorVisible] = useState<boolean>(false);


//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

    const pickImage = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted) {
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [10, 16],
                quality: 1,

            });
            // Check they didn't cancel the picking
            if (!pickerResult.cancelled) {
              launchEditor(pickerResult.uri);
            }
          } else {
            // If not then alert the user they need to enable it
            Alert.alert(
              "Please enable camera roll permissions for this app in your settings."
            );
          }
        // if (permissionResult.granted === false) {
        // alert("You've refused to allow this appp to access your photos!");
        // return;
        // }

        // const result = await ImagePicker.launchImageLibraryAsync();

        // // Explore the result
        // console.log(result);

        // if (!result.cancelled) {
        //     launchEditor(result.uri)
        // }
    }

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
          setImage(result.uri);;
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

  const launchEditor = (uri: string) => {
    setImage(uri);;
    console.log(uri);
  }



//   const Passing = async () => {
//     if (update === true) {

//     }
//   }
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
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={() => openCamera} >
                <Image source={require('../../assets/icons/CameraIcon.png')} style={styles.loadingIcon} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => pickImage} >
                <Image source={require('../../assets/icons/imageSelect_2.png')} style={styles.loadingIcon} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => UpdateImage} >
                <Image source={require('../../assets/icons/iamgeUpload_2.png')} style={styles.loadingIcon} />
            </TouchableHighlight>
        </View>
      {image && <Image source={{ uri: image }} style={styles.imageView} />}
      <View style={{flexDirection: 'row'}}>
        {start ?  <View>{uploading ? <Image style={styles.loadingIcon} source={require('../../assets/icons/loading.gif')} /> : <Image style={{width: 50, height: 50}} source={require('../../assets/icons/complete.png')} />}</View> : null}
      </View>
      <Button title='RESET IMAGE' onPress={reset} />
      <ImageEditor
        visible={editorVisible}
        onCloseEditor={() => setEditorVisible(false)}
        imageUri={image}
        fixedCropAspectRatio={10 / 16}
        // lockAspectRatio={aspectLock}
        minimumCropDimensions={{
          width: 175,
          height: 275,
        }}
        onEditingComplete={(result) => {
          setImage(result);
        }}
        mode="full"
      />
    </View>
  );
}

export default App

const styles = StyleSheet.create({
    container: {
        // flex: .5,
        alignItems: 'center',
        justifyContent: 'flex-start' ,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        // height: 200,
        // width: 200,
        margin: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    loadingIcon: {
        width: 40,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
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
        borderRadius:5,
        marginVertical: 10,
    },
    imageView: {
        height: 275,
        width: 175,
        borderWidth: 2,
        backgroundColor: "#fff" 
    }
})