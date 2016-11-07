import { createTransport } from 'nodemailer'
import store from './store'

const config = require('../config.json')
const client = createTransport(`smtps://${config.gmail}:${config.password}@smtp.gmail.com`)
const opts = (closed) => ({
  from: config.gmail,
  to: config.to.join(', '),
  subject: `Gate safe has ${closed ? 'CLOSED' : 'OPENED'}`,
  body: '👍'
})

store.subscribe(() => {
  const state = store.getState()

  client.sendMail(opts(state.door), (error, data) => console.log(error, data))
})
