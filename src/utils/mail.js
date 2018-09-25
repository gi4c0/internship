const nodemailer = require('nodemailer')

const config = require('config')
const url = config.get('url')

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '22cf995880c6a0',
    pass: '0290fc4df38b7f'
  }
})
// setup email data with unicode symbols
const mailOptions = {
  from: 'Alex_T <o.tanasov@do-it.co>' // sender address
}

// send mail
exports.sendMail = (mailBody) => {
  const html = `<b>Hi ${mailBody.email}</b><br><a href = ${url + mailBody.route}?token=${mailBody.token}>Ссыыыылка`
  transporter.sendMail({ ...mailOptions, html, to: mailBody.email, subject: mailBody.subject })
    .catch(console.log)
}
