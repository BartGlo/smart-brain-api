const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express()

app.use(cors())
app.use(express.json()) // for parsing application/json

const db = knex({
  client: 'pg',
  connection: {
<<<<<<< HEAD
    host: '127.0.0.1',
    user: 'mrg',
    password: '',
    database: 'smart-brain'
=======
    connectionString: process.env.DATABASE_URL,
    ssl: true
>>>>>>> 130fa93... fix
  }
})

app.get('/profile/:id', profile.handleProfileGet(db))

app.post('/detectFace', image.handleApiCall)

app.put('/image', image.handleImage(db))

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`)
})
