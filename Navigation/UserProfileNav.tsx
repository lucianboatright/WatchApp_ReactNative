import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { FC } from "react";
import { TimeLine, Home, NestedScreen } from "../ScreensOptions";

type RootStackParamsList = {
    Home: any;
    Timeline: any;
    Add: any;
    Profile: any;
    NestedScreen: { id: string };
}


const Stack = createStackNavigator<RootStackParamsList>()


const HomeStackNavigator: React.FC = (props) => {

    const msg = 'hello this is a message'
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerBackTitleVisible: false
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                initialParams={{ id: msg }}
            />

            <Stack.Screen
                name="NestedScreen"
                component={NestedScreen}
                initialParams={{ id: msg }}
            />
        </Stack.Navigator>
    )
}


const TimeLineStackNavigator: FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerBackTitleVisible: false
            }}
        >
            <Stack.Screen
                options={{ headerShown: false }}
                name="TimeLine"
                component={TimeLine}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name="NestedScreen"
                component={NestedScreen}
            />
        </Stack.Navigator>
    )
}

export { HomeStackNavigator, TimeLineStackNavigator }