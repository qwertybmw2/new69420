// variables
{
var player = document.getElementsByClassName('player')[0]
var playerPixel = document.getElementsByClassName('player-pixel')
var settings = document.getElementsByClassName('settings-circle')[0]
var wPressed, aPressed, sPressed, dPressed, lastZoom, playerCoordinates, createWorld
var world = []
var worldPositions = [{x: 0, y: 0}]
var worldRendered = 0
var currentZoom = 100
var zoom = 4
var timer = 0
}

{
  world.push([])
  for (var i = worldRendered; i < world.length; i++) {
    var worldi = document.createElement('div')
    worldi.classList = 'world'
    worldi.id = 'world' + i
    document.body.prepend(worldi)
    for (var j = 0; j < 400; j++) {
      world[i].push(document.createElement('div'))
      worldi.appendChild(world[i][j])
    }
  }
  worldRendered++
}

// REQUESTS
{
  setInterval(
    function () {
      fetch('/sundayFunday', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          x: 50 - ((50 - parseFloat(document.getElementById('world0').style.left)) * (4 / zoom)),
          y: 50 * 0.5625 - ((50 * 0.5625 - parseFloat(document.getElementById('world0').style.top)) * (4 / zoom))
        })
      })
    }, 1000
  )
  fetch('/sundayFunday/coordinates').then((result) => {
    return result.json()
  }).then((json) => {
    document.getElementById('world0').style.top = json.y + 'vw' 
    document.getElementById('world0').style.left = json.x + 'vw'
    
    addEventListener('wheel', (e) => {
      switch (Math.sign(e.deltaY)) {
        case -1:
          if (zoom < 7) {
            zoom++
          }
          break
        case 1:
          if (zoom > 1) {
            zoom--
          }
      }
      zoomer()
    })
    addEventListener('keydown', (e) => {
      if (e.key === 'w') {
        wPressed = true
      }
      if (e.key === 'a') {
        aPressed = true
      }
      if (e.key === 's') {
        sPressed = true
      }
      if (e.key === 'd') {
        dPressed = true
      }
    })
    addEventListener('keyup', (e) => {
      if (e.key === 'w') {
        wPressed = false
        playerPixel[59].style.backgroundColor = '#520'
        playerPixel[60].style.backgroundColor = '#520'
        playerPixel[45].style.backgroundColor = '#e96'
        playerPixel[42].style.backgroundColor = '#e96'
      }
      if (e.key === 'a') {
        aPressed = false
        playerPixel[26].style.backgroundColor = '#000'
        playerPixel[29].style.backgroundColor = '#000'
        playerPixel[34].style.backgroundColor = '#e96'
        playerPixel[36].style.backgroundColor = '#000'
        playerPixel[37].style.backgroundColor = '#e96'
        playerPixel[42].style.backgroundColor = '#e96'
        playerPixel[44].style.backgroundColor = '#226'
        playerPixel[45].style.backgroundColor = '#e96'
      }
      if (e.key === 's') {
        sPressed = false
        playerPixel[59].style.backgroundColor = '#520'
        playerPixel[60].style.backgroundColor = '#520'
        playerPixel[45].style.backgroundColor = '#e96'
        playerPixel[42].style.backgroundColor = '#e96'
      }
      if (e.key === 'd') {
        dPressed = false
        playerPixel[26].style.backgroundColor = '#000'
        playerPixel[29].style.backgroundColor = '#000'
        playerPixel[34].style.backgroundColor = '#e96'
        playerPixel[35].style.backgroundColor = '#000'
        playerPixel[37].style.backgroundColor = '#e96'
        playerPixel[42].style.backgroundColor = '#e96'
        playerPixel[43].style.backgroundColor = '#226'
        playerPixel[45].style.backgroundColor = '#e96'
      }
    })
    settings.addEventListener('click', (e) => {
      fetch('/sundayFunday', {
        method: 'DELETE'
      }).then((result) => {
        location = result.url
      })
    })
  })
}

