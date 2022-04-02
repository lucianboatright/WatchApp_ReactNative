import React, { FC } from "react";
import { Dimensions, TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";

const {height, width} = Dimensions.get('screen')
 
interface Props {
    title: string;
    text: string;
    filterNumber: number;
    onPress: () => void;
}

const App :  React.FC <Props> = (props) => {
    // const navigate = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.filterNumber} are {props.text}</Text>
            <TouchableOpacity style={styles.button} onPress={() => props.onPress}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default App;

const styles = StyleSheet.create ({
    saleFilter: {
        flexDirection: 'row',
        marginTop: 2
    },
    filterText: {
        marginLeft: 10,
        // marginTop: 9,
        fontSize: 15,
    },
    buttonText: {
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 3,
        color: 'white',
        paddingLeft: 5,
        paddingRight: 5,
    },
    filterButton: {
        marginLeft: 5,
        backgroundColor: '#44D0DF',
        borderRadius: 10
        // marginBottom: 10
    },
})