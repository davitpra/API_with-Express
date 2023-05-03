const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
  // indica donde esta el token -> Bearer Token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // donde esta la llave
  secretOrKey: config.jwtSecret,
};

//strategy internamente verficia el token con las opciones
const JwtStrategy = new Strategy(
  //configuramos las opciones
  options,
  //obtenemos el payload
  (payload, done) => {
    //no obtenemos errores y retornamos el payload.
  return done(null, payload);
});

module.exports = JwtStrategy;
