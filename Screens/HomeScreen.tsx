import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen : FC = () => {
    return (
        <View style={styles.container}>
            <Text>Hello From HOME</Text>
        </View>
    )
}

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})