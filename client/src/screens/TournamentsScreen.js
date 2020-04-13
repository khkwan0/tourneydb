import React, {Component} from 'react'
import {View, Text, Button, Modal, StyleSheet, ActivityIndicator} from 'react-native'
import {Card, Title, Paragraph} from 'react-native-paper'
import moment from 'moment-timezone'
import LinearGradient from 'react-native-linear-gradient'

class TournamentsScreen extends Component {

  state = {
    tournaments: [],
    show_details: false,
    idx: -1,
    loading: true,
  }

  componentDidMount = async () => {
    try {
      await this.getDataFromServer()
    } catch(e) {
      console.log(e)
    }
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getDataFromServer()
    })
  }

  getDataFromServer = async () => {
    this.setState({loading: true})
    try {
      let res_raw = await fetch('https://api.pubgamesdb.com/' + this.props.route.params.game, {
        method:'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      let res = await res_raw.json()
      if (res.err === 0) {
        this.setState({
          tournaments: res.msg,
          loading: false
        })
      } else {
        throw new Error({code: res.err, msg: res.msg})
      }
    } catch(e) {
      throw new Error(e)
    }
  }

  showDetails = (idx) => {
    this.setState({
      show_details: true,
      idx: idx
    })
  }

  hideDetails = () => {
    this.setState({
      show_details: false
    })
  }

  render() {
//    console.log(this.props.initialPosition)
    return(
      <LinearGradient start={{x:0, y:1}} end={{x:1, y:0}} colors={['purple', '#3b5998', '#192f6a']} style={{flex:1}}>
        {this.state.loading &&
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        }
        {!this.state.show_details && !this.state.loading &&
          <View>
            <View style={{alignItems: 'center', marginTop:'20%'}}>
              <Text style={{color:'white', fontSize:40, fontFamily:'PassionOne-Regular'}}>shootahs</Text>
            </View>
            <View style={{alignItems:'center', marginTop:8}}>
              <Text style={{color:'white', fontSize:15}}>{this.props.route.params.game} BALL TOURNAMENTS</Text>
            </View>
            <View style={{marginTop: 20, marginLeft: 20, marginRight:20}}>
            {this.state.tournaments.map((tourney, idx) => {
              return(
                <View key={tourney._id} style={{marginTop:10}}>
                  <Card style={{backgroundColor: 'black'}} onPress={() => this.showDetails(idx)}>
                    <Card.Content style={{color:'white'}}>
                      <Title style={{color:'white', fontFamily:'NunitoSan-Bold'}}>{tourney.location.name}</Title>
                      <Paragraph style={{color:'white'}}>{tourney.type}</Paragraph>
                      <Paragraph style={{color:'white'}}>{moment.tz(tourney.start_time, 'Asia/Bangkok').format('ddd Do')}</Paragraph>
                      <Paragraph style={{color:'yellow'}}>{tourney.fee}</Paragraph>
                      <Paragraph style={{color:'white'}}>{tourney.max}</Paragraph>
                    </Card.Content>
                  </Card>
                </View>
              )
            })}
            </View>
          </View>
        }
        {this.state.show_details && !this.state.loading &&
        <View style={['styles.centeredView', 'styles.modal']}>
            <Text>{this.state.tournaments[this.state.idx].location.name}</Text>
            <Button title="Go Back" onPress={this.hideDetails} />
        </View>
        }
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    height: '80%',
    width: '80%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})

export default TournamentsScreen