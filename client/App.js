import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainScreen from './src/screens/MainScreen'

export default function App() {
  return(
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  )
}