require('dotenv').config()
require('ejs');



const express = require('express'),
      router = require('./routes'),
      passport = require('passport'),
      passport_config = require('./database/passport_config');


const app = express();

// Configurações do express
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.set('views','src/views');
app.set('view engine', 'ejs');



// Configurações do passport
app.use(passport_config.session_config);
app.use(passport.initialize());
app.use(passport.session());
passport.use(passport_config.localStrategy);
passport.serializeUser(passport_config.serializeUser);
passport.deserializeUser(passport_config.deserializeUser);



// Rotas
app.use(router);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;