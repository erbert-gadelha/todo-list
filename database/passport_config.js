require('dotenv').config();

const session       = require('express-session'),
      userController= require('../controllers/userController'),
      db            = require('../database'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt        = require('bcrypt');

module.exports = {
    'session_config': session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false
    }),
    'localStrategy': new LocalStrategy({
            usernameField: 'login',
            passwordField: 'password'
        }, async (login, password, done) => {

            const user_ = await userController.authenticate(login, password);
            if(user_)
                return done(null, user_);
            else
                return done(null, false, { message: 'email ou senha incorretos.' });
        }
    ),
    serializeUser: (user, done) => {
        done(null, {
            id: user.id,
            login: user.email,
            name: user.name
        });
    },
    deserializeUser: async (user, done) => {
        try {
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }

}