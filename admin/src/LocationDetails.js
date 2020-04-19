import React from 'react'
import { TextField, Button } from '@material-ui/core'

const LocationDetails = (props) => {
  const [details, setDetails] = React.useState(props.location)

  React.useEffect(() => {
      setDetails(props.location)
    return () => {}
  }, [props.location])
  const handleChange = (e) => {
    setDetails({...details, [e.target.name]: e.target.value})
  }

  const handleSave = () => {
    props.handleSave(details)
  }

  const handleCancel = () => {
    props.handleCancel()
  }

  return (
    <div>
      <TextField variant="outlined" label="location_id" value={details._id} disabled={true} />
      <TextField variant="outlined" label="Name" name="name" value={details.name} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Addr1" name="addr1" value={details.addr1} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Addr2" name="addr2" value={details.addr2} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="City" name="city" value={details.city} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="State" name="state" value={details.state} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Country" name="country" value={details.country} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Zip" name="zip" value={details.zip} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Latitude" name="latitude" value={details.latitude} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Longitude" name="longitude" value={details.longitude} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Phone" name="phone" value={details.phone} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Social" name="social" value={details.social} onChange={(e) => handleChange(e)} />
      <TextField variant="outlined" label="Email" name="email" value={details.email} onChange={(e) => handleChange(e)} />
      <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
      <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
    </div>
  )
}

export default LocationDetails
