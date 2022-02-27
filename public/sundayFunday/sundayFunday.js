const player = document.getElementsByClassName('player')[0]
const playerPixel = document.getElementsByClassName('player-pixel')
const settings = document.getElementsByClassName('settings-circle')[0]
const worldPositions = [{x: 0, y: 0}]
const worldsShown = [0]
let wPressed, aPressed, sPressed, dPressed, lastZoom, playerCoordinates, createWorld, cursorPosition, zoom, currentZoom
let timer = 0
let tileWidth = 4

fetch('/sundayFunday/json').then((result) => {
  return result.json()
}).then((json) => {
  document.getElementById('world0').style.top = json.y + 'vw' 
  document.getElementById('world0').style.left = json.x + 'vw'
  zoom = json.zoom
  
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
    if (e.key === 'Enter' && document.fullscreenElement != document.body) {
      document.body.requestFullscreen()
      document.getElementsByClassName('loading-screen')[0].remove()
    }
  })
  addEventListener('keyup', (e) => {
    if (e.key === 'w') {
      wPressed = false
      playerPixel[59].style.backgroundColor = '#520'
      playerPixel[60].style.backgroundColor = '#520'
      playerPixel[45].style.backgroundColor = '#e96'
      playerPixel[42].style.backgroundColor = '#e96'
      timer = 0
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
      timer = 0
    }
    if (e.key === 's') {
      sPressed = false
      playerPixel[59].style.backgroundColor = '#520'
      playerPixel[60].style.backgroundColor = '#520'
      playerPixel[45].style.backgroundColor = '#e96'
      playerPixel[42].style.backgroundColor = '#e96'
      timer = 0
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
      timer = 0
    }
  })
  addEventListener('mousemove', (e) => {
    cursorPosition = {x: (e.clientX + 1) / 19.2, y: (e.clientY + 1) / 19.2}
  })
  addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      let div = document.createElement('div')
      div.classList = 'loading-screen'
      document.body.prepend(div)
    }
  })
  setInterval(newWorldCheck, 200)
  setInterval(movement, 10)
  setInterval(movementAnimation, 1000 / 60)
  setInterval(
    () => {
      fetch('/sundayFunday', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          x: 50 - ((50 - parseFloat(document.getElementById('world0').style.left)) * (4 / zoom)),
          y: 50 * 0.5625 - ((50 * 0.5625 - parseFloat(document.getElementById('world0').style.top)) * (4 / zoom)),
          zoom: zoom
        })
      })
    }, 500
  )
  zoomer()
})
settings.addEventListener('click', () => {
  fetch('/sundayFunday', {
    method: 'DELETE'
  }).then((result) => {
    location = result.url
  })
})
addEventListener('mousedown', (e) => {
  e.target.style.backgroundColor = 'edf0f1'
})

function movement() {
  if (wPressed) {
    document.getElementById('world0').style.top = parseFloat(document.getElementById('world0').style.top) + zoom * .3 + 'vw'
  }
  if (aPressed) {
    document.getElementById('world0').style.left = parseFloat(document.getElementById('world0').style.left) + zoom * .3 + 'vw'
  }
  if (sPressed) {
    document.getElementById('world0').style.top = parseFloat(document.getElementById('world0').style.top) - zoom * .3 + 'vw'
  }
  if (dPressed) {
    document.getElementById('world0').style.left = parseFloat(document.getElementById('world0').style.left) - zoom * .3 + 'vw'
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
(function align() {
  for (let i = 1; i < worldsShown.length; i++) {
    document.getElementById('world' + worldsShown[i]).style.top = parseFloat(document.getElementById('world0').style.top) - zoom * tileWidth * worldPositions[worldsShown[i]].y + 'vw'
    document.getElementById('world' + worldsShown[i]).style.left = parseFloat(document.getElementById('world0').style.left) + zoom * tileWidth * worldPositions[worldsShown[i]].x + 'vw'
  }

  requestAnimationFrame(align)
}) ()
function zoomer() {
  for (let i = 0; i < worldsShown.length; i++) {
    document.getElementById('world' + worldsShown[i]).style.width = zoom * tileWidth + 'vw'
    document.getElementById('world' + worldsShown[i]).style.height = zoom * tileWidth + 'vw'
  }
  player.style.width = zoom * 1.25 + 'vw'
  player.style.height = zoom * 1.25 + 'vw'
  lastZoom = currentZoom
  currentZoom = parseFloat(document.getElementById('world0').style.width)
  document.getElementById('world0').style.top = 50 * 0.5625 - ((50 * 0.5625 - parseFloat(document.getElementById('world0').style.top)) * currentZoom / lastZoom) + 'vw'
  document.getElementById('world0').style.left = 50 - ((50 - parseFloat(document.getElementById('world0').style.left)) * currentZoom / lastZoom) + 'vw'
}
function newWorld(x, y) {
  let i = worldPositions.findIndex(item => item.x == x && item.y == y)

  if (i != -1) {
    let worldi = document.createElement('div')
    worldi.classList = 'world'
    worldi.id = 'world' + i
    document.body.prepend(worldi)
    worldsShown.push(i)
  } else {
    let worldi = document.createElement('div')
    worldi.classList = 'world'
    worldi.id = 'world' + worldPositions.length
    document.body.prepend(worldi)
    worldsShown.push(worldPositions.length)
    worldPositions.push({x: x, y: y})
  }
  zoomer()
}
function newWorldCheck() {
  playerCoordinates = {
    x: Math.floor((50 - parseFloat(document.getElementById('world0').style.left)) / zoom / tileWidth),
    y: Math.floor((-50 * 0.5625 + parseFloat(document.getElementById('world0').style.top)) / zoom / tileWidth) + 1
  }
  for (let x = -15; x <= 15; x++) {
    for (let y = -9; y <= 9; y++) {
      createWorld = true
      for (let i = 0; i < worldsShown.length; i++) {
        if (worldPositions[worldsShown[i]].x == x + playerCoordinates.x &&
        worldPositions[worldsShown[i]].y == y + playerCoordinates.y) {
          createWorld = false
        }
      }
      for (let i = 1; i < worldsShown.length; i++) {
        if (worldPositions[worldsShown[i]].x < playerCoordinates.x - 15 ||
        worldPositions[worldsShown[i]].x > playerCoordinates.x + 15 ||
        worldPositions[worldsShown[i]].y < playerCoordinates.y - 9 ||
        worldPositions[worldsShown[i]].y > playerCoordinates.y + 9 &&
        document.getElementById('world' + worldsShown[i])) {
          document.getElementById('world' + worldsShown[i]).remove()
          worldsShown.splice(i, 1)
        }
      }
      if (createWorld) {
        newWorld(playerCoordinates.x + x, playerCoordinates.y + y)
      }
    }
  }
}
