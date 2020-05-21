const express = require('express')
const { accounts } = require('../data')

const router = express.Router();

router.get('/savings', (req, res, next) => {
  res.render('account', {
    account: accounts.savings
  });
});
router.get('/checking', (req, res, next) => {
  res.render('account', {
    account: accounts.checking
  });
});
router.get('/credit', (req, res, next) => {
  res.render('account', {
    account: accounts.credit
  });
});

module.exports = router;
