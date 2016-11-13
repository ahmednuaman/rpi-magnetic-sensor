import { createStore } from 'redux'

export default createStore((state = 0, action) => action.state)
