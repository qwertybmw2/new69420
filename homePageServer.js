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
searchHistoryBuffer = fs.readFileSync('public/homePage/searchHistory.json')
searchHistoryParsed = JSON.parse(searchHistoryBuffer)

fs.writeFileSync('public/homePage/searchHistory.json', JSON.stringify(searchHistoryParsed, null, 2))
}
console.log(searchHistoryParsed.myData.baits)

// Server
{
server.use(express.static('public/homePage'))
server.use(express.static('public/growCastleRipOff'))
server.use(express.static('public/solidGame'))
server.use(express.static('public/sundayFunday'))

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/homePage/homePage.html')
})
server.get('/growCastleRipOff', (req, res) => {
  res.sendFile(__dirname + '/public/growCastleRipOff/growCastleRipOff.html')
})
server.get('/solidGame', (req, res) => {
  res.sendFile(__dirname + '/public/solidGame/solidGameMenu.html')
})
server.get('/sundayFunday', (req, res) => {
  res.sendFile(__dirname + '/public/sundayFunday/sundayFunday.html')
})

server.listen(process.env.PORT || 2137)
}
