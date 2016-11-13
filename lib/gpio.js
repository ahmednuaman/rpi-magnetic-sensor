import rpio from 'rpio'
import store from './store'

const PIN = 12

const trigger = () => {
  const state = rpio.read(PIN)
  const currentState = store.getState()
  
  console.log(`Pin ${PIN}'s state: ${state}`)
  
  if (state !== currentState) {
    store.dispatch({
      type: 'READ',
      state
    })
  }
}

rpio.open(PIN, rpio.INPUT, rpio.PULL_UP)
rpio.poll(PIN, trigger)
trigger()
