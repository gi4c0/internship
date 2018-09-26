module.exports = {
  db: 'mongodb://localhost/test',
  port: 3000,
  url: 'http://localhost:3000',
  secret: 'secret',
  secretForgotPass: 'forgot_password',
  secretRegistration: 'registration',
  storage: (multer) => {
    const path = require('path')
    return multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, 'public/uploads')
      },
      filename: function (req, file, callback) {
        var fname = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        callback(null, fname)
      }
    })
  }
}
