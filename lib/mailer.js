import { createTransport } from 'nodemailer'
import store from './store'

const config = require('../config.json')
const client = createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: config.gmail,
    pass: config.password
  }
})
const opts = (closed) => ({
  from: config.gmail,
  to: config.to.join(', '),
  subject: `Gate safe has ${closed ? 'CLOSED' : 'OPENED'}`,
  body: '👍'
})

store.subscribe(() => {
  const state = store.getState()

  client.sendMail(opts(state), (error, data) => console.log(error, data))
})
