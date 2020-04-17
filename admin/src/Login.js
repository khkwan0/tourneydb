import React from 'react'
import {Button} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { doLogin } from './redux/actions/authActions'

const Login = () => {

  const [isSending, setIsSending] = React.useState(false)
  const dispatch = useDispatch()

  const login = React.useCallback(async () => {
    if (isSending) {
      return
      }
    setIsSending(true)
    dispatch(doLogin('ken', 'khkwan0'))
  }, [isSending])
  return(
    <div>
      <Button onClick={login}>Login</Button>
    </div>
  )
}

export default Login
