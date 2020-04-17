import React from 'react'
import { Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button } from '@material-ui/core'
import LocationDetails from './LocationDetails'

const LocationScreen = (props) => {

  const blank = {
    id: '',
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
  }

  const [locations, setLocations] = React.useState([])
  const [chosen, handleLocationSelection] = React.useState(-1)

  const addNew = () => {
    handleLocationSelection('new')
  }
  
  const handleSave = (details) => {
    console.log(details)
    handleLocationSelection(-1)
  }
      
  return (
    <div>
      <div>
      <h3>Location</h3>
      </div>
      <div>
        <Button onClick={addNew}>Add New</Button>
        <Table>
          <TableHead>
            <TableRow>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((loc, idx) => {
              return(
                <TableRow>
                  <TableCell>
                    {loc.name}
                  </TableCell>
                  <TableCell>
                    <Button onClick={setLocations(idx)}>Details</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div>
        {chosen > -1 && chosen !== 'new' &&
          <LocationDetails location={locations[chosen]} handleSave={handleSave} />
        }
        {chosen === 'new' && 
          <LocationDetails location={blank} handleSave={handleSave} />
        }
      </div>
    </div>
  )
}

export default LocationScreen
