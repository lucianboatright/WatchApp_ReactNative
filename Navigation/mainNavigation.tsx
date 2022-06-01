import React, { FC, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainNav: React.FC = () => {
    const [user, setUser] = useState<any>(null)

    const bootstrap = async () => {
        firebase.auth().onAuthStateChanged((_user: any) => {
            if (_user) {
                setUser(_user)
            }
        })
    }

    useEffect(() => {
        bootstrap()
    }, [])

    return (
        <NavigationContainer>
            {user !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}
export default MainNav;