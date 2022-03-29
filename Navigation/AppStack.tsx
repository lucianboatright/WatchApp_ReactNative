import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native'
import { Dashboard, Home, AddWatch, TimeLine } from "../ScreensOptions";

import { HomeStackNavigator, TimeLineStackNavigator } from './UserProfileNav';


type RootStackParamsList = {
  Home: undefined;
  Timeline: undefined;
  Add: undefined;
  Profile: undefined;
}


const Tab = createBottomTabNavigator();

const { Navigator, Screen } = createStackNavigator();

const AppStack :  React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                  }}
            />
            <Tab.Screen
                name="Timneline"
                component={TimeLineStackNavigator}
                options={{
                    tabBarLabel: 'Timneline',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="table-network" color={'green'} size={size} />
                    ),
                  }}
            />
            <Tab.Screen
                name="Add"
                component={AddWatch}
                options={{
                    tabBarLabel: 'Add',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="plus-outline" color={'red'} size={45} />
                    ),
                  }}
            />
            <Tab.Screen
                name="Profile"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="account-settings" color={'blue'} size={size} />
                    ),
                  }}
                
            />
        </Tab.Navigator>

    )
}

export default AppStack;