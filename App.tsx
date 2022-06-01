import React, { useState } from 'react'
import './config/config'
import { StyleSheet, Dimensions, } from 'react-native';
import MainNav from './Navigation/mainNavigation';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import useFonts from './Hooks/useFonts';


const { width, height } = Dimensions.get("screen");
const MainImage = require('./assets/pictures/watch_roll_blue.png')


export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => { }}
      />
    );
  }

  return (
    <MainNav />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

