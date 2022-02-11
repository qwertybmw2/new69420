// REQUIRIES
{
var express = require('express')
var session = require('express-session')
var mongoose = require('mongoose')

var app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: '8/21',
  resave: false,
  saveUninitialized: false
}))
app.use(express.static('public/homePage'))
app.use('/sundayFunday', express.static('public/sundayFunday'))
app.use('/sundayFunday/login', express.static('public/sundayFunday'))
app.use('/sundayFunday/signup', express.static('public/sundayFunday'))
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
    },
    x: {
      type: Number,
      required: true,
      default: 0
    },
    y: {
      type: Number,
      required: true,
      default: 0
    },
    zoom: {
      type: Number,
      required: true,
      default: 4
    }
  })

  var Users = mongoose.model('Users', userSchema)
}
{
  app.get('/sundayFunday', (req, res) => {
    if (!req.session.user) {
      res.redirect('/sundayFunday/login')
    } else {
      res.sendFile(__dirname + '/public/sundayFunday/sundayFunday.html')
    }
  })
  app.get('/sundayFunday/users', (req, res) => {
    Users.find().then((result) => {
      res.send(result)
    })
  })
  app.get('/sundayFunday/login', (req, res) => {
    res.sendFile(__dirname + '/public/sundayFunday/logIn/solidGameLogIn.html')
  })
  app.get('/sundayFunday/signup', (req, res) => {
    res.sendFile(__dirname + '/public/sundayFunday/signUp/solidGameSignUp.html')
  })
  app.get('/sundayFunday/json', (req, res) => {
    Users.find().then((result) => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].username === req.session.user) {
          res.json({
            x: result[i].x,
            y: result[i].y,
            zoom: result[i].zoom
          })
        }
      }
    })
  })

  app.post('/sundayFunday', async (req, res) => {
    await Users.findOneAndUpdate({
      username: req.session.user
    },
    {
      x: req.body.x,
      y: req.body.y,
      zoom: req.body.zoom
    })
    res.status(200)
  })
  app.post('/sundayFunday/login', (req, res) => {
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
        res.redirect('/sundayFunday')
      } else if (wrongUsername) {
        res.status(404).send('invalid username')
      } else if (wrongPassword) {
        res.status(401).send('invalid password')
      }
    })
  })
  app.post('/sundayFunday/signup', (req, res) => {
    Users.find().then((result) => {
      var signingUp = true
      for (var i = 0; i < result.length; i++) {
        if (result[i].username === req.body.username) {
          signingUp = false
        }
      }
      if (!signingUp) {
        res.status(403)
      } else {
        new Users(req.body).save().then(() => {
          res.redirect('/sundayFunday/login')
        })
      }
    })
  })

  app.delete('/sundayFunday', async (req, res) => {
    await Users.findOneAndDelete({username: req.session.user})
    res.status(200).redirect('/sundayFunday/login')
  })
}

// APP
{
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/homePage/homePage.html')
})
app.get('/growCastleRipOff', (req, res) => {
  res.sendFile(__dirname + '/public/growCastleRipOff/growCastleRipOff.html')
})
}
