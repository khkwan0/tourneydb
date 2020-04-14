import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './src/screens/MainScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './src/drawers/DrawerContent';

const Drawer = createDrawerNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={() => <DrawerContent />}>
          <Drawer.Screen name="Main" component={MainScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
