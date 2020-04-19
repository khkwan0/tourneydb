import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {verifyToken} from './redux/actions/authActions'
import MainScreen from './MainScreen'
import Login from './Login'

const App = () => {
  const user = useSelector(state => ({user:state.userData.user}), shallowEqual)
  const dispatch = useDispatch()

  React.useEffect(() => {
      dispatch(verifyToken())
  }, [dispatch])


  const handleLogout = () => {
  } 

  console.log(user)
  return(
    <div>
    {!user._id &&
      <Login />      
    }
    {user._id &&
      <MainScreen handleLogout={handleLogout} />
    }
    </div>
  )
}

export default App
