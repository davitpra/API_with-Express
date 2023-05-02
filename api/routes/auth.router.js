const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post(
  '/login',
  // indicamos que la estrategia es local y que no queremos manejar sesiones.
  passport.authenticate('local', { session: false }),
  //si todo sale bien pasa a este middleware
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
