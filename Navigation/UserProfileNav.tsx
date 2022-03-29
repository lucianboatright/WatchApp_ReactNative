import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { FC } from "react";
import { TimeLine, Home, NestedScreen } from "../ScreensOptions";

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

import {NavigationContainer} from '@react-navigation/native';

type RootStackParamsList = {
    Home: any;
    Timeline: any;
    Add: any;
    Profile: any;
    NestedScreen: {id: string};
}


const Stack = createStackNavigator<RootStackParamList>()


const HomeStackNavigator:  React.FC<RootStackParamList> = () => {

    const msg = 'hello this is a message'
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name="Home"
                component={Home}
                // options={({ route }) => ({}))}
            />

            <Stack.Screen
                name="NestedScreen"
                component={NestedScreen}
                // initialParams={{id: msg}}
            />
        </Stack.Navigator>
    )
}


const TimeLineStackNavigator: FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="TimeLine"
                component={TimeLine}
            />

            <Stack.Screen
                name="NestedScreen"
                component={NestedScreen}
            />
        </Stack.Navigator>
    )
}

export {HomeStackNavigator, TimeLineStackNavigator}