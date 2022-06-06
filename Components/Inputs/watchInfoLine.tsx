import React, { FC } from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";

const { height, width } = Dimensions.get('screen')

interface Props {
    title: string;
    info: string;
}

const App: React.FC<Props> = (props) => {
    return (
        <View style={styles.infoLine}>
            <Text style={styles.infoHeader}>{props.title}: </Text><Text style={styles.infoHeader}>{props.info}</Text>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    infoHeader: {
        fontFamily: 'NunitoBold',
        color: "#143642"
    },
    infoLine: {
        flexDirection: 'row',
    },
})