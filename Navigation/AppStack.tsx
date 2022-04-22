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
    <Tab.Navigator>
      <Tab.Screen
        name="Timeline"
        component={TimeLineStackNavigator}
        options={{
          headerShown: false,
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
          headerShown: false,
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
          headerShown: false,
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