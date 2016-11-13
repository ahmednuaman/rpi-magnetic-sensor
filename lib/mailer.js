import { createTransport } from 'nodemailer'
import moment from 'moment'
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
const opts = (open) => ({
  from: config.gmail,
  to: config.to.join(', '),
  subject: `Gate safe has ${open ? 'OPENED' : 'CLOSED'}`,
  body: moment().format('MMMM Do YYYY, h:mm:ss a')
})

store.subscribe(() => {
  const state = store.getState()
  const message = opts(state)

  console.log('Mailing:', message)

  client.sendMail(message, (error, data) => console.log(error, data))
})
