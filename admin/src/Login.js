import React from 'react'
import {Button} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { doLogin } from './redux/actions/authActions'
import {TextField} from '@material-ui/core'

const Login = () => {

  const [isSending, setIsSending] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const dispatch = useDispatch()

  const login = React.useCallback(async () => {
    if (isSending) {
      return
      }
    setIsSending(true)
    dispatch(doLogin('ken', 'khkwan0'))
  }, [isSending])

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  return(
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div style={{height:'100%'}}>
        <div>
          <TextField name="email" label="Email" onChange={(e) => handleEmail(e)} value={email} />
        </div>
        <div>
          <TextField name="password" label="Password" onChange={(e) => handlePassword(e)} value={password} />
        </div>
        <div>
          <Button onClick={login}>Login</Button>
        </div>
      </div>
    </div>
  )
}

export default Login
