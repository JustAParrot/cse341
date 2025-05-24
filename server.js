const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./data/database');

dotenv.config();
const app = express(); 

app.use(express.json());

const setupSwagger = require('./swagger'); 
setupSwagger(app); 

app.use('/pokemons', require('./routes/pokemons'));
app.use('/moves', require('./routes/moves'));

const port = process.env.PORT || 8080;

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  }
});
