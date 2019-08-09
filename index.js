const express = require('express')

const app = express();

function checkTitle(req, res, next) {
  const {title} = req.query;
  if (!title) {
    return res.status(404).send('No Title.');
  }
  next();
}

function getTime(req, res, next) {
  const time = new Date();
  req.time = time;
  next();
};

//
// app.use((req, res, next) => {
//   console.log('global middleware: ' + Date.now());
//   res.write('From global middleware.\n');
//   next();
// });
//
// app.use('/api/:name',(req, res, next) => {
//   console.log('name middleware: ' + req.params.name);
//   res.write('From name middleware.');
//   next();
// });

app.get('/', function (req, res) {
  res.status(200).write('Are you OK?');
});

app.get('/api/greeting/:name', checkTitle, getTime, (req, res) => {

  const {name} = req.params;
  const {title} = req.query;
  console.log(req.params);
  // res.status(200).send(`Hello ${req.params.name}`);
  // res.status(200).send(`Hello ${title}`);
  res.send(`Hello ${title.toUpperCase()}.${name}, ${req.time}`);

});

app.get('/api/greeting/:title/:name', (req, res) => {
  const {title, name} = req.params;
  console.log(req.params);
  res.write(`Hello ${title.toUpperCase()}.${name}`);
});




app.listen(3000);
