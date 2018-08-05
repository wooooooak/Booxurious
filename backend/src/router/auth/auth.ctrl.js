import express from 'express';
import { validationResult } from 'express-validator/check';
// import  bcrypt from 'bcryptjs';
import { matchedData } from 'express-validator/filter';
import User from '../../db/model/User';
import { generate, decodeToken } from '../../lib/jwt';

export const createAccount = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    const { username, email, socialProvider } = matchedData(req);
    const user = await User.create({
      username,
      email,
      socialProvider
    });
    const token = await generate({
      email,
      username,
      socialProvider
    });
    return res.json({ user, token: token });
  } catch (error) {
    console.log('err', error);
    return res.json({ message: error.name });
  }
};

export const loginSocailAccount = async (req, res) => {
  try {
    const { email, socialProvider } = req.body;
    const user = await User.findOne({ where: { email: email } });
    let token = '';
    if (user) {
      token = await Jwt.generate({
        socialProvider: socialProvider,
        email: email,
        username: user.username
      });
      res.json({ user, code: 1, token: token });
    } else {
      res.json({ socialProvider, email, code: 2 });
    }
  } catch (err) {
    console.log('eeerrrrr' + err);
  }
};

export const test = (req, res) => {
  res.send('test success');
};
