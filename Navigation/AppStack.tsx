import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home, AuthDashboard } from '../Screens';


const { Navigator, Screen } = createStackNavigator();

const AppStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="Home" component={Home} />
            <Screen name="AuthDashboard" component={AuthDashboard} />
        </Navigator>

    )
}

export default AppStack;