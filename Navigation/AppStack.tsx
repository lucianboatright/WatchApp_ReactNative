import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// import { Home, AuthDashboard } from '../Screens';

import TabNavigator from '../Components/bottomNav/navBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

// const { Navigator, Screen } = createStackNavigator();

const AppStack : FC = () => {
    return (
        <SafeAreaProvider>
            <SafeArea>
                <TabNavigator />
            </SafeArea>
        </SafeAreaProvider>

    )
}

export default AppStack;