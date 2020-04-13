import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native'
import Modal from 'react-native-modal'
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
      this.setState({show_details: false})
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
    const MyPseudoModal = () => {
      const tourney = this.state.tournaments[this.state.idx]
      return(
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: '80%'}}>
              <View>
                <Text style={{color:'white'}}>{tourney.location.name}</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <TouchableOpacity onPress={this.hideDetails} style={styles.modalButtonWide}>
                  <View>
                    <Text style={{color:'white'}}>CLOSE</Text>
                  </View>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
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
        {this.state.show_details &&
         <MyPseudoModal /> 
        }
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    height: '80%',
    width: '80%',
    borderRadius: 40,
    backgroundColor: 'rgba(10,10,10,0.8)',
  },
  centeredView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonWide: {
    width: '50%',
    backgroundColor: 'blue',
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TournamentsScreen