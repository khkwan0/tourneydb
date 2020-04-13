import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TournamentsScreen from './TournamentsScreen';
import Geolocation from '@react-native-community/geolocation';

const Tab = createBottomTabNavigator();

class MainScreen extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  componentDidMount = () => {
    /*
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        console.log(initialPosition);
        this.setState({initialPosition});
      },
      error => console.log(error),
      this.watchID = Geolocation.watchPosition(position => {
        const lastPosition = JSON.stringify(position)
        this.setState({lastPosition})
      })
    )
    */
  };

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          inactiveBackgroundColor: 'black',
          activeBackgroundColor: 'purple',
          style: styles.tab,
          lazy: true,
        }}>
        <Tab.Screen
          name="EightBall"
          component={TournamentsScreen}
          initialParams={{game: '8'}}
          initialPosition={this.state.initialPosition}
          lastPosition={this.state.lastPosition}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('../assets/images/eightball.png')}
                style={styles.tabIcon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="NineBall"
          component={TournamentsScreen}
          initialParams={{game: '9'}}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('../assets/images/nineball.png')}
                style={styles.tabIcon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TenBall"
          component={TournamentsScreen}
          initialParams={{game: '10'}}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('../assets/images/tenball.png')}
                style={styles.tabIcon}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 80,
    height: 80,
    padding: 40,
  },
  tab: {
    height: 100,
  },
});
export default MainScreen;
