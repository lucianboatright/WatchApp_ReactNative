import React, { FC, useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserDetails, Home, AddWatch, TimeLine } from "../ScreensOptions";

const Tab = createBottomTabNavigator();

const { Navigator, Screen } = createStackNavigator();

const AppStack : FC = () => {

    const [userDetails, setUserDetails] = useState<any>(null)
    const [userName, setUserName] = useState<string>(null)

    // const getUserDetails = async () => {
    //     const uid = firebase.auth().currentUser.uid;
    //     const user = await firebase.firestore().collection('users').doc(uid).get();
    //     setUserDetails({id: user.id, ...user.data()})
    //     setUserName(userDetails.name)
    // }


    useEffect(() => {
        const getUserDetails = async () => {
            const uid = firebase.auth().currentUser.uid;
            const user = await firebase.firestore().collection('users').doc(uid).get();
            setUserDetails({id: user.id, ...user.data()})
            setUserName(userDetails.name)
        }
        getUserDetails()
    }, [])


    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                  }}
            />
            <Tab.Screen
                name="Network"
                component={TimeLine}
                options={{
                    tabBarLabel: 'Timeline',
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
                component={UserDetails}
                userName={userName}
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