import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight, TouchableOpacity, ImageBackground, Pressable, Modal, ScrollView, StatusBar } from "react-native";
import { LikesButton, DeleteIcon, CommentsBar, WatchInfoLines } from "../Inputs";


import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';

const { width, height } = Dimensions.get('screen')

interface Props {
    userName: string;
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
    year: string;
    watchStyle: string;
    postId: any;
    likes: any;
    comments: any;
    userIdNumber: any;
    onApprove: () => void;
    onReject: () => void;
}

const formatTime = (timeStamp: number): any => {
    const calculatedTime = Date.now() - timeStamp;
    if (calculatedTime > 1000) return `${calculatedTime / 1000} s`;
    if ((calculatedTime / 1000) > 60) return `${(calculatedTime / 1000) / 60} min`;
    if (((calculatedTime / 1000) / 60) > 60) return `${((calculatedTime / 1000) / 60) / 60} hr`
    else `${(((calculatedTime / 1000) / 60) / 60) / 24} d`
}

type RootStackParamsList = {
    Home: any;
    Timeline: any;
    Add: any;
    Profile: any;
    SettingsScreen: any;
    NestedScreen: {
        id: string,
        userName: string,
    };
}


const App: React.FC<Props> = (props) => {

    const [openBox, setOpenBox] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const message = props.userDetails

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    const openClicked = () => {
        setOpenBox(!openBox)
    }

    useEffect(() => {
    }, [])

    return (
        <View>
            <View style={{ backgroundColor: '#EAE8E3' }}>
                {openBox ?
                    <View style={styles.container}>
                        <View style={styles.userHeader}>
                            <TouchableOpacity style={styles.viewBoxButton} onPress={() => navigation.navigate('NestedScreen', { id: props.userIdNumber, userName: props.userName })} >
                                <Text numberOfLines={1} style={styles.headerTitle}>User: {props.userName}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '46%' }}>
                                <DeleteIcon postId={props.postId} postUser={props.userIdNumber} likes={props.likes} />
                                <TouchableHighlight onPress={() => (openClicked())}>
                                    <Image style={styles.icon} source={require('../../assets/icons/closeWindowIcon.png')} />
                                </TouchableHighlight>
                                <LikesButton postId={props.postId} likes={props.likes} />
                            </View>
                        </View>
                        <View style={styles.postContainer}>
                            <View style={styles.infoBoxContainer} >
                                <View style={styles.message}>
                                    <Text style={styles.font}>Massage: </Text>
                                    <Text style={styles.font}>{props.message}</Text>
                                </View>
                                <View style={styles.infoBox}>
                                    <WatchInfoLines title="Brand" info={props.brand} />
                                    <WatchInfoLines title="Case Size" info={props.caseSize} />
                                    <WatchInfoLines title="Material" info={props.caseMaterial} />
                                    <WatchInfoLines title="lug Width" info={props.lugsWidth} />
                                    <WatchInfoLines title="Mechanism" info={props.mechanism} />
                                    <WatchInfoLines title="Year" info={props.year} />
                                    <WatchInfoLines title="Type" info={props.watchStyle} />
                                    <WatchInfoLines title="Cost" info={props.cost} />
                                </View>
                            </View>
                            <View style={styles.imageContainer}>
                                <Pressable onPress={() => setOpenModal(!openModal)}>
                                    <ImageBackground source={require('../../assets/pictures/woodenBox_5.png')} style={styles.imageContainerBorder}>
                                        <Image style={styles.imageBoxInCard} source={{ uri: props.iamge_1 }} />
                                    </ImageBackground>
                                </Pressable>

                                <Modal visible={openModal} >
                                    <View style={{ backgroundColor: '#EAE8E3' }}>
                                        {/* style={{ height: (StatusBar.currentHeight), backgroundColor: '#CDC9BC' }} */}
                                        <View style={{ marginTop: 45, padding: 5, borderBottomColor: '#CDC9BC', borderBottomWidth: 0.5, backgroundColor: '#EAE8E3', }}>
                                            <View>
                                                <TouchableOpacity style={styles.goBackButton} onPress={() => setOpenModal(!openModal)}>
                                                    <Text style={styles.goBackText}>X</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={{ fontFamily: 'NunitoBold', color: "#143642" }}>Name: {props.brand}</Text>
                                            <Text style={{ fontFamily: 'NunitoBold', color: "#143642" }}>Message: {props.message}</Text>
                                        </View>
                                        <View >
                                            <ScrollView>
                                                <ImageBackground source={require('../../assets/pictures/woodenBox_5.png')} style={styles.imageContainerBorder}>
                                                    <Image style={styles.imageBoxDisplay} source={{ uri: props.iamge_1 }} />
                                                </ImageBackground>
                                                <ImageBackground source={require('../../assets/pictures/woodenBox_5.png')} style={styles.imageContainerBorder}>
                                                    <Image style={styles.imageBoxDisplay} source={{ uri: props.iamge_2 }} />
                                                </ImageBackground>
                                                <ImageBackground source={require('../../assets/pictures/woodenBox_5.png')} style={styles.imageContainerBorder}>
                                                    <Image style={styles.imageBoxDisplay} source={{ uri: props.iamge_3 }} />
                                                </ImageBackground>
                                                <ImageBackground source={require('../../assets/pictures/woodenBox_5.png')} style={styles.imageContainerBorder}>
                                                    <Image style={styles.imageBoxDisplay} source={{ uri: props.iamge_4 }} />
                                                </ImageBackground>
                                            </ScrollView>
                                        </View>
                                    </View>

                                </Modal>

                            </View>
                        </View>
                        <View style={styles.commentsBox}>
                            <CommentsBar postId={props.postId} comments={props.comments} />
                        </View>
                    </View>
                    :
                    <View style={styles.imageBoxContainer}>
                        <TouchableOpacity onPress={() => (openClicked())}>
                            <ImageBackground source={require('../../assets/pictures/woodenBox_5.png')} style={styles.imageContainerBorderBox}>
                                <Image style={styles.imageBoxTest} source={{ uri: props.iamge_1 }} />
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        width: (width - 15),
        marginLeft: 'auto',
        marginRight: 'auto',
        alignSelf: 'center',
        marginVertical: 10,
        paddingBottom: 0,
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
        justifyContent: 'space-between',
    },
    infoBoxContainer: {
        width: '48%',
        paddingLeft: 0,
    },
    goBackButton: {
        backgroundColor: '#B76935',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        marginTop: -5,
        height: 20,
        width: 20,
        // display: 'flex',
        // justifyContent: 'flex-end',
        alignSelf: 'flex-end',

    },
    goBackText: {
        color: '#DAD7CD',
        fontWeight: 'bold',
        fontSize: 15,
    },
    infoBox: {
        borderWidth: 0.5,
        borderBottomLeftRadius: 10,
        borderColor: '#B76935',
        paddingLeft: 5,
    },
    font: {
        fontFamily: 'NunitoBold',
        color: '#143642',
    },
    fontButton: {
        fontFamily: 'NunitoBold',
        color: 'white',
    },
    button: {
        marginTop: 5,
        alignItems: 'center',
        backgroundColor: '#44D0DF',
        borderRadius: 5,

    },
    userHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5
    },
    icon: {
        marginTop: 2,
        height: 30,
        width: 30
    },
    message: {
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,
        padding: 4,
        paddingLeft: 5,
        flex: 1,
        marginBottom: 0,
        borderColor: '#B76935'
    },
    imageContainer: {
        flex: 1,
    },
    imageContainerBorderBox: {
        aspectRatio: 10.3 / 16,
        flex: 1,
        paddingTop: 13,
        paddingBottom: 12,
        paddingLeft: 10,
    },
    imageBoxTest: {
        borderRadius: 5,
        flex: 1,
        aspectRatio: 10 / 16,
    },
    imageContainerBorder: {
        aspectRatio: 10.3 / 16,
        flex: 1,
        paddingTop: 13,
        paddingBottom: 12,
        paddingLeft: 10,
    },
    imageBoxInCard: {
        borderRadius: 5,
        flex: 1,
        aspectRatio: 10 / 16,
    },
    imageBoxDisplay: {
        borderRadius: 5,
        display: 'flex',
        marginRight: 20,
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 22,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        aspectRatio: 10 / 16,
    },
    imageBoxContainer: {
        flex: 1,
        width: (width - 10) / 2,
    },
    imageBoxLarge: {
        marginLeft: 10,
        marginTop: 3,
        marginBottom: 8,
        marginRight: 3,
        flex: 1,
        aspectRatio: 10 / 16,
        borderRadius: 10,
    },
    likeIcon: {
        height: 30,
        width: 30,
    },
    commentsBox: {
        margin: 5,
    },
    viewBoxButton: {
        backgroundColor: '#DAD7CD',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 5,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        width: 10,
        minWidth: '48%',
        flexDirection: 'row',
    },
    headerTitle: {
        fontWeight: 'bold',
        borderColor: 'black',
        color: '#143642',
        fontSize: 20,
        flex: 1,
    },
    viewBoxButtonText: {
    },
})