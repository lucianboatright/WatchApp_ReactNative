import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard, AddWatch } from "../ScreensOptions";
import { TimeLineStackNavigator } from './UserProfileNav';

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
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "blue",
        tabBarStyle: {
          height: 85,
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
            <MaterialCommunityIcons name="search-web" color={'#01497C'} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddWatch}

        options={{
          headerShown: false,
          tabBarShowLabel: false,
          // tabBarBackground: 'DAD7CD',
          // tabBarOptions={{
          //   showLabel : false
          //   }},
          // tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-outline" color={'#01497C'} size={48} />
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
            <MaterialCommunityIcons name="account-settings" color={'#01497C'} size={40} />
          ),
        }}

      />
    </Tab.Navigator>

  )
}

export default AppStack;