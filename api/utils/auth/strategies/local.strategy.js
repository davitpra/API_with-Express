const { Strategy } = require('passport-local');

const AuthService = require('../../../service/auth.service');
const service = new AuthService();

const LocalStrategy = new Strategy(
  // cambiamos los nombres de los campos
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
