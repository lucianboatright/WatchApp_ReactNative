import React, { FC } from "react";
import { Dimensions, TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";

const {height, width} = Dimensions.get('screen')
 
interface Props {
    title: string;
    info: string;
}

const App :  React.FC <Props> = (props) => {
    // const navigate = useNavigation();
    return (
        <View style={styles.infoLine}>
            <Text style={styles.infoHeader}>{props.title}: </Text><Text>{props.info}</Text>
        </View>
    )
}

export default App;

const styles = StyleSheet.create ({
    infoHeader: {
        fontWeight: 'bold'
    },
    infoLine: {
        flexDirection: 'row',
        // width: 10
    },
})