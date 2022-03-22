import React, { FC } from "react";
import { Dimensions, TextInput, View, StyleSheet, Text, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

const {height, width} = Dimensions.get('screen')
 
interface Props {
    title: string;
    onPress: () => void;
    otherUserId: any;
}

const App : FC <Props> = (props) => {
    return (
        <Button
            style={styles.container}
            title={props.title}
            onPress={() => 
                navigator('OtherUserWatches', props.otherUserId)
            }
        />

    )
}

export default App;

const styles = StyleSheet.create ({
    container: {
        backgroundColor: "#44D0DF",
        minWidth: 100,
        marginLeft: 10,
        marginRight: 10,
        width: '95%',
        
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius:5,
        marginVertical: 10
    },
    text: {
        color: '#fff'
    }
})