// functions
{
  function movement() {
    if (wPressed) {
      document.getElementById('world0').style.top = parseFloat(document.getElementById('world0').style.top) + zoom * .5 + 'vw'
    }
    if (aPressed) {
      document.getElementById('world0').style.left = parseFloat(document.getElementById('world0').style.left) + zoom * .5 + 'vw'
    }
    if (sPressed) {
      document.getElementById('world0').style.top = parseFloat(document.getElementById('world0').style.top) - zoom * .5 + 'vw'
    }
    if (dPressed) {
      document.getElementById('world0').style.left = parseFloat(document.getElementById('world0').style.left) - zoom * .5 + 'vw'
    }
  }
  function movementAnimation() {
  if (wPressed && !sPressed && !aPressed && !dPressed) {
    if (timer < 15) {
      playerPixel[59].style.backgroundColor = '#520'
      playerPixel[60].style.backgroundColor = 'transparent'
      playerPixel[45].style.backgroundColor = '#e96'
      playerPixel[42].style.backgroundColor = 'transparent'
    } else if (timer < 30) {
      playerPixel[59].style.backgroundColor = 'transparent'
      playerPixel[60].style.backgroundColor = '#520'
      playerPixel[45].style.backgroundColor = 'transparent'
      playerPixel[42].style.backgroundColor = '#e96'
    } else {
      timer = 0
    }
    timer++
  }
  if (sPressed && !wPressed && !aPressed && !dPressed) {
    if (timer < 15) {
      playerPixel[60].style.backgroundColor = '#520'
      playerPixel[59].style.backgroundColor = 'transparent'
      playerPixel[42].style.backgroundColor = '#e96'
      playerPixel[45].style.backgroundColor = 'transparent'
    } else if (timer < 30) {
      playerPixel[60].style.backgroundColor = 'transparent'
      playerPixel[59].style.backgroundColor = '#520'
      playerPixel[42].style.backgroundColor = 'transparent'
      playerPixel[45].style.backgroundColor = '#e96'
    } else {
      timer = 0
    }
    timer++
  }
  if (aPressed && !dPressed && !wPressed && !sPressed) {
    if (timer < 15) {
      playerPixel[26].style.backgroundColor = 'transparent'
      playerPixel[29].style.backgroundColor = 'transparent'
      playerPixel[34].style.backgroundColor = 'transparent'
      playerPixel[36].style.backgroundColor = '#e96'
      playerPixel[37].style.backgroundColor = 'transparent'
      playerPixel[42].style.backgroundColor = 'transparent'
      playerPixel[44].style.backgroundColor = '#e96'
      playerPixel[45].style.backgroundColor = 'transparent'
      playerPixel[50].style.backgroundColor = 'transparent'
      playerPixel[51].style.backgroundColor = '#226'
    } else if (timer < 30) {

    } else {
      timer = 0
    }
    timer++
  }
  if (dPressed && !aPressed && !wPressed && !sPressed) {
    if (timer < 15) {
      playerPixel[26].style.backgroundColor = 'transparent'
      playerPixel[29].style.backgroundColor = 'transparent'
      playerPixel[34].style.backgroundColor = 'transparent'
      playerPixel[35].style.backgroundColor = '#e96'
      playerPixel[37].style.backgroundColor = 'transparent'
      playerPixel[42].style.backgroundColor = 'transparent'
      playerPixel[43].style.backgroundColor = '#e96'
      playerPixel[45].style.backgroundColor = 'transparent'
      playerPixel[50].style.backgroundColor = 'transparent'
      playerPixel[51].style.backgroundColor = '#226'
    } else if (timer < 30) {

    } else {
      timer = 0
    }
    timer++
  }
  }
  function zoomer() {
    for (var i = 0; i < world.length; i++) {
      document.getElementById('world' + i).style.width = zoom * 25 + 'vw'
      document.getElementById('world' + i).style.height = zoom * 25 + 'vw'
    }
    player.style.width = zoom * 1.25 + 'vw'
    player.style.height = zoom * 1.25 + 'vw'
    lastZoom = currentZoom
    currentZoom = parseFloat(document.getElementById('world0').style.width)
    document.getElementById('world0').style.top = 50 * 0.5625 - ((50 * 0.5625 - parseFloat(document.getElementById('world0').style.top)) * currentZoom / lastZoom) + 'vw'
    document.getElementById('world0').style.left = 50 - ((50 - parseFloat(document.getElementById('world0').style.left)) * currentZoom / lastZoom) + 'vw'
  }
  function align() {
    for (var i = 1; i < world.length; i++) {
      document.getElementById('world' + i).style.top = parseFloat(document.getElementById('world0').style.top) - zoom * 25 * worldPositions[i].y + 'vw'
      document.getElementById('world' + i).style.left = parseFloat(document.getElementById('world0').style.left) + zoom * 25 * worldPositions[i].x + 'vw'
    }

    requestAnimationFrame(align)
  }
  function newWorld(x, y) {
    world.push([])
    for (var i = worldRendered; i < world.length; i++) {
      var worldi = document.createElement('div')
      worldi.classList = 'world'
      worldi.id = 'world' + i
      document.body.prepend(worldi)
      for (var j = 0; j < 400; j++) {
        world[i].push(document.createElement('div'))
        worldi.appendChild(world[i][j])
      }
    }
    worldRendered++
    worldPositions.push({x: x, y: y})
    zoomer()
  }
  function newWorldCheck() {
    playerCoordinates = {
      x: Math.floor((50 - parseFloat(document.getElementById('world0').style.left)) / zoom / 25),
      y: Math.floor((-50 * 0.5625 + parseFloat(document.getElementById('world0').style.top)) / zoom / 25) + 1
    }
    for (var x = -2; x < 3; x++) {
      for (var y = -1; y < 2; y++) {
        createWorld = true
        for (var i = 0; i < worldPositions.length; i++) {
          if (worldPositions[i].x === playerCoordinates.x + x &&
              worldPositions[i].y === playerCoordinates.y + y) {
            createWorld = false
          }
          if (worldPositions[i].x < playerCoordinates.x - 3 ||
              worldPositions[i].x > playerCoordinates.y + 3 ||
              worldPositions[i].y < playerCoordinates.y - 2 ||
              worldPositions[i].y > playerCoordinates.y + 2) {
            for (var j = 0; j < world[i].length; j++) {
              world[i][j].remove()
            }
          }
        }
        if (createWorld) {
          newWorld(playerCoordinates.x + x, playerCoordinates.y + y)
        }
      }
    }
  }
}

// function calls
{
setInterval(movement, 1000 / 60)
setInterval(movementAnimation, 1000 / 60)
setInterval(newWorldCheck, 200)
zoomer()
align()
}
