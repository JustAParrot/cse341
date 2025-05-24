const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./data/database');
const setupSwagger = require('./swagger');


setupSwagger(app);

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Routes
app.use('/pokemons', require('./routes/pokemons'));

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  }
});
