import * as TYPES from '../types/types'

const INITIAL_STATE = {
  user: {
    _id: null,
    email: null,
    level: 0,
    locations: []
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
    default: return state
  }
}
