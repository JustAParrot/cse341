const express = require('express');
const mongodb = require('./data/database')

// W01 Activity
//const cors = require('cors');
//const path = require('path');

const app = express();
const PORT = 8080;

//app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend')));

//app.get('/professional', (req, res) => {
//  res.json({
//    professionalName: "George Quito",
//    base64Image: "iVBORw0KGgoAAAANSUhEUgAAAAUA...", 
//    nameLink: { firstName: "George", url: "https://blablabla.com" },
//    primaryDescription: "Web developer Full Stack",
//    workDescription1: "Terrible with Backend",
//    workDescription2: "Terrible with Frontend",
//    linkTitleText: "Leave Me Alone",
//    linkedInLink: { text: "LinkedIn", link: "https://linkedin.com/in/" },
//    githubLink: { text: "GitHub", link: "https://github.com/" }
//  });
//});

mongodb.intDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(PORT, () => {console.log(`Database listening and Server running at http://localhost:${PORT}`)});
  }
});


