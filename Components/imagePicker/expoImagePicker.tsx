import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../Inputs";
import {
  ActivityIndicator,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
  LogBox,
} from "react-native";
import * as Clipboard from "expo-clipboard";
// import uuid from "uuid"
// console.log('UUSID', uuid.v4())

// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const App : FC <Props> = (props) => {
//   state = {
//     image: null,
//     uploading: false,
//   };

    const [imageSelect, setImage] = useState<any | null>(null)
    const [uploading, setUploading] = useState<boolean>(false)

  const permissions = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }
  
    useEffect(() => {
        permissions()
    }, [])


//   render() {
//     let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {!!imageSelect && (
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

        <Button onPress={takePhoto} title="Take a photo" />
        
        {maybeRenderImage()}
        {maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  const maybeRenderUploadingOverlay = () => {
    if (uploading === true) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  maybeRenderImage = () => {
    const imageSelect = imageSelect;
    if (!imageSelect) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: imageSelect }} style={{ width: 250, height: 250 }} />
        </View>
        <Text
          onPress={copyToClipboard}
        //   onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        >
          {imageSelect}
          HELLO
        </Text>
      </View>
    );
  };
  export default App;

//   _share = () => {
//     Share.share({
//       message: this.state.image,
//       title: "Check out this photo",
//       url: this.state.image,
//     });
//   };

  const copyToClipboard = () => {
    Clipboard.setString(imageSelect);
    alert("Copied image URL to clipboard");
  };

  const takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    handleImagePicked(pickerResult);
  };

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log({ pickerResult });

    handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
        setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage( uploadUrl );
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
        setUploading(false);
    }
  };


async function uploadImageAsync(uri) {
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

// function maybeRenderUploadingOverlay(): React.ReactNode {
//     throw new Error("Function not implemented.");
// }
function maybeRenderImage(): React.ReactNode {
    throw new Error("Function not implemented.");
}

