const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

app.get('/students', function(req, res) {
  knex.raw("SELECT * FROM students").then((result) => {
    res.json(result.rows)
  })
  .catch((err) => {
    console.error(err)
  });
});

app.get('/students/:id', (req, res) => {
  knex.raw("SELECT * FROM students WHERE students.id = " + req.params.id).then(result => {
    res.json(result.rows)
  }).catch(err => {
    console.log(err); 
    res.sendStatus(404)
  });
});

app.post('/students', (req, res) => {
  if(req.body.name && req.body.age) {
    knex.raw("INSERT INTO students (name, age) VALUES ('" + req.body.name + "', " + req.body.age + ")").then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(400);
  }
});

app.put('/students/:id', (req, res) => {
  if(req.body.name && req.body.age) {
    knex.raw("UPDATE students SET name = '" + req.body.name + "', age = " + req.body.age + " WHERE id = " + req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
  }
});

app.delete('/students/:id', (req, res) => {
  knex.raw("DELETE FROM students WHERE students.id = " + req.params.id)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})

app.listen(port, function() {
  console.log('Listening on', port);
});
