exports.storage = (multer) => {
  const path = require('path')
  return multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'public/uploads')
    },
    filename: function (req, file, callback) {
      const fname = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      callback(null, fname)
    }
  })
}
exports.filterImage = (req, file, cb) => {
  if (!file.mimetype.match(/image/g)) return cb(new Error('Only image allowed'))
  cb(null, true)
}
