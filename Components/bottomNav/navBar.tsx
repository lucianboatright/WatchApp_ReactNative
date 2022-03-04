import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { Dashboard, Home } from '../../Screens';

import CustomTabBar from './tabBarLayout';

const Tab = createBottomTabNavigator();

const TabNavigator : FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="One"
                tabBar={({ state, descriptors, navigation }: BottomTabBarProps) =>
                <CustomTabBar
                    state={state}
                    descriptors={descriptors}
                    navigation={navigation}
                />
                }
            >
                <Tab.Screen name='Home' component={Home} />
                <Tab.Screen name='Dash' component={Dashboard} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigator