/** @format */

import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
// import SplashScreen from 'react-native-splash-screen'
// import 'moment';
// import 'moment/locale/id';

enableScreens(true);

LogBox.ignoreLogs([
  'Sending...',
  'Warning...',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation...',
  'VirtualizedList: missing keys for items, make sure to specify a key or id property on each item or provide a custom keyExtractor.',
  'ListItem.title...',
  'Did not receive response to shouldStartLoad in time',
  'Failed to get size for image https://image',
  'Animated.event now requires a second argument for options',
  `Warning: Encountered two children with the same key...`,
  `VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 12787.5, "dt": 599, "prevDt": 1058}`,
]);
LogBox.ignoreAllLogs();

import Splash from './app/Splash';
import Main from './app/Main';
import Home from './app/module/Home';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Splash'}
        headerMode="none"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

console.reportErrorsAsExceptions = false;

export default App;
