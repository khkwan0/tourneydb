import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './src/screens/MainScreen';
import AboutScreen from './src/screens/AboutScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={MainScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
