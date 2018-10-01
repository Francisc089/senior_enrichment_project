//creates server, defines routes, and seeds data
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db');
const path = require('path');

//define specific routes
app.use('/api/students', require('./api/students.js'));
app.use('/api/schools', require('./api/schools.js'));

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
});

//start server
app.listen(port, () => console.log(`listening on ${port}`));

//sync database
db.syncAndSeed()
  .then(() => console.log('Database is synced'));
