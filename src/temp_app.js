const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express();

app.use('views', path.join(__dirname, 'src', 'views'));
app.use('view engine', 'ejs');
app.use('/public', path.join(__dirname, 'src', 'public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Index'
  });
});

app.listen(3000);
