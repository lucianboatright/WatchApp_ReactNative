import React from 'react'
import { auth } from './config/firebase';
import './config/config'
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView } from 'react-native';
import MainNav from './Navigation/mainNavigation';

const { width, height } = Dimensions.get("screen");
const MainImage = require('./assets/pictures/watch_roll_blue.png')
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
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


// const Stack = createNativeStackNavigator();


// const App: FC = () => {
//   return (
//     <View>
//       <Text>Hello</Text>
//     </View>
//     // <SafeAreaView style={styles.container}>
//     //   <View style={styles.header}>
//     //     <Image
//     //       source={MainImage} 
//     //       width={width}
//     //       height={200}
//     //       style={styles.coverImage}
//     //     />
//     //   </View>
//     //   <View style={styles.main}>
//     //     <Text>Hello Bottom</Text>
//     //   </View>
//     // </SafeAreaView>
//   );
// }

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   header: {
//     flex: 1,
//     // backgroundColor: "red"
//   },
//   main: {
//     flex: 3,
//   },
//   coverImage: {
//     width: width,
//     height: height,
//     flex: 1,
//     marginTop:"0.5%"
//   }

// });
