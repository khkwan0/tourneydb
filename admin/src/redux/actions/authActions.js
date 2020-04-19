import * as TYPES from '../types/types'
import config from '../../assets/configs/config'
import Utility from '../../library/Utility'

export const doLogin = (email, password) => {
  return async dispatch => {
    try {
      let res = await Utility.PostToServer(config.api.url + '/login', {email: email, password: password})
      if (res.err === 0) {
        const key = config.storage.key.prefix + '/token'
        await localStorage.setItem(key, res.msg.user[0].token)
        dispatch({
          type: TYPES.SET_USER,
          payload: res.msg.user[0]
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
      const key = config.storage.key.prefix + '/token'
      let token = await localStorage.getItem(key)
      if (typeof token !== 'undefined' && token) {
        let res = await Utility.GetFromServer(config.api.url + '/verify/' + token)
        if (res.err === 0) {
          await localStorage.setItem(key, res.msg[0].token)
          dispatch({
            type: TYPES.SET_USER,
            payload: res.msg[0]
          })
        }
      }
    } catch(e) {
        console.log(e)
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: TYPES.RESET_USER,
      payload: null
    })
  }
}
