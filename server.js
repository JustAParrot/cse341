const express = require('express');
const mongodb = require('./data/database');
const app = express();
const setupSwagger = require('./swagger');

const port = process.env.PORT || 8080;

app.use(express.json());

setupSwagger(app);

app.use('/contacts', require('./routes/contacts'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
});
