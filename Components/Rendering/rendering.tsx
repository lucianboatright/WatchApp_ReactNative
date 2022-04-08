import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { LikesButton, UserProfile, DeleteIcon, CloseWindow } from "../Inputs";
import { CommentsBar, WatchInfoLines } from ".";
import InsetShadow from 'react-native-inset-shadow'

// import Image1 = '../../assets/pictures/woodenBox_5.jpg'

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
    // sendBoxOpening: (openBox: boolean) => void;
    onPress: () => void;
}

const formatTime = (timeStamp: number) : any => {
    const calculatedTime = Date.now() - timeStamp;
    if(calculatedTime > 1000) return `${calculatedTime / 1000} s`;
    if((calculatedTime / 1000) > 60) return `${(calculatedTime / 1000) / 60 } min`;
    if(((calculatedTime / 1000) / 60) > 60) return `${((calculatedTime / 1000) / 60) / 60} hr`
    else `${(((calculatedTime / 1000) / 60) / 60) / 24} d`
}

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

    const [openBox, setOpenBox] = useState<boolean>(false)
    const [openBoxSend, setOpenBoxSend] = useState<boolean>(false)

    const sendLikes = () => {
        // console.log('clicked')

    }
    const message = props.userDetails

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    const openClicked = () => {
        console.log('pre',openBox)
        console.log('pre',openBoxSend)
        console.log('CLICKED')
        // setOpenBox(!openBox)
        // setOpenBoxSend(!openBoxSend)
        // props.sendBoxOpening(openBox)
        setOpenBox(!openBox)
        // props.sendBoxOpening(openBox)
        console.log('post',openBox)
        console.log('post',openBoxSend)
        // props.onPress
    }

    useEffect(() => {
    }, [])

    return (
        <View>
            {openBox ?  
                <View style={styles.container}>
                    <View style={styles.userHeader}>
                        <TouchableOpacity style={styles.viewBoxButton} onPress={() => navigation.navigate('NestedScreen', {id: props.userIdNumber, name: props.name})} >
                            <Text style={styles.headerTitle}>User: {props.name}</Text>
                        </TouchableOpacity>
                        <DeleteIcon postId={props.postId} postUser={props.userIdNumber} likes={props.likes} />
                        <TouchableHighlight onPress={() => (openClicked(), props.onPress)}>
                            <Image style={styles.icon} source={require('../../assets/icons/closeWindowIcon.png')} />
                        </TouchableHighlight>                        
                        <LikesButton postId={props.postId} likes={props.likes} />
                    </View>
                    <View style={styles.postContainer}>
                        <View style={styles.infoBoxContainer} >
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
                            <ImageBackground source={require('../../assets/pictures/woodenBox_5.jpg')} style={styles.imageContainerBorder}>
                                {/* <Image style={styles.imageBoxLarge} source={require('../../assets/pictures/watch_roll_blue.png')} /> */}
                                <Image style={styles.imageBox} source={{uri: props.iamge_1}} />
                            </ImageBackground>
                        </View>
                    </View>
                    <View style={styles.commentsBox}>
                        <CommentsBar postId={props.postId} comments={props.comments}/>
                    </View>
                </View>
            :   
                
                <View style={styles.imageBoxContainer}>
                    <TouchableOpacity onPress={() => (openClicked(), props.onPress)}>
                        
                        <ImageBackground source={require('../../assets/pictures/woodenBox_5.jpg')} style={styles.imageContainerBorderBox}>
                            <InsetShadow shadowOpacity={0.9} shadowOffset={0.5} >
                                {/* <View> */}
                                    <Image style={styles.imageBoxLarge} source={require('../../assets/pictures/watch_roll_blue.png')} />
                                {/* </View> */}
                            </InsetShadow>
                        </ImageBackground>
                        
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        width: "95%",
        // paddingLeft: 5,
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
    postContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    infoBoxContainer: {
        paddingLeft: 0,
        // flex: 1,
        // height: 'auto',
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
        // paddingLeft: 5,
        // paddingTop: 5,
        fontWeight: 'bold',
        borderColor: 'black',
        fontSize: 20,
    },
    icon: {
        marginTop: 2,
        height: 30,
        width: 30
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
        // flex: 1,
        // margin: 5,

    },

    imageContainerBorder: {
        // marginLeft: 5,
        // padding: 6,
        flex: 1,
        // margin: 5,
        // height: "70%",
        // width: "100%",
        height: "100%",
        width: "99.5%",
    },
    imageBox: {
        borderRadius: 5,
        height: 300,
        width: 180,
        margin: 10
        // flex: 1,
        // borderRadius: 10,
        // borderBottomRightRadius: 10,
        // marginTop: 9,
        // marginBottom: 9,
        // marginLeft: 9,
        // marginRight: 9,
    },

    imageBoxContainer: {
        // paddingLeft: 6,
    //    paddingLeft: 'auto',
    //    paddingRight: 'auto',
    // padding: 7,
        // flex: 1,
        width: '100%',
    },
    imageContainerBorderBox: {
        // marginLeft: 5,
        flex: 1,
        // margin: 2,
        // padding: 6,
        height: "100%",
        width: "100%",
    },
    imageBoxLarge: {
        // justifyContent: 'center', 
        // alignSelf: 'center',
        margin: 13,
        height: 250,
        width: 165,
        // borderRadius: 10,
        // borderRadius: 0,
        // backgroundColor: '#fff',
        
        // shadowOffset: {
        //     width: 3,
        //     height: 3
        // },
        // shadowColor: '#ccc',
        // shadowOpacity: 0.7
    },

    likeIcon: {
        height: 30,
        width: 30,
    },
    commentsBox: {
        margin: 5,
    },
    viewBoxButton: {
        backgroundColor: '#44D0DF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 5,
        // marginLeft: 5,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        width: 'auto',
        minWidth: '45%'
    },
    viewBoxButtonText: {
    },
})