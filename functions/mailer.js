const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

const APP_NAME = 'Serverless Mailer by rpidanny';
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

exports.template = (to, subject, text) =>
  ({
    from: `${APP_NAME} <${EMAIL}>`,
    to,
    subject,
    text
  })