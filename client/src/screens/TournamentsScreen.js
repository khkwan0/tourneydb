import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import moment from 'moment-timezone';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {globalStyles} from '../styles/Global';

class TournamentsScreen extends Component {
  state = {
    tournaments: [],
    show_details: false,
    idx: -1,
  };

  componentDidMount = async () => {
    try {
      await this.getDataFromServer();
    } catch (e) {
      console.log(e);
    }
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getDataFromServer();
    });
  };

  getDataFromServer = async () => {
    try {
      let res_raw = await fetch(
        'https://api.pubgamesdb.com/' + this.props.route.params.game,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        },
      );
      let res = await res_raw.json();
      if (res.err === 0) {
        this.setState({
          tournaments: res.msg,
        });
      } else {
        throw new Error({code: res.err, msg: res.msg});
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  showDetails = idx => {
    this.setState({
      show_details: true,
      idx: idx,
    });
  };

  hideDetails = () => {
    this.setState({
      show_details: false,
    });
  };

  render() {
    //    console.log(this.props.initialPosition)
    return (
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={['purple', '#3b5998', '#192f6a']}
        style={{flex: 1}}>
        {!this.state.show_details && (
          <View>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>shootahs</Text>
            </View>
            <View style={globalStyles.headingContainer}>
              <Text style={globalStyles.headingText}>
                {this.props.route.params.game} BALL TOURNAMENTS
              </Text>
            </View>
            <View style={globalStyles.container}>
              {this.state.tournaments.map((tourney, idx) => {
                return (
                  <View key={tourney._id}>
                    <Card
                      style={globalStyles.item}
                      onPress={() => this.showDetails(idx)}>
                      <Card.Content>
                        <Title style={globalStyles.title}>
                          {tourney.location.name}
                        </Title>
                        <Paragraph style={globalStyles.paragraph}>
                          {tourney.type}
                        </Paragraph>
                        <Paragraph style={globalStyles.paragraph}>
                          {moment
                            .tz(tourney.start_time, 'Asia/Bangkok')
                            .format('ddd Do')}
                        </Paragraph>
                        <Paragraph style={globalStyles.paragraph}>
                          {tourney.fee}
                        </Paragraph>
                        <Paragraph style={globalStyles.paragraph}>
                          {tourney.max}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </View>
                );
              })}
            </View>
          </View>
        )}
        {this.state.show_details && (
          <View>
            <Text>{this.state.tournaments[this.state.idx].location.name}</Text>
            <Button title="Go Back" onPress={this.hideDetails} />
          </View>
        )}
      </LinearGradient>
    );
  }
}

export default TournamentsScreen;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    padding: 30,
  },
  logoText: {
    fontFamily: 'PassionOne-Regular',
    fontSize: 40,
    color: 'white',
  },
});
