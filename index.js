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
  req.time = new Date();
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
  res.status(200).send('Are you OK?');
});

// app.use('/', function (req, res, next) {
//   console.log(req.url + ' This is root app.use. Time is now: ' + 'Time: %d', Date.now() );
//   next();
// });





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
  res.send(`Hello ${title.toUpperCase()}.${name}`);
});
//-----
// app.get('/user/:id', function (req, res, next) {
//   console.log('although this matches')
//   next()
// })
//
// app.param('id', function (req, res, next, id) {
//   console.log('App.param CALLED ONLY ONCE' + `and the ID is ${id}.`)
//   next()
// })
//
// app.get('/user/:id', function (req, res) {
//   console.log('and this matches too')
//   res.end()
// })
//-----

// customizing the behavior of app.param()
app.param(function (param, option) {
  return function (req, res, next, val) {
    // console.log(`Req: ${req}`);
    // console.log(`Res: ${res}`);
    // console.log(`Next: ${next}`);
    console.log(`Val: ${val}`);
    // console.log(`Param: ${param}`);
    console.log(`Option: ${option}`);
    if (val === option) {
      console.log('val = option')
      next()
    } else {
      console.log('val != option!')
      next()
    }
  }
})

// using the customized app.param()
app.param('id', 1337)

// route to trigger the capture
app.get('/user/:id', function (req, res) {
  res.send('OK' + `The ID is: ${req.params.id}.`)
})

app.listen(3000);
