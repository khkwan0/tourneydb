import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {verifyToken} from './redux/actions/authActions'
import MainScreen from './MainScreen'

const App = () => {
  const user = useSelector(state => ({user:state.userData.user}), shallowEqual)
  console.log(user)
  const dispatch = useDispatch()

  console.log('token check')
  React.useEffect(() => {
    async function _verifyToken()  {
      dispatch(verifyToken())
    }
    _verifyToken()
  }, [])

   
  return(
    <div>
    {/*
      <Login />      
      */}
      <MainScreen />
    </div>
  )
}

export default App
