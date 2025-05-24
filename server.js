const express = require('express');
const mongodb = require('./data/database');
const app = express();
const setupSwagger = require('./swagger');

const port = process.env.PORT || 8080;

app.use(express.json());

setupSwagger(app);

app.use('/contacts', require('./routes/contacts'));

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found. Please leave my server alone :(' });
});

// Global error handler for routes 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'GG - Jungle Diff - FF15', error: err.message });
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
});
