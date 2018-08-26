const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

const APP_NAME = 'Mailer';
const EMAIL = functions.config().gmail.email;
const PASS = functions.config().gmail.password;

exports.getMailer = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASS
    }
  })

exports.template = (from, to, subject, text) =>
  ({
    from: `${from || APP_NAME} <${EMAIL}>`,
    to,
    subject,
    text: `${text}\r\n\r\nEmail sent using ${APP_NAME} by <b>@rpidanny`,
    html: `${text}<br /><br /><i>Email sent using <b>${APP_NAME}</b> by <b>@rpidanny</b></i>`
  })