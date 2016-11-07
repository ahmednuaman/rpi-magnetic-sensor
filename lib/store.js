import { createStore } from 'redux'

export default createStore({
  door: (state = 0, action) => action.state || state
})
