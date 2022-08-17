import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard, AddWatch } from "../ScreensOptions";
import { TimeLineStackNavigator } from './UserProfileNav';
import Svg, { Path, G } from "react-native-svg"

type RootStackParamsList = {
  Home: undefined;
  Timeline: undefined;
  Add: undefined;
  Profile: undefined;
}

const Tab = createBottomTabNavigator();

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#B76935",
        tabBarInactiveTintColor: "#263C41",
        tabBarStyle: {
          minHeight: 65,
          backgroundColor: '#EAE8E3',
          borderTopColor: '#CDC9BC',
          borderTopWidth: 0.5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          margin: 0,
        },
      }}
    >
      <Tab.Screen
        name="Timeline"
        component={TimeLineStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Timeline',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock" color={'#263C41'} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddWatch}

        options={{
          headerShown: false,
          // tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-outline" color={'#263C41'} size={48} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings" color={'#263C41'} size={40} />
          ),
        }}

      />
    </Tab.Navigator>

  )
}

export default AppStack;