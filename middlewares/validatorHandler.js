const boom = require('@hapi/boom');

//middleware dinámico
function validatorHandler(schema, property) {
  return (req, res, next) => {
    //obtenermos la info del property dinamicamente
    const data = req[property];
    //abortEarly para enviar todos los errores de golpe
    const { error } = schema.validate(data,{ abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
