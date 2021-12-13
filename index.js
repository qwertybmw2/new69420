// VARIABLES
{
var bodyParser = require('body-parser')
var fs = require('fs')
var express = require('express')

var urlencodedParser = bodyParser.urlencoded({extended: false})
var server = express()
}

// Pepega Megaphone JSOOOOOOOOON
{
searchHistoryBuffer = fs.readFileSync('client/searchHistory.json')
searchHistoryParsed = JSON.parse(searchHistoryBuffer)

fs.writeFileSync('client/searchHistory.json', JSON.stringify(searchHistoryParsed, null, 2))
}

// Server
{
server.use(express.static('client'))
server.use(express.static(__dirname + '../growCastleRipOff/client'))
server.use(express.static(__dirname + '../solidGame/client'))
server.use(express.static(__dirname + '../sundayFunday/public'))

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/homePage.html')
})
server.get('/growCastleRipOff', (req, res) => {
  res.sendFile(__dirname + '../growCastleRipOff/client/growCastleRipOff.html')
})
server.get('/solidGame', (req, res) => {
  res.sendFile(__dirname + '../solidGame/client/solidGameMenu.html')
})
server.get('/sundayFunday', (req, res) => {
  res.sendFile(__dirname + '../sundayFunday/public/sundayFunday.html')
})

server.listen(process.env.PORT)
}
// nodemon homePageServer.js --ignore searchHistory.json
