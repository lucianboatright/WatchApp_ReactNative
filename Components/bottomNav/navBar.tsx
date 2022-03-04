// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';


// import { Home, Dashboard } from '../../ScreensOptions';

// //Screen names
// const homeName = "Home";
// const dashboard = "Dash";
// // const settingsName = "Settings";

// const Tab = createBottomTabNavigator();

// function MainContainer() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName={homeName}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let rn = route.name;

//             if (rn === homeName) {
//               iconName = focused ? 'home' : 'home-outline';

//             } else if (rn === dashboard) {
//               iconName = focused ? 'list' : 'list-outline';

//             } 

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'grey',
//           labelStyle: { paddingBottom: 10, fontSize: 10 },
//           style: { padding: 10, height: 70}
//         }}>

//         <Tab.Screen name={homeName} component={Home} />
//         <Tab.Screen name={dashboard} component={Dashboard} />
//         {/* <Tab.Screen name={settingsName} component={SettingsScreen} /> */}

//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// export default MainContainer;