import React from 'react'
import { Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
  TextField} from '@material-ui/core'
import Utility from './library/Utility'
import config from './assets/configs/config'

const tourneyBlank = {
  _id: '',
  start_time: 0, // epoch time
  frequency: 1, //default weekly
  type: '', // single or doubles
  game: '', // '8','9','10'
  fee: 0,
  currency: '',
  max_players: 0
}

const TournamentDetails = (props) => {
  const [details, setDetails] = React.useState({...tourneyBlank})


  React.useEffect(() => {
      if (props.addNew) {
        setDetails({...tourneyBlank})
      } else {
        setDetails(props.tournament)
      }
      return () => {}
    }
    , []
  )

  const handleClose = () => {
    props.close()
  }


  const handleChange = (e) => {
    setDetails({...details, [e.target.name]: e.target.value})
  }

  const handleSave = () => {
    props.handleSave(details)
  }

  return (
    <div>
      <TextField variant="outlined" label="tournament_id" value={details._id} disabled={true} />
      <TextField variant="outlined" onChange={(e) => handleChange(e)} label="Game" name="game" value={details.game} />
      <TextField variant="outlined" onChange={(e) => handleChange(e)} label="Type" name="type" value={details.type} />
      <TextField variant="outlined" onChange={(e) => handleChange(e)} label="When" name="start_time" value={details.start_time} />
      <TextField variant="outlined" onChange={(e) => handleChange(e)} label="Frequency" name="frequency" value={details.frequency} />
      <TextField variant="outlined" onChange={(e) => handleChange(e)} label="Fee" name="fee" value={details.fee} />
      <TextField variant="outlined" onChange={(e) => handleChange(e)} label="Currency" name="currency" value={details.currency} />
      <TextField variant="outlined" onChange={(e) => handleChange(e)} label="Max Players" name="max_players" value={details.max_players} />
      <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
      <Button variant="contained" color="primary" onClick={handleSave}>Save</Button> 
    </div>
  )
}

export default TournamentDetails
