const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// DB Knex Setup
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send(`it is working`)  })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res,) })

// Server Listening
app.listen(process.env.PORT || 3000, () => {
  console.log(`this app running on port 3001 ${process.env.PORT}`)
})