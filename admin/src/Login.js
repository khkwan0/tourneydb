import React from 'react'
import {Button} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { doLogin } from './redux/actions/authActions'
import {TextField} from '@material-ui/core'

const Login = () => {

//  const [isSending, setIsSending] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const dispatch = useDispatch()
/*
  const login = React.useCallback(async () => {
    setIsSending(true)
    console.log(email,password)
    dispatch(doLogin(email, password))
  }, [isSending,dispatch])
  */

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    console.log(email, password)
      dispatch(doLogin(email, password))
  }

  return(
    <div style={{marginTop:100}}>
      <div>
        <TextField name="email" label="Email" onChange={(e) => handleEmail(e)} value={email} />
      </div>
      <div>
        <TextField name="password" label="Password" onChange={(e) => handlePassword(e)} value={password} type="password" />
      </div>
      <div>
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  )
}

export default Login
