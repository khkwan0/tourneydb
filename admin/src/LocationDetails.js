import React from 'react'
import { TextField, Button } from '@material-ui/core'

const LocationDetails = (props) => {
  const [details, setDetails] = React.useState(props.location)

  const handleChange = (e) => {
    setDetails({...details, [e.target.name]: e.target.value})
  }

  const handleSave = () => {
    props.handleSave(details)
  }

  return (
    <div>
      <TextField variant="outlined" label="location_id" value={details.id} disabled={true} />
      <TextField variant="outlined" label="Name" name="name" value={details.name} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Addr1" name="addr1" value={details.addr1} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Addr2" name="addr2" value={details.addr2} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="City" name="city" value={details.city} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="State" name="state" value={details.state} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Country" name="country" value={details.country} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Zip" name="zip" value={details.zip} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Phone" name="phone" value={details.phone} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Social" name="social" value={details.social} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Email" name="email" value={details.email} onChange={(e) => handleChange(e)} />
      <Button>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  )
}

export default LocationDetails
