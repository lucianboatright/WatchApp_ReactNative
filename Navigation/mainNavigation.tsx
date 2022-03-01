import React, { FC, useState, useEffect } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";


const MainNav : FC = () => {
    const [user, setUser] = useState<any>(null)

    const bootstrap = () => {
        firbase.auth().onAuthStateChange((_user: any) => {
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
            {user !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default MainNav