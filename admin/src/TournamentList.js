import React from 'react'
import moment from 'moment-timezone'
import Utility from './library/Utility'
import config from './assets/configs/config'
import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core'
import TournamentDetails from './TournamentDetails'

const TournamentList = (props) => {
  const [tournaments, setTournaments] = React.useState([])
  const [addNew, setAddNew] = React.useState(false)
  const [chosenTournament, setChosenTournament] = React.useState(-1)

  React.useEffect(() => {
    const fetchTourney = async () => {
      try {
        const res = await Utility.GetFromServer(config.api.url + '/tournaments/'+props.location)
        if (res.err === 0) {
        console.log(res.msg)
        setTournaments(res.msg)
        }
      } catch(e) {
        console.log(e)
      }
    }
    fetchTourney()
    return () => {
    }
  }, [props.location])

  const handleEditTournament = (idx) => {
    setChosenTournament(idx)
  }

  const handleCloseTournamentDetails = () => {
    setAddNew(false)
    setChosenTournament(-1)
  }

  const handleSave = async details => {
    try {
      details.location_id = props.location
      const res = await Utility.PostToServer(config.api.url + '/tournament', {tournament: details})
      if (typeof res.msg._id !== 'undefined') { // save new tourney success
        details._id = res.msg._id
        const _tournaments = Array.from(tournaments)
        _tournaments.push(details)
        setTournaments(_tournaments)
      } else {
        const _tournaments = Array.from(tournaments)
        _tournaments[chosenTournament] = details
        setTournaments(_tournaments)
      }
      handleCloseTournamentDetails()
      props.showSnack()
    } catch(e) {
      console.log(e)
      props.showSnack(false)
    }
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setAddNew(true)}>Add New</Button>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Game</TableCell>
              <TableCell>When</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Type</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(tournaments) && tournaments.map((t, idx) => {
              const now = moment(Date.now())
              let next_time = moment(t.start_time)
              while (next_time.isBefore(now.startOf('day'))) {
                next_time.add(t.frequency, 'week')
              }
              return(
                <TableRow key={idx}>
                  <TableCell>{t.game} Ball</TableCell>
                  <TableCell>{moment(next_time, null).format('ddd MMM Do')}</TableCell>
                  <TableCell>{t.frequency}</TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell><Button onClick={() => handleEditTournament(idx)}>Edit</Button></TableCell>
                  <TableCell><Button>Delete</Button></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      {addNew &&
        <TournamentDetails addNew={addNew} close={handleCloseTournamentDetails} handleSave={handleSave}/>
      }
      {!addNew && chosenTournament > -1 && 
        <TournamentDetails tournament={tournaments[chosenTournament]} close={handleCloseTournamentDetails} handleSave={handleSave} />
      }
    </div>
  )
}

export default TournamentList
