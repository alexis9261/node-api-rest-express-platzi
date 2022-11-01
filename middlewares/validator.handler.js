const boom = require('@hapi/boom')

function validatorHandler(schema, property) {

  return  (req, res, next ) => {
    // aqui la propiedad se buscara en req.paramas, req.body y req.query
    // En cualquiera de esas tres opciones
    const data  = req[property];
    const { error } = schema.validate(data, {abortEarly: false});

    if(error) {
      next(boom.badRequest(error));
    }

    next();
  }

}

module.exports = validatorHandler;
