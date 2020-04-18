import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/core/Alert'

const MySnackBar = (props) => {
  return (
    <Snackbar open={true} authHideDuration={props.duration}>
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  )
}

export default MySnackBar
