import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Card, Title, Paragraph} from 'react-native-paper'
import moment from 'moment-timezone'
import LinearGradient from 'react-native-linear-gradient'

class TournamentsScreen extends Component {

  state = {
    tournaments: []
  }

  componentDidMount = async () => {
    let res_raw = await fetch('https://api.pubgamesdb.com/' + this.props.route.params.game, {
      method:'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    let res = await res_raw.json()
    this.setState({tournaments: res.msg})
  }

  render() {
    return(
      <LinearGradient start={{x:0, y:1}} end={{x:1, y:0}} colors={['purple', '#3b5998', '#192f6a']} style={{flex:1}}>
        <View style={{alignItems: 'center', marginTop:'20%'}}>
          <Text style={{color:'white', fontSize:40, fontFamily:'PassionOne-Regular'}}>shootahs</Text>
        </View>
        <View style={{alignItems:'center', marginTop:8}}>
          <Text style={{color:'white', fontSize:15}}>{this.props.route.params.game} BALL TOURNAMENTS</Text>
        </View>
        <View style={{marginTop: 20, marginLeft: 20, marginRight:20}}>
        {this.state.tournaments.map((tourney) => {
          return(
            <View key={tourney._id} style={{marginTop:10}}>
              <Card style={{backgroundColor: 'black'}}>
                <Card.Content>
                  <Title style={{color:'white'}}>{tourney.location.name}</Title>
                  <Paragraph style={{color:'white'}}>
                    {}
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
          )
        })}
        </View>
      </LinearGradient>
    )
  }
}

export default TournamentsScreen