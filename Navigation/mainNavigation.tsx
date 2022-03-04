import React, { FC, useState, useEffect } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard, Home } from "../ScreensOptions";

const Tab = createBottomTabNavigator();

const MainNav : FC = () => {
    const [user, setUser] = useState<any>(null)

    const bootstrap = () => {
        firebase.auth().onAuthStateChanged((_user: any) => {
            if(_user){
                setUser(_user)
            }
        })
    }

    useEffect(() => {
        bootstrap()
    }, [])

    return (
        <NavigationContainer>
            {user !== null ? 
                <AppStack /> 
            :             
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Settings" component={Dashboard} />
                </Tab.Navigator>
            }
        </NavigationContainer>
    )
}

export default MainNav;