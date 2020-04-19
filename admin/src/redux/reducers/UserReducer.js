import * as TYPES from '../types/types'

const INITIAL_STATE = {
  user: {
    _id: null,
    email: null,
    level: 0,
    locations: [],
    token: null,
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_USER:
      console.log('setuser')
      return {
        ...state,
        user: action.payload
      }
    case TYPES.RESET_USER:
      return {
        ...state,
        user: INITIAL_STATE
      }
    default: return state
  }
}
