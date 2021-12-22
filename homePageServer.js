// REQUIRIES
{
var express = require('express')
var session = require('express-session')
var mongoose = require('mongoose')

var app = express()
app.use(express.json({limit: '1mb'}))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: '8/21',
  resave: false,
  saveUninitialized: false
}))
}

// When the Mongoose is sus
{
  var dbURI = 'mongodb+srv://qwertybmw:mongodbpassword@cluster0.uehtx.mongodb.net/POGGIES?retryWrites=true&w=majority'
  mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => app.listen(process.env.PORT || 2137))
  var Schema = mongoose.Schema
  var userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  })

  var Users = mongoose.model('Users', userSchema)
}
{
  app.get('/solidGame', (req, res) => {
    if (!req.session.user) {
      res.redirect('/solidGame/login')
    } else {
      res.send(req.session.user)
    }
  })
  app.get('/solidGame/users', (req, res) => {
    Users.find().then((result) => {
      res.send(result)
    })
  })
  app.get('/solidGame/login', (req, res) => {
    res.sendFile(__dirname + '/public/solidGame/logIn/solidGameLogIn.html')
  })
  app.get('/solidGame/signup', (req, res) => {
    res.sendFile(__dirname + '/public/solidGame/signUp/solidGameSignUp.html')
  })

  app.post('/solidGame/login', (req, res) => {
    Users.find().then((result) => {
      var loggingIn = false
      var wrongUsername = true
      var wrongPassword = true
      for (var i = 0; i < result.length; i++) {
        if (!loggingIn) {
          wrongUsername = true
          wrongPassword = true
          if (result[i].username === req.body.username &&
          result[i].password === req.body.password) {
            loggingIn = true
          }
          if (result[i].username === req.body.username) {
            wrongUsername = false
          }
          if (result[i].password === req.body.password) {
            wrongPassword = false
          }
        }
      }
      if (loggingIn) {
        req.session.user = req.body.username
        res.redirect('/solidGame').send(req.session.user)
      } else if (wrongUsername) {
        res.status(404).send('invalid username')
      } else if (wrongPassword) {
        res.status(401).send('invalid password')
      }
    })
  })
  app.post('/solidGame/signup', (req, res) => {
    Users.find().then((result) => {
      var signingUp = true
      for (var i = 0; i < result.length; i++) {
        if (result[i].username === req.body.username) {
          signingUp = false
        }
      }
      if (!signingUp) {
        res.redirect('/solidGame/users')
      } else {
        new Users(req.body).save().then((result) => {
          res.redirect('/solidGame/users')
        })
      }
    })
  })
}

// APP
{
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/homePage/homePage.html')
})
app.get('/growCastleRipOff', (req, res) => {
  res.sendFile(__dirname + '/public/growCastleRipOff/growCastleRipOff.html')
})
app.get('/sundayFunday', (req, res) => {
  res.sendFile(__dirname + '/public/sundayFunday/sundayFunday.html')
})
}
