const fs = require('fs')
const path = require('path')
const express = require('express')

const accountsPath = path.join(__dirname, 'json/accounts.json');
const accountData = fs.readFileSync(accountsPath, {
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
app.use(express.urlencoded({ extended: true }));

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
app.get('/transfer', (req, res) => {
  res.render('transfer');
});
app.post('/transfer', (req, res) => {
  const fromAccount = accounts[req.body.from];
  const toAccount = accounts[req.body.to];
  const amount = parseInt(req.body.amount);

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  const accountsJSON = JSON.stringify(accounts);

  fs.writeFileSync(accountsPath, accountsJSON, 'utf-8');

  res.render('transfer', {
    message: 'Transfer Completed'
  });
});
app.get('/payment', (req, res) => {
  res.render('payment', {
    account: accounts.credit
  });
});
app.post('/payment', (req, res) => {
  const amount = parseInt(req.body.amount);

  accounts.credit.balance -= amount;
  accounts.credit.available += amount;

  const accountsJSON = JSON.stringify(accounts);

  fs.writeFileSync(accountsPath, accountsJSON, 'utf-8');

  res.render('payment', {
    message: "Payment Successful",
    account: accounts.credit
  });
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
