import * as TYPES from '../types/types'
import config from '../../assets/configs/config'
import Utility from '../../library/Utility'

export const doLogin = (email, password) => {
  return async dispatch => {
    try {
      console.log(email, password)
      let res = await Utility.PostToServer(config.api.url + '/login', {email: email, password: password})
      if (res.err === 0) {
        let key = config.storage.key.prefix + '/token'
        await localStorage.setItem(key, res.msg.token)
        dispatch({
          type: TYPES.SET_USER,
          payload: res.msg
        })
      }
    } catch(e) {
      console.log(e)
    }
  }
}

export const verifyToken = () => {
  return async dispatch => {
    try {
      console.log('verifytoken')
      let key = config.storage.key.prefix + '/token'
      let token = await localStorage.getItem(key)
      if (typeof token !== 'undefined' && token) {
        let res = await Utility.GetFromServer(config.api.url + '/verify/' + token)
        if (res.err === 0) {
          await localStorage.setItem(key, res.msg.token)
          dispatch({
            type: TYPES.SET_USER,
            payload: res.msg
          })
        }
      }
    } catch(e) {
        console.log(e)
    }
  }
}
