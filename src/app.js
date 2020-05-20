const fs = require('fs')
const path = require('path')
const express = require('express')

const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), {
  encoding: 'utf-8'
});
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), {
  encoding: 'utf-8'
});
const users = JSON.parse(userData);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Account Summary',
    accounts
  });
});

app.get('/savings', (req, res, next) => {
  res.render('account', {
    account: accounts.savings
  });
});
app.get('/checking', (req, res, next) => {
  res.render('account', {
    account: accounts.checking
  });
});
app.get('/credit', (req, res, next) => {
  res.render('account', {
    account: accounts.credit
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {
    user: users[0]
  });
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
