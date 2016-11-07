import rpio from 'rpio'

const PIN = 12

rpio.open(PIN, rpio.INPUT, rpio.PULL_DOWN)
rpio.poll(PIN, (pin) => {
  const state = rpio.read(pin)

  console.log(state)
})

setInterval(() => {
  console.log(rpio.read(PIN))
}, 200)
