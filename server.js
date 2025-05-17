const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/', require('./routes'));

app.use(express.json());

// Swagger
const setupSwagger = require('./swagger');
setupSwagger(app);

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {console.log(`Database listening and Server running at http://localhost:${port}`)});
  }
});