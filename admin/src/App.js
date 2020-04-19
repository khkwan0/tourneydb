import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {verifyToken, logout} from './redux/actions/authActions'
import MainScreen from './MainScreen'
import Login from './Login'
import config from './assets/configs/config'

const App = () => {
  const store = useSelector(state => ({user:state.userData.user}), shallowEqual)
  const dispatch = useDispatch()

  React.useEffect(() => {
      dispatch(verifyToken())
  }, [dispatch])


  const handleLogout = () => {
    const key = config.storage.key.prefix + '/token'
    localStorage.removeItem(key)
    dispatch(logout())
  } 

  return(
    <div>
    {(typeof store.user === 'undefined' || !store.user._id) &&
      <div style={{display: 'flex', justifyContent:'center'}}>
        <Login />      
      </div>
    }
    {typeof store.user !== 'undefined' && store.user._id &&
      <MainScreen handleLogout={handleLogout} />
    }
    </div>
  )
}

export default App
