import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import moment from 'moment-timezone';
import LinearGradient from 'react-native-linear-gradient';

class TournamentsScreen extends Component {
  state = {
    tournaments: [],
  };

  componentDidMount = async () => {
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
    this.setState({tournaments: res.msg});
  };

  render() {
    //    console.log(this.props.initialPosition)
    return (
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={['purple', '#3b5998', '#192f6a']}
        style={{flex: 1}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>shootahs</Text>
        </View>
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheadingText}>
            {this.props.route.params.game} BALL TOURNAMENTS
          </Text>
        </View>
        <View style={styles.listContainer}>
          {this.state.tournaments.map(tourney => {
            return (
              <View key={tourney._id} style={styles.listItemContainer}>
                <Card style={styles.listItem}>
                  <Card.Content>
                    <Title style={styles.listItemTitle}>
                      {tourney.location.name}
                    </Title>
                    <Paragraph style={styles.listItemText}>{}</Paragraph>
                  </Card.Content>
                </Card>
              </View>
            );
          })}
        </View>
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
