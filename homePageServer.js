// VARIABLES
{
var bodyParser = require('body-parser')
var fs = require('fs')
var express = require('express')
var mongoose = require('mongoose')

var urlencodedParser = bodyParser.urlencoded({extended: false})
var app = express()
app.use(express.json({limit: '1mb'}))
app.use(express.urlencoded({extended: true}))
var Schema = mongoose.Schema
var dbURI = 'mongodb+srv://qwertybmw:mongodbpassword@cluster0.uehtx.mongodb.net/POGGIES?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => app.listen(process.env.PORT || 2137))
}

// When the Mongoose is sus
{
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
  app.get('/solidGame/users', (req, res) => {
    Users.find().then((result) => {
      res.send(result)
    })
  })
  app.post('/solidGame/login', (req, res) => {
    Users.find().then((result) => {
      var loggingIn = false
      for (var i = 0; i < result.length; i++) {
        if (result[i].username === req.body.username &&
        result[i].password === req.body.password) {
          loggingIn === true
        }
      }
      if (loggingIn) {
        res.redirect('/solidGame/users')
      } else {
        res.redirect('/growCastleRipOff')
      }
    })
  })
}
// APP
{
app.use(express.static('public/homePage'))
app.use(express.static('public/growCastleRipOff'))
app.use(express.static('public/solidGame'))
app.use(express.static('public/sundayFunday'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/homePage/homePage.html')
})
app.get('/growCastleRipOff', (req, res) => {
  res.sendFile(__dirname + '/public/growCastleRipOff/growCastleRipOff.html')
})
app.get('/solidGame/login', (req, res) => {
  res.sendFile(__dirname + '/public/solidGame/solidGameMenu.html')
})
app.get('/sundayFunday', (req, res) => {
  res.sendFile(__dirname + '/public/sundayFunday/sundayFunday.html')
})
}
