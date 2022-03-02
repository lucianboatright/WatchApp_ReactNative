import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Signup, Login } from '../Screens';

const { Navigator, Screen } = createStackNavigator();

const AuthStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="Signup" component={Signup} />
            <Screen name="Login" component={Login} />
        </Navigator>

    )
}

export default AuthStack;