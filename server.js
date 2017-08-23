const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);

//Logger middleware - logs requests in a file
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + " " + req.url + " " + req.method;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
  next(); //important!! without this, the routes will not work
});

//maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//   //note the missing next() which means user cannot navigate to any page.
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    name: "Vasu"
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.listen(port, () => {
  console.log(`Server is up listening on port: ${port}`);
});

app.get('/bad', (request, response) => {
  response.send({
    'error': 'bad request provided'
  })
});
