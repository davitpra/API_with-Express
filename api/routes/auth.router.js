const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { config } = require('../config/config');

router.post(
  '/login',
  // verificamos el email y el password
  passport.authenticate('local', { session: false }),
  //si todo sale bien pasa a este middleware
  async (req, res, next) => {
    try {
      // se obtiene el usuario
      const user = req.user;
      // se crea un payload con user
      const payload = {
        sub: user.id,
        role: user.role,
      };
      // lo firmamos
      const token = jwt.sign(payload, config.jwtSecret);
      //enviamos el usuario y el token
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
