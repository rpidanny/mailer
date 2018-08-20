const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

const APP_NAME = 'Serverless Mailer';
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
    from: from || `${APP_NAME} <${EMAIL}>`,
    to,
    subject,
    text: text.concat(`<br /><br /><i>Email send using <b>${APP_NAME}</b> by <b>rpidanny</b></i>`)
  })