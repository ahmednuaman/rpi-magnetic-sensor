import { createTransport } from 'nodemailer'
import { pins } from './pins'

import moment from 'moment'
import path from 'path'
import RC from 'raspicam'
import store from './store'

const config = require(path.resolve(__dirname, '../config.json'))
const client = createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: config.gmail,
    pass: config.password
  }
})
const opts = ({ open, pin }) => ({
  from: config.gmail,
  to: config.to.join(', '),
  subject: `Gate ${pins[pin]} has ${open ? 'OPENED' : 'CLOSED'}`,
  text: '👍 ' + moment().format('MMMM Do YYYY, h:mm:ss a')
})

const camera = new RC({
  mode: 'photo',
  output: path.join(process.cwd(), 'photos/%d.jpg')
})

const PREPARE_TIMEOUT = 2000
let prepareTimeout

const prepare = () => {
  clearTimeout(prepareTimeout)

  prepareTimeout = setTimeout(send, PREPARE_TIMEOUT)
}

const send = () => {
  const state = store.getState()
  const message = opts(state)

  console.log('Mailing:', message)

  camera.start()
  camera.stop()

  client.sendMail(message, (error, data) => console.log(error, data))
}

store.subscribe(prepare)
