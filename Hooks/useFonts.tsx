import * as Font from 'expo-font';
// import { useFonts } from 'expo-font';

const useFonts = async () =>
    await Font.loadAsync({
        // Nunito: require('../assets/Fonts/Nunito/static/Nunito-Black.ttf'),
        Nunito: require('../assets/Fonts/Nunito/static/Nunito-Medium.ttf'),
        NunitoBold: require('../assets/Fonts/Nunito/static/Nunito-ExtraBold.ttf'),
        // indie: require('../assets/fonts/Ubuntu-BoldItalic.ttf'),
    });

export default useFonts