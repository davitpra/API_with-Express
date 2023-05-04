const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    //obtenemos el user
    const user = await service.findByEmail(email);
    //si no lo encontramos lanzamos un error
    if (!user) {
      throw boom.unauthorized();
    }
    //se genera el payload con el usuario id.
    const payload = { sub: user.id };
    //encriptamos el JWT con el payload y un refresh en 15min.
    const token = jwt.sign(payload, config.jwtRecoverySecret, {
      expiresIn: '15min',
    });
    // se genera un link con el token como query.
    const link = `https://myfrontend.com/recovery?token=${token}`;
    // se actualiza el token en la base de datos.
    await service.update(user.id, { recoveryToken: token });
    // se genera el contenido para email.
    const mail = {
      from: `"Foo Boo 👻" <${config.mailerEmail}>`,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link para recuperar tu contraseña: ${link}</b>`,
    };
    // se envia el email con lo que puede recuperar la contraseña.
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.mailerEmail,
        pass: config.mailerPassword,
      },
    });

    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
