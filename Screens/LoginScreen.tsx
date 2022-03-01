import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoginScreen : FC = () => {
    return (
        <View style={styles.container}>
            <Text>Hello From LOGIN</Text>
        </View>
    )
}

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})