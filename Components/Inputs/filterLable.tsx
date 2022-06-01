import React, { FC, useEffect } from "react";
import { Dimensions, View, StyleSheet, Text, TouchableHighlight } from "react-native";



const { height, width } = Dimensions.get('screen')

interface Props {
    lable: string,
    filter: any | null,
    clearButton: () => void
}

const App: FC<Props> = (props) => {


    useEffect(() => {

    }, [])

    return (
        <View style={styles.filterLables}>
            <Text style={styles.labelText}>
                {props.lable}
            </Text>
            {props.filter ?
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.selectedFilter}>
                        {props.filter}
                    </Text>
                    <TouchableHighlight onPress={() => props.clearButton()}>
                        <Text style={styles.clearFilterButton}>X</Text>
                    </TouchableHighlight>
                </View>
                :
                null
            }
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    labelText: {
        fontFamily: 'NunitoSemiBold',
        marginLeft: 5,
        marginRight: 5
    },
    filterLables: {
        flexDirection: 'row',
    },
    selectedFilter: {
        fontFamily: 'NunitoSemiBold',
        backgroundColor: 'red',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        color: "white",
        paddingLeft: 10,
        paddingRight: 5,
    },
    clearFilterButton: {
        paddingLeft: 5,
        paddingRight: 10,
        backgroundColor: 'red',
        fontWeight: 'bold',
        color: 'white',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
})