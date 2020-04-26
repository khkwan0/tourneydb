import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, Button} from 'react-native'
import {Card} from 'react-native-paper'
import moment from 'moment-timezone'
import LinearGradient from 'react-native-linear-gradient'
import Geolocation from '@react-native-community/geolocation'
import MapScreen from './MapScreen'

const TournamentsScreen = (props) => {
  const [tournaments, setTournaments] = React.useState([])
  const [idx, setIdx] = React.useState(-1)
  const [loading, setLoading] = React.useState(true)
  const [showMap, _setShowMap] = React.useState(false)
  const [_pos, setPos] = React.useState({})
  React.useEffect(() => {
    /*
    getData = async () => {
      try {
        const res = await getDataFromServer(props.route.params.game)
        setIdx(-1)
        setLoading(false)
        setTournaments(res)
      } catch(e) {
        console.log(e)
      }
    }*/
    const unsubscribe = props.navigation.addListener('focus', async () => {
      setIdx(-1)
      setLoading(true)
      const res = await getDataFromServer(props.route.params.game)
      setTournaments(res)
      setLoading(false)
    }) 
    return () => {unsubscribe}
  }, [])

  getDataFromServer = async (game) => {
    const posit = await getPosition()
    setPos(posit)
    try {
      const res_raw = await fetch('https://api.pubgamesdb.com/games/' + game, {
        method:'POST',
        body: JSON.stringify({position: await getPosition()}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const res = await res_raw.json()
      if (res.err === 0) {
        return res.msg
      } else {
        throw new Error({code: res.err, msg: res.msg})
      }
    } catch(e) {
      throw new Error(e)
    }
  }

  const getPosition = (options) => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, options)
    })
  }

  const MyPseudoModal = () => {
    const tourney = tournaments[idx]
    return(
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: '80%'}}>
            <View>
              <Text style={{color:'white'}}>{tourney.location.name}</Text>
            </View>
            <View><Text style={{color:'white'}}>{tourney.location.addr1}</Text></View>
            <View><Text style={{color:'white'}}>{tourney.location.addr2}</Text></View>
            <View><Text style={{color:'white'}}>{tourney.location.city}</Text></View>
            <View><Text style={{color:'white'}}>{tourney.location.state}</Text></View>
            <View><Text style={{color:'white'}}>{tourney.location.zip}</Text></View>
            <View><Text style={{color:'white'}}>{tourney.location.country}</Text></View>
            <View><Text style={{color:'white'}}>{tourney.location.phone}</Text></View>
            <View><Text style={{color:'white'}}>{tourney.location.email}</Text></View>
            <View><Text style={{color:'white'}}>{tourney.location.messenger_id}</Text></View>
            <View><Text style={{color:'white'}}>{tourney.notes}</Text></View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setIdx(-1)} style={styles.modalButtonWide}>
                <View>
                  <Text style={{color:'white'}}>CLOSE</Text>
                </View>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  const setShowMap = flag => {
    _setShowMap(flag)
  }

  return(
    <SafeAreaView style={{flex: 1}}>
    <LinearGradient start={{x:0, y:1}} end={{x:1, y:0}} colors={['purple', '#3b5998', '#192f6a']} style={{flex:1}}>
      <View>
        <Button title={showMap?'Back To List View':'Show Map'} onPress={() => {setShowMap(!showMap)}}></Button>
      </View>
      <View style={{alignItems: 'center', marginTop:'20%'}}>
        <Text style={{color:'white', fontSize:40, fontFamily:'PassionOne-Regular'}}>PUB GAMES DB</Text>
      </View>
      <View style={{alignItems:'center', marginTop:8}}>
        <Text style={{color:'white', fontSize:15}}>{props.route.params.game} BALL TOURNAMENTS</Text>
      </View>
    {showMap &&
      <View>
        <MapScreen position={_pos} tournaments={tournaments} />
      </View>
    }
    {loading && !showMap &&
      <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    }
    {idx < 0 && !loading && !showMap &&
      <ScrollView>
        <View style={{marginTop: 20, marginLeft: 20, marginRight:20}}>
        {tournaments.map((tourney, _idx) => {
          return(
            <View key={tourney._id} style={{marginTop:10}}>
              <Card style={{backgroundColor: 'black'}} onPress={() => setIdx(_idx)} title={tourney.location.name}>
                <View style={{width:'80%', display:'flex', paddingLeft:20, paddingTop: 20, paddingBottom:20}}>
                  <View><Text style={{color:'white', fontSize: 25}}>{tourney.location.name}</Text></View>
                  <View><Text style={{color:'white'}}>{tourney.type.toUpperCase()}</Text></View>
                  <View><Text style={{color:'white'}}>{moment.tz(tourney.start_time, tourney.location.timezone).format('ddd MMM Do @ h:mm a')}</Text></View>
                  <View><Text style={{color:'white'}}>Timezone: {tourney.location.timezone}</Text></View>
                  <View><Text style={{color:'yellow'}}>{tourney.fee} {tourney.currency}</Text></View>
                  <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between' }}><Text style={{color:'white'}}>{tourney.max_players} players</Text><Text style={{color:'white'}}>Details</Text></View>
                </View>
              </Card>
            </View>
          )
        })}
        </View>
      </ScrollView>
    }
    {idx > -1 && !loading && !ShowMap &&
     <MyPseudoModal /> 
    }
    </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modal: {
    height: '80%',
    width: '80%',
    borderRadius: 40,
    backgroundColor: 'rgba(10,10,10,0.8)',
  },
  centeredView: {
    flexGrow: 1,
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
