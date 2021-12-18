// VARIABLES
{
var bodyParser = require('body-parser')
var fs = require('fs')
var express = require('express')
var mongoose = require('mongoose')

var urlencodedParser = bodyParser.urlencoded({extended: false})
var app = express()
express.json()
var Schema = mongoose.Schema
var dbURI = 'mongodb+srv://qwertybmw:mongodbpassword@cluster0.uehtx.mongodb.net/POGGIES?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => app.listen(process.env.PORT || 2137))
}

// Pepega Megaphone JSOOOOOOOOON
{
  var blogSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    snippet: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  }, {timestamps: true})

  var Blog = mongoose.model('Blog', blogSchema)
}
{
  app.get('/add-blog', (req, res) => {
    var blog = new Blog({
      title: 'new blog2',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })
    blog.save().then((result) => {
      res.send(result)
    })
  })
  app.get('/all-blogs', (req, res) => {
    // Blog.find().then((result) => {
    //   res.send(result)
    // })
    res.send(Blog.find())
  })
}

// Server
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
app.get('/solidGame', (req, res) => {
  res.sendFile(__dirname + '/public/solidGame/solidGameMenu.html')
})
app.get('/sundayFunday', (req, res) => {
  res.sendFile(__dirname + '/public/sundayFunday/sundayFunday.html')
})
}
