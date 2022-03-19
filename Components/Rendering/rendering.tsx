import React, { FC, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight } from "react-native";
import { LikesButton } from "../Inputs";

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
    // onApprove: () => void;
    // onReject: () => void;
}

const formatTime = (timeStamp: number) : any => {
    const calculatedTime = Date.now() - timeStamp;
    if(calculatedTime > 1000) return `${calculatedTime / 1000} s`;
    if((calculatedTime / 1000) > 60) return `${(calculatedTime / 1000) / 60 } min`;
    if(((calculatedTime / 1000) / 60) > 60) return `${((calculatedTime / 1000) / 60) / 60} hr`
    else `${(((calculatedTime / 1000) / 60) / 60) / 24} d`
}

const App : FC <Props> = (props) => {

    // useEffect(() => {
    //     Image.getSize('uri', (width, height) => {
    //         console.log({ width, height });
    //       });
    
    // })
    const sendLikes = () => {
        console.log('clicked')

    }

    const Image_1 = props.iamge_1
    return (
        <View style={styles.container}>
            <View style={styles.userHeader}>
                <Text style={styles.headerTitle}>User: {props.name}</Text>
                <LikesButton postId={props.postId} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.infoBoxContainer} >
                    {/* <Text>Test</Text> */}
                    <View style={styles.message}>
                        <Text style={styles.infoHeader}>Massage: </Text>
                        <Text>{props.message}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <View style={styles.infoLine}>
                            <Text style={styles.infoHeader}>Brand: </Text><Text>{props.brand}</Text>
                        </View>
                        <View style={styles.infoLine}>
                        <Text style={styles.infoHeader}>Case Size: </Text><Text>{props.caseSize}</Text>
                        </View>
                        <View style={styles.infoLine}>
                            <Text style={styles.infoHeader}>Material: </Text><Text>{props.caseMaterial}</Text>
                        </View>
                        <View style={styles.infoLine}>
                            <Text style={styles.infoHeader}>Lug Width:</Text><Text>{props.lugsWidth}</Text>
                        </View>
                        <View style={styles.infoLine}>
                            <Text style={styles.infoHeader}>Mechanism: </Text><Text>{props.mechanism}</Text>
                        </View>
                        <View style={styles.infoLine}>
                            <Text style={styles.infoHeader}>Cost: </Text><Text>{props.cost}</Text>
                        </View>
                    </View>
     
                    {/* <Text>{formatTime(props.timeStamp)}</Text> */}
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageBox} source={{uri: props.iamge_1}} />
                </View>
            </View>
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button title="Approve" onPress={() => props.onApprove} />
                <Button title="Reject" onPress={() => props.onReject} />
            </View> */}
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
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: '#ccc',
        shadowOpacity: 0.7
        
    },
    infoHeader: {
        fontWeight: 'bold'
    },
    infoLine: {
        flexDirection: 'row',
        // width: 10
    },
    infoBoxContainer: {
        // width: '48%',
        paddingLeft: 0,
        flex: .5,
        height: 'auto',
    },
    infoBox: {
        borderWidth: 1,
        borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        // width: '95%',
        paddingLeft: 5,
    },
    userHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // marginBottom: 5,

    },
    headerTitle: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 5,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
    },
    message: {
        borderWidth: 1,
        padding: 4,
        paddingLeft: 5,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        marginBottom: 0,
        // width: '95%',
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
    }
})