import React, { FC, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'

import { useNavigation,  } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigator } from 'react-navigation';

interface Props {
    message: any;
}

const NestedScreen:  React.FC<Props> = ({ route, navigation }) => {

    // const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
    // useEffect(() => {
    //     console.log('Im in the nested page', props.message)
    // })

   const { message } = route.params

    return (
        <View style={styles.screen}>
            <Text style={styles.text}>fdsafds</Text>
            <Text style={styles.text}>message please{JSON.stringify(message)}</Text>
            {/* <Text style={styles.text}>{props.message}fdsafds</Text>
            <Text style={{fontSize: 30}}>Messager:{props.message}</Text> */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </TouchableOpacity>
            {/* <Button title="GOBACK" onPress={navigation.goBack()} /> */}
        </View>
    )
}

export default NestedScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000025',
    },
    text:{
        color:'#000',
        fontWeight:'700',
        fontSize:30,
    },
})