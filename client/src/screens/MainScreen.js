import React, { Component } from 'react'
import {Image, StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TournamentsScreen from './TournamentsScreen'

const Tab = createBottomTabNavigator()

const MainScreen = () => {
  return(
    <Tab.Navigator tabBarOptions={{showLabel: false, inactiveBackgroundColor: 'black', activeBackgroundColor: 'purple', style:styles.tab, lazy: true}} >
      <Tab.Screen name="EightBall" component={TournamentsScreen} initialParams={{game: '8'}} options={{tabBarIcon: () => <Image source={require('../assets/images/eightball.png')} style={styles.tabIcon} />}} />
      <Tab.Screen name="NineBall" component={TournamentsScreen} initialParams={{game: '9'}} options={{tabBarIcon: () => <Image source={require('../assets/images/nineball.png')} style={styles.tabIcon} />}} />
      <Tab.Screen name="TenBall" component={TournamentsScreen} initialParams={{game: '10'}} options={{tabBarIcon: () => <Image source={require('../assets/images/tenball.png')} style={styles.tabIcon} />}} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 80,
    height: 80
  },
  tab: {
    height: 100
  }
})

export default MainScreen
