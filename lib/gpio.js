import rpio from 'rpio'
import store from './store'

const PIN = 12

const trigger = () => {
  const state = rpio.read(PIN)

  store.dispatch({
    type: 'READ',
    state
  })
}

rpio.open(PIN, rpio.INPUT, rpio.PULL_UP)
rpio.poll(PIN, trigger)
