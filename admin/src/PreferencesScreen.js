import React from 'react'
import {TextField, Button} from '@material-ui/core'
import Utility from './library/Utility.js'
import config from './assets/configs/config'

const PreferencesScreen = () => {
  const [old_pwd, set_old_pwd] = React.useState('')
  const [new_pwd, set_new_pwd] = React.useState('')
  const [confirm_pwd, set_confirm_pwd] = React.useState('')

  const cancel = () => {
    set_old_pwd('')
    set_new_pwd('')
    set_confirm_pwd('')
  }

  const saveNewPassword = async () => {
    const token = null
    if (old_pwd && confirm_pwd && new_pwd && confirm_pwd === new_pwd) {
      const res = await Utility.PostToServer(config.api.url + '/usr/pwd', {new_password: new_pwd, old_password: old_pwd, token: token})
    }
  }

  return(
    <div>
      <div>
        <h2>Preferences</h2>
      </div>
      <div>
        <div>
          <TextField label="Old Password" type="password" placeholder="Old Password" value={old_pwd} onChange={(e) => set_old_pwd(e.targat.value)}/>
        </div>
        <div>
          <TextField label="New Password" type="password" placeholder="New Password" value={new_pwd} onChange={(e) => set_new_pwd(e.targat.value)}/>
        </div>
        <div>
          <TextField label="Confirm Password" type="password" placeholder="COnfirm Password" value={confirm_pwd} onChange={(e) => set_confirm_pwd(e.targat.value)}/>
        </div>
        <div>
          <Button onClick={cancel}>Cancel</Button>
          <Button onClick={saveNewPassword}>Save</Button>
        </div>
      </div>
    </div>

  )
}

export default PreferencesScreen
