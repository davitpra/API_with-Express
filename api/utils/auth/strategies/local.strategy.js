const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const UserService = require('../../../service/user.service');
const service = new UserService();

const LocalStrategy = new Strategy(
  // cambiamos los nombres de los campos
  {
    usernameField: 'email',
    passwordField: 'password',
  },
    //se crea una funcion async que requiere del usuario y contrasena
  async (email, password, done) => {
    try {
      // se busca el usuario x email con la nueva funcion.
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      // compara el password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      //borra el password
      delete user.dataValues.password;
      // envia null como error y el usuario.
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
