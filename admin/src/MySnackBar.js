import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const MySnackBar = (props) => {
 
  const handleClose = () => {
    if (typeof props.handleClose !== 'undefined') {
      props.handleClose()
    } else {
      setOpen(false)
    }
  }

  let message = 'SUCCESS'
  if (typeof props.message !== 'undefined' && props.message) {
    message = props.message
  }

  let severity = "success"
  if (typeof props.severity !== 'undefined' && props.severity) {
    severity = props.severity
  }

  let duration = 6000
  if (typeof props.duration !== 'undefined' && props.duration) {
    duration = props.duration
  }

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
      console.log(props)
    setOpen(props.open)
    return () => {}
  }, [props.open])

  return (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={duration}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  )
}

export default MySnackBar
