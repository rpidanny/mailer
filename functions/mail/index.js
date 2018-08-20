const mailer = require('./mailer')
const util = require('../util')

const mailTransport = mailer.getMailer()

module.exports = app => {
  app.get('/', (req, res) => {
    return res.json({
      data: {
        message: 'Hello World'
      }
    })
  })
  
  app.get('/test', (req, res) => {
    return res.json({
      data: {
        keys: Object.keys(req),
        headers: req.headers
      }
    })
  })
  
  app.post('/mail', (req, res, next) => {
    const result = util.validateEmail(req.body)
    if (result.error) {
      return next(result.error)
    }
    const { to, subject, text, from } = req.body
    const mailOptions = mailer.template(from, to, subject, text)
    mailTransport
      .sendMail(mailOptions)
      .then(data =>
        res.send({
          data: {
            success: true,
            message: 'Email Sent'
          }
        })
      )
      .catch(err => next(err))
  })
}