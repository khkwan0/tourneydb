import React from 'react'
import { View } from 'react-native'
import MapView from 'react-native-maps'

let timeoutId = null
const MapScreen = (props) => {

  const handleRegionChange= (e) => {
    console.log(e)
  }

  return(
    <View style={{height:400, width: 400, justifyContent: 'flex-end', alignItems:'center'}}>
      <MapView style={{height:'100%',width:'100%'}}
        showsUserLocation={true}
        initialRegion={{
          latitude: props.position.coords.latitude,
          longitude: props.position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={handleRegionChange}
      >
        {props.tournaments.map((tourney, idx) => {
          return(
            <MapView.Marker
              key={tourney.location._id + '_' + idx}
              coordinate={{latitude: tourney.location.latitude, longitude: tourney.location.longitude}}
              title={tourney.location.name}
            />
          )
        })}
      </MapView>
    </View>
  )
}

export default MapScreen