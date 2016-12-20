import { PINS } from './pins'

import rpio from 'rpio'
import store from './store'

const trigger = (pin) => () => {
  const open = rpio.read(pin)
  const currentState = store.getState()
  
  console.log(`Pin ${pin}'s open: ${open}`)
  
  if (open !== currentState) {
    store.dispatch({
      type: 'READ',
      pin,
      open
    })
  }
}

PINS.forEach((pin) => {
  const cb = trigger(pin)

  rpio.open(pin, rpio.INPUT, rpio.PULL_UP)
  rpio.poll(pin, cb)
  cb()
})
