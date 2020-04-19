import React from 'react'
//import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useDispatch } from 'react-redux'
import {verifyToken} from './redux/actions/authActions'
import MainScreen from './MainScreen'

const App = () => {
//  const user = useSelector(state => ({user:state.userData.user}), shallowEqual)
  const dispatch = useDispatch()

  React.useEffect(() => {
      dispatch(verifyToken())
  }, [dispatch])

  const handleLogout = () => {
  } 
  return(
    <div>
    {/*
      <Login />      
      */}
      <MainScreen handleLogout={handleLogout} />
    </div>
  )
}

export default App
