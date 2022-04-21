import React, { FC, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
  TouchableOpacity,
  Dimensions,
  Button,
  TouchableHighlight
} from "react-native";
import firebase from "firebase/compat/app";
import { getAuth, signOut } from 'firebase/auth'
import "firebase/compat/auth"
import "firebase/compat/firestore"
import MultiLineInput from "./multiLineInput";


interface Props {
  postId: any;
  comments: any;
}

const { width } = Dimensions.get('window');

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const App: FC<Props> = (props) => {
  const [comments, setComments] = useState<any>(null)
  const [message, setMessage] = useState<any>(null)

  const [userId, setUserId] = useState<any>(null)
  const [userName, setUserName] = useState<any>(null)

  const auth = getAuth()

  const getUserDetails = async () => {
    const auth = getAuth()
    const uid = auth.currentUser?.uid

    setUserId(uid)
    const user = await firebase.firestore().collection('users').doc(uid).get();
    setUserName(user.data().name)
  }



  const uploadComment = async () => {
    firebase.firestore().collection('posts').doc(props.postId).update({ comments: firebase.firestore.FieldValue.arrayUnion({ userId, userName, message }) })
  }

  useEffect(() => {
    getUserDetails()

  }, [userName])

  return (
    <View style={styles.container}>
      {/* <Button title="testing" onPress={testing}/> */}
      <View style={styles.addComment}>
        <TouchableOpacity style={styles.submitButtonContainer} onPress={uploadComment}>
          <Text style={styles.submitButton}>Submit Comment</Text>
        </TouchableOpacity>
        <MultiLineInput sendMessage={(text) => setMessage(text)} setBorder={{ borderBottomWidth: 0.5, borderColor: 'grey' }} setHeight={{ padding: 10, height: 50 }} />
      </View>
      <View>
        <View>
          <FlatList
            data={props.comments}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(comment) => {
              return (
                <View style={styles.listItem}>
                  <Text style={styles.commentTitle}>User: {comment.item.userName}</Text>
                  <View>
                    <Text>Comment:</Text><Text style={styles.commentBody}>{comment.item.message}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // backgroundColor: "#ecf0f1",
    height: 'auto',
  },
  listItem: {
    backgroundColor: "white",
    // borderWidth: 1,
    // borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    // borderColor: "#333",
    padding: 5,
    width: 200,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.4,
    // shadowRadius: 5,  
    // elevation: 5
  },
  flatList: {
    // paddingHorizontal: 16,
    // paddingVertical: 16,
  },
  commentTitle: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontWeight: 'bold'
  },
  commentBody: {

  },
  submitButtonContainer: {
    backgroundColor: "#44D0DF",
    // borderRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '40%'
  },
  submitButton: {
    color: 'white',
    padding: 2,
    paddingLeft: 13,
    fontWeight: 'bold',

  },
  text: { color: "white", fontWeight: 'bold' }
});