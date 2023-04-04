

function logError (err, req, res, next) {
  console.log ('logErrors')
  console.error(err)
  next(err)
}

function errorHandler (err, req, res, next) {
  console.log ('errorHandler')
res.status(500).json({
  message: err.message,
  stack: err.stack
})
}
// al momento de setear un res ya no puedes modificarlo en otro middleware
// por lo que sale el siguiente error:
// Cannot set headers after they are sent to the client.
// para solucionarlo tienes que dividir la logica con un else.
function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const {output} = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next (err)
  }

}


module.exports = {logError, errorHandler, boomErrorHandler}
