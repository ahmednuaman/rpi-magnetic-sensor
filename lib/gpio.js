import rpio from 'rpio'
import store from './store'

const PIN = 12

rpio.open(PIN, rpio.INPUT, rpio.PULL_DOWN)
rpio.poll(PIN, (pin) => {
  const state = rpio.read(pin)

  store.dispatch({
    type: 'READ',
    state
  })
})
