const nodemailer = require('nodemailer')

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
  from: 'Alex_T <o.tanasov@do-it.co>', // sender address
  to: 'e3365940@nwytg.net', // list of receivers
  subject: 'Confirm your email' // Subject line
}

// send mail
exports.sendMail = (token, email) => {
  const html = `<b>Hi ${email}</b><br><a href = http://localhost:3000/api/users/confirm-token?token=${token}>Ссыыыылка`
  transporter.sendMail({ ...mailOptions, html: html })
    .then(console.log)
    .catch(console.log)
}