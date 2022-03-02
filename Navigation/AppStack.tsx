import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home, Dashboard } from '../Screens';

const { Navigator, Screen } = createStackNavigator();

const AppStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="Home" component={Home} />
            <Screen name="Dashboard" component={Dashboard} />
        </Navigator>

    )
}

export default AppStack;