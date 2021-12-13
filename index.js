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
server.use(express.static('C:/Users/Szymon/Desktop/html/growCastleRipOff/client'))
server.use(express.static('C:/Users/Szymon/Desktop/html/solidGame/client'))
server.use(express.static('C:/Users/Szymon/Desktop/html/sundayFunday/public'))

server.get('', (req, res) => {
  res.sendFile('C:/Users/Szymon/Desktop/html/homePage/client/homePage.html')
})
server.get('/growCastleRipOff', (req, res) => {
  res.sendFile('C:/Users/Szymon/Desktop/html/growCastleRipOff/client/growCastleRipOff.html')
})
server.get('/solidGame', (req, res) => {
  res.sendFile('C:/Users/Szymon/Desktop/html/solidGame/client/solidGameMenu.html')
})
server.get('/sundayFunday', (req, res) => {
  res.sendFile('C:/Users/Szymon/Desktop/html/sundayFunday/public/sundayFunday.html')
})

server.post('', urlencodedParser, function (req,res) {
  console.log(req.body)
})

server.listen(process.env.PORT)
}
