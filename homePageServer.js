// VARIABLES
{
var bodyParser = require('body-parser')
var fs = require('fs')
var express = require('express')

var urlencodedParser = bodyParser.urlencoded({extended: false})
var app = express()
}

// Pepega Megaphone JSOOOOOOOOON
{
 searchHistoryBuffer = fs.readFileSync('public/homePage/searchHistory.json')
 searchHistoryParsed = JSON.parse(searchHistoryBuffer)
//
// fs.writeFileSync('public/homePage/searchHistory.json', JSON.stringify(searchHistoryParsed, null, 2))
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

const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(2137)

app.listen(process.env.PORT || 2137)
}
