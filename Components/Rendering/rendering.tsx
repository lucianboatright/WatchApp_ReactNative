import React, { FC, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight, FlatList, TouchableOpacity } from "react-native";
import { LikesButton, UserProfile } from "../Inputs";
import { CommentsBar, WatchInfoLines } from ".";

import { NestedScreen } from "../../ScreensOptions";

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';

const { width, height } = Dimensions.get('screen')

interface Props {
    name: string;
    message: string;
    iamge_1: string;
    iamge_2: string;
    iamge_3: string;
    iamge_4: string;
    brand: string;
    caseSize: string;
    caseMaterial: string;
    lugsWidth: string;
    mechanism: string;
    cost: string;
    userDetails: object;
    approved: string;
    timeStamp: number;
    postId: any;
    likes: any;
    comments: any;
    userIdNumber: any;
    onApprove: () => void;
    onReject: () => void;
}

const formatTime = (timeStamp: number) : any => {
    const calculatedTime = Date.now() - timeStamp;
    if(calculatedTime > 1000) return `${calculatedTime / 1000} s`;
    if((calculatedTime / 1000) > 60) return `${(calculatedTime / 1000) / 60 } min`;
    if(((calculatedTime / 1000) / 60) > 60) return `${((calculatedTime / 1000) / 60) / 60} hr`
    else `${(((calculatedTime / 1000) / 60) / 60) / 24} d`
}

// interface Props {
//     navigation: any
//   }

type RootStackParamsList = {
    Home: any;
    Timeline: any;
    Add: any;
    Profile: any;
    NestedScreen: {
        id: string,
        name: string,
    };
}


const App : React.FC <Props> = (props) => {

    const sendLikes = () => {
        // console.log('clicked')

    }
    const message = props.userDetails

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    useEffect(() => {
        // console.log('USER DETAILS',props.name)
    })

    const Image_1 = props.iamge_1
    return (
        <View style={styles.container}>
            <View style={styles.userHeader}>
                <Text style={styles.headerTitle}>User: {props.name}</Text>
                <TouchableOpacity style={styles.viewBoxButton} onPress={() => navigation.navigate('NestedScreen', {id: props.userIdNumber, name: props.name})} >
                    <Text style={styles.viewBoxButtonText}>View {props.name} Watch Box</Text>
                </TouchableOpacity>
                <LikesButton postId={props.postId} likes={props.likes} />
            </View>
            <View style={styles.postContainer}>
                <View style={styles.infoBoxContainer} >
                    {/* <Text>Test</Text> */}
                    <View style={styles.message}>
                        <Text style={styles.infoHeader}>Massage: </Text>
                        <Text>{props.message}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <WatchInfoLines title="Brand" info={props.brand} />
                        <WatchInfoLines title="Case Size" info={props.caseSize} />
                        <WatchInfoLines title="Material" info={props.caseMaterial} />
                        <WatchInfoLines title="lug Width" info={props.lugsWidth} />
                        <WatchInfoLines title="Mechanism" info={props.mechanism} />
                        <WatchInfoLines title="Cost" info={props.cost} />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageBox} source={{uri: props.iamge_1}} />
                </View>
            </View>
            <View style={styles.commentsBox}>
                <CommentsBar postId={props.postId} comments={props.comments}/>
            </View>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center',
        marginVertical: 10,
        paddingBottom: 0,
        // paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    infoBoxContainer: {
        paddingLeft: 0,
        flex: .5,
        height: 'auto',
    },
    infoBox: {
        borderWidth: 1,
        borderBottomLeftRadius: 10,
        borderColor: 'grey',
        // borderBottomRightRadius: 10,
        // width: '95%',
        paddingLeft: 5,
    },
    userHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // marginBottom: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,  
        elevation: 5
    },
    headerTitle: {
        paddingLeft: 5,
        paddingTop: 5,
        fontWeight: 'bold',
        borderColor: 'black',
        fontSize: 20,
    },
    message: {
        borderWidth: 1,
        padding: 4,
        paddingLeft: 5,
        flex: 1,
        marginBottom: 0,
        borderColor: 'grey' 
    },
    imageContainer: {
        flex: .5,
    },
    imageBox: {
        flex: 1,
        marginTop: 'auto',
        marginBottom: 'auto',
        // marginLeft: 2,
        // marginTop: 5,
        height: 280,
        width: 185,
        // borderRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: '#ccc',
        shadowOpacity: 0.7
    },
    likeIcon: {
        height: 30,
        width: 30,
    },
    commentsBox: {
        margin: 5,
    },
    postContainer: {
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,  
        elevation: 5,
    },
    viewBoxButton: {
        backgroundColor: '#44D0DF',
        borderRadius: 5
    },
    viewBoxButtonText: {
        paddingTop: 7,
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white',
        fontWeight: 'bold'
    },
})