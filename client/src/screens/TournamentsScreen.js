import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import moment from 'moment-timezone';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {TapGestureHandler} from 'react-native-gesture-handler';

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
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>shootahs</Text>
            </View>
            <View style={styles.subheadingContainer}>
              <Text style={styles.subheadingText}>
                {this.props.route.params.game} BALL TOURNAMENTS
              </Text>
            </View>
            <View style={styles.listContainer}>
              {this.state.tournaments.map((tourney, idx) => {
                return (
                  <View key={tourney._id} style={styles.listItemContainer}>
                    <Card
                      style={styles.listItem}
                      onPress={() => this.showDetails(idx)}>
                      <Card.Content style={styles.listItemText}>
                        <Title style={styles.listItemTitle}>
                          {tourney.location.name}
                        </Title>
                        <Paragraph style={styles.listItemText}>
                          {tourney.type}
                        </Paragraph>
                        <Paragraph style={styles.listItemText}>
                          {moment
                            .tz(tourney.start_time, 'Asia/Bangkok')
                            .format('ddd Do')}
                        </Paragraph>
                        <Paragraph style={styles.listItemText}>
                          {tourney.fee}
                        </Paragraph>
                        <Paragraph style={styles.listItemText}>
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
  headingContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },
  headingText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'PassionOne-Regular',
  },

  subheadingContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  subheadingText: {
    color: 'white',
    fontSize: 15,
  },

  listContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  listItemContainer: {
    marginTop: 10,
  },
  listItem: {
    backgroundColor: 'black',
  },
  listItemTitle: {
    color: 'white',
    fontFamily: 'NunitoSans-Black',
  },
  listItemText: {
    color: 'white',
  },
});
