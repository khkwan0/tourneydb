import React from 'react'
import { Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button } from '@material-ui/core'
import LocationDetails from './LocationDetails'
import TournamentList from './TournamentList'
import Utility from './library/Utility'
import config from './assets/configs/config'
import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const LocationScreen = (props) => {

  const componentIsMounted = React.useRef(true)

  const blank = {
    _id: '',
    name: '',
    addr1: '',
    addr2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    phone: '',
    social: '',
    email: '',
    coordinates: {
      lat: 0,
      lng: 0
    }
  }

  // state variables
  const [locations, setLocations] = React.useState([])
  const [chosen, setLocationSelection] = React.useState(-1)
  const [chosenTourneyLoc, setTournamentSelection] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [errOpen, setErrOpen] = React.useState(false)


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Utility.GetFromServer(config.api.url + '/locations')
        if (res.err === 0) {
          setLocations(res.msg)
        }
      } catch(e) {
          console.log(e)
      }
    }
    fetchData()
    return () => {
      console.log('unmounting')
      componentIsMounted.current = false
    }
  }, [])

  // handlers
  const addNew = () => {
    handleLocationSelection('new')
  }
  
  const handleSave = async details => {
    const toSend = {
      location: details
    }
    const res = await Utility.PostToServer(config.api.url + '/location', toSend)
    if (res.err === 0) {
      if (typeof res.msg._id !== 'undefined') {
        details._id = res.msg._id
        locations.push(details)
      } else {
        const _loc = locations
        _loc[chosen] = details
      }
      setOpen(true)
      handleLocationSelection(-1)
    } else {
      setErrOpen(true)
    }
  }

  const handleCancel = () => {
    setLocationSelection(-1)
  }

  const handleClose = (event, reason) => {
    setOpen(false)
  }

  const handleErrClose = (event, reason) => {
    setErrOpen(false)
  }

  const handleTournamentSelection = (location_id) => {
    setLocationSelection(-1)
    setTournamentSelection(location_id)

  }

  const handleLocationSelection = (idx) => {
    setLocationSelection(idx)
    setTournamentSelection(null)
  }

  const showSnack = (ok = true) => {
    if (ok) {
      setOpen(true)
    } else {
      setErrOpen(true)
    }
  }

  return (
    <div>
      <div>
      <h3>Location</h3>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={addNew}>Add New</Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(locations) && locations.map((loc, idx) => {
              return(
                <TableRow key={idx}>
                  <TableCell>
                    {loc.name}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleLocationSelection(idx)}>Details</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleTournamentSelection(loc._id)}>Tournaments</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div>
        {chosen > -1 && chosen !== 'new' &&
          <LocationDetails location={locations[chosen]} handleSave={handleSave} handleCancel={handleCancel} />
        }
        {chosen === 'new' && <LocationDetails location={blank} handleSave={handleSave} handleCancel={handleCancel} />
        }
        {chosenTourneyLoc !== null && <TournamentList location={chosenTourneyLoc} showSnack={showSnack} /> 
        }
      </div>
      <div>
        <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} >
          <Alert onClose={handleErrClose} severity="success">SUCCESSFULLY SAVED</Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default LocationScreen
