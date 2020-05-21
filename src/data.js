const fs = require('fs')
const path = require('path')

const accountsJsonPath = path.join(__dirname, 'json/accounts.json');
const accountData = fs.readFileSync(accountsJsonPath, {
  encoding: 'utf-8'
});
const accounts = JSON.parse(accountData);
const usersJsonPath = path.join(__dirname, 'json/users.json');
const userData = fs.readFileSync(usersJsonPath, {
  encoding: 'utf-8'
});
const users = JSON.parse(userData);

const writeJSON = () => {
  const accountsJSON = JSON.stringify(accounts);

  fs.writeFileSync(accountsJsonPath, accountsJSON, 'utf-8');
}

module.exports = {
  accounts,
  users,
  writeJSON
};
