// VARIABLES
{
const bodyParser = require('body-parser')
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')

const urlencodedParser = bodyParser.urlencoded({extended: false})
const app = express()
const Schema = mongoose.Schema
const dbURI = 'mongodb+srv://qwertybmw:mongodbpassword@cluster0.uehtx.mongodb.net/POGGIES?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => app.listen(process.env.PORT || 2137))
}

// Pepega Megaphone JSOOOOOOOOON
{

}
{
  // app.get('/add-blog', (req, res) => {
  //   const blog = new Blog({
  //     title: 'new blog',
  //     snippet: 'about my new blog',
  //     body: 'more about my new blog'
  //   })
  //   blog.save()
  //   .then((result) => {
  //     res.send(result)
  //   })
  // })
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

app.post('/', (req, res) => {
  res.send('kappa')
})
}
