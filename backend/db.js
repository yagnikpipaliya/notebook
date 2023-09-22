// Using Node.js `require()`
const mongoose = require('mongoose');
const dbURL='mongodb://localhost:27017'
mongoose.connect('mongodb://127.0.0.1:27017/notebook')
  .then(() => console.log('Connected!'));