exports.errorHandler = (err, req, res, next) => {
  const code = err.httpCode || 500
  if (code === 500) console.log(err)
  res.status(code).json({ error: err.message || err })
}
