import React, { FC, useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, Text, TouchableHighlight } from "react-native";



const { height, width } = Dimensions.get('screen')

interface Props {
    lable: string,
    filter: string | null,
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
        fontFamily: 'NunitoBold',
        // flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5
        // minWidth: '19%',
    },
    filterLables: {
        flexDirection: 'row',
        borderRadius: 10,
        // borderColor: 'red',
        // borderRadius: 10,
        // borderWidth: 1,
    },
    selectedFilter: {
        fontFamily: 'NunitoBold',
        // flexDirection: 'row',
        // marginLeft: 5,
        // minWidth: '10%',
        backgroundColor: 'red',
        fontWeight: 'bold',
        color: "white",
        // marginBottom: 1,
        height: 17,
        // width: 'auto',
        paddingLeft: 10,
        paddingRight: 10,
        // borderTopRightRadius: 10,
        // borderBottomRightRadius: 10,
        // borderRadius: 5,
        // paddingLeft: 5,
        // paddingRight: 5,
        // marginBottom: 2,
        // marginRight: 4,
        // fontSize: 12,
    },
    clearFilterButton: {
        // marginHorizontal: 5,
        // overflow: 'hidden',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'red',
        fontWeight: 'bold',
        color: 'white',
    },
})