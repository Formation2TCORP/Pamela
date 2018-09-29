
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo-node-app');
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${'mongodb://localhost:27017/demo-node-app'}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

require ('./models/Registration');
const app = require ('./app');
const serveur = app.listen(3000, () => {
  console.log (`Express s'exécute sur le port $ {server.address (). port}`)
});