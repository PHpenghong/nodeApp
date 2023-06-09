module.exports = () => (err, req, res, next) => {
  console.log(next)
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'
  res.status(err.statusCode).json({
    message: err.message
  })
}
