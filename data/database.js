const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

let client;

const initDb = (callback) => {
  if (client) return callback(null, client);
  MongoClient.connect(uri)
    .then((connectedClient) => {
      client = connectedClient;
      callback(null, client);
    })
    .catch((err) => callback(err));
};

const getDb = () => client.db('pokemonDB');

module.exports = { initDb, getDb };
