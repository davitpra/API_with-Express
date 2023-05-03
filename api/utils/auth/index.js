const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.stategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);

module.exports = passport
