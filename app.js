require('ejs');

const express = require('express'),
      router = require('./routes');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('views','src/views');
app.set('view engine', 'ejs');


const port = 3000;
app.use(router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;