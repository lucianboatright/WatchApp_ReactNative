import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { FC } from "react";
import { TimeLine, Home, NestedScreen } from "../ScreensOptions";

const Stack = createStackNavigator()


const HomeStackNavigator: FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
            />

            <Stack.Screen
                name="NestedScreen"
                component={NestedScreen}
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