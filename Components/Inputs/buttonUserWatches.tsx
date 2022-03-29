import React, { FC } from "react";
import { Dimensions, TextInput, View, StyleSheet, Text, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NestedScreen } from "../../ScreensOptions";
import { useNavigation } from '@react-navigation/native';


const {height, width} = Dimensions.get('screen')
 
interface Props {
    title: string;
    onPress: () => void;
    message: string;
    // otherUserId: any;
    // message: string;
}

const App :  React.FC <Props> = ( props ) => {
    const navigate = useNavigation();

    const msg = 'somthing please'
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Text>Home Screen</Text> */}
            <Button
                title={props.title}
                // onPress={() => props.navigation.navigate('NestedScreen')}
                onPress={() => navigate.navigate('NestedScreen', {message: msg})}
                // message={props.message}
            // otherUserId={props.otherUserId}
            />
        </View>
        // <View>
        //     <Button
        //         style={styles.container}
        //         title={props.title}
        //         onPress={() => 
        //             props.navigation.navigate('OtherUserWatches', props.otherUserId)
        //         }
        //     />
        // </View>

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