import React from 'react'
import {TextField, Button} from '@material-ui/core'
import Utility from './library/Utility.js'
import config from './assets/configs/config'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const PreferencesScreen = () => {
  const [old_pwd, set_old_pwd] = React.useState('')
  const [new_pwd, set_new_pwd] = React.useState('')
  const [confirm_pwd, set_confirm_pwd] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [severity, setSeverity] = React.useState('')

  const cancel = () => {
    set_old_pwd('')
    set_new_pwd('')
    set_confirm_pwd('')
  }

  const saveNewPassword = async () => {
    const key = config.storage.key.prefix + '/token'
    const token = await localStorage.getItem(key)
    console.log(token)
    let error = false
    let reason = 'SUCCESS'
    if (old_pwd && confirm_pwd && new_pwd && confirm_pwd === new_pwd && token) {
      try {
      const res = await Utility.PostToServer(config.api.url + '/pwd/admin', {new_password: new_pwd, old_password: old_pwd, token: token})
        cancel()
        if (res.err !== 0) {
          error = true
          reason = "Old Password Not Found"
        } 
      } catch(e) {
        error = true
        reason = "Internal Server Error"
      }
    } else {
      error = true
      reason = "Password Mismatch"
    }
    showSnack(error, reason)
  }

  const showSnack = (err, reason) => {
    if (reason) {
      setMessage(reason)
    }
    if (err) {
      setSeverity('error')
    } else {
      setSeverity('success')
    }
    setOpen(true)
  }

  const handleCloseSnack = () => {
    setOpen(false)
  }

  return(
    <div>
      <div>
        <h2>Preferences</h2>
      </div>
      <div>
        <div>
          <TextField label="Old Password" name="old" type="password" placeholder="Old Password" value={old_pwd} onChange={(e) => set_old_pwd(e.target.value)}/>
        </div>
        <div>
          <TextField label="New Password" name="new" type="password" placeholder="New Password" value={new_pwd} onChange={(e) => set_new_pwd(e.target.value)}/>
        </div>
        <div>
          <TextField label="Confirm Password" name="confirm" type="password" placeholder="Confirm Password" value={confirm_pwd} onChange={(e) => set_confirm_pwd(e.target.value)}/>
        </div>
        <div>
          <Button onClick={cancel}>Cancel</Button>
          <Button onClick={saveNewPassword}>Save</Button>
        </div>
      </div>
      <div>
        <Snackbar open={open} onClose={handleCloseSnack} autoHideDuration={6000}>
          <Alert severity={severity}>{message}</Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default PreferencesScreen
