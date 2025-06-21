const path = require('path');
const express = require('express');
const users = require('./users.json');

const app = express();

const PORT = 3000;

app.use('/', express.static(path.resolve(__dirname, '../frontend')));

app.get('/api/users', (req, res) => {
  res.status(200).send({
    users,
  });
});

(async () => {
  await app.listen(PORT);
  console.log(`listening on port ${PORT}`);
})();