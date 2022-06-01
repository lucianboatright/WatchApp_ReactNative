import * as Font from 'expo-font';
// import { useFonts } from 'expo-font';

export default useFonts = async () =>
    await Font.loadAsync({
        'Nunito': require('../assets/Fonts/Nunito/static/Nunito-Medium.ttf'),
        'NunitoBold': require('../assets/Fonts/Nunito/static/Nunito-ExtraBold.ttf'),
        'NunitoSemiBold': require('../assets/Fonts/Nunito/static/Nunito-SemiBold.ttf'),
    });

// export default useFonts