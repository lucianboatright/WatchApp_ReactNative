import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

interface Props {
    // message: string;
}

const NestedScreen: FC <Props> = (props) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>hjklgjkh</Text>
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