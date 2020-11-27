import React from 'react'
import {Image, StyleSheet, View, Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TournamentsScreen from './TournamentsScreen'
import VenuesScreen from './VenueScreen'

const Tab = createBottomTabNavigator()

const MainScreen = () => {
  return(<View><Text>test</Text></View>)
  /*
  return(
    <Tab.Navigator tabBarOptions={{showLabel: false, inactiveBackgroundColor: 'black', activeBackgroundColor: 'purple', style:styles.tab, lazy: true}} >
      <Tab.Screen name="Venues" component={VenuesScreen} />
      <Tab.Screen name="Tournaments" component={TournamentsScreen}  />
      <Tab.Screen name="TenBall" component={TournamentsScreen} initialParams={{game: '10'}} options={{tabBarIcon: () => <Image source={require('../assets/images/tenball.png')} style={styles.tabIcon} />}} />
    </Tab.Navigator>
  )
  */
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
