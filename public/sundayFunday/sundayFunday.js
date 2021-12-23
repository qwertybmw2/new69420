// variables
{
var player = document.getElementsByClassName('player')[0]
var playerPixel = document.getElementsByClassName('player-pixel')
var wPressed, aPressed, sPressed, dPressed, lastZoom
var world = [document.createElement('div')]
var world0 = []
var currentZoom = 100
var zoom = 4
var timer = 0
}

// setters
{
world[0].style.top = 0
world[0].style.left = 0

for (var i = 0; i < world.length; i++) {
  world[i].classList = 'world'
  world[i].id = 'world0'
  document.body.prepend(world[i])
  for (var j = 0; j < 2500; j++) {
    eval('world' + i).push(document.createElement('div'))
    world[0].appendChild(world0[j])
  }
}
for (var i = 0; i < world0.length; i++) {
  world0[i].classList = 'world-chunk'
}
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
          x: parseFloat(world[0].style.left) + zoom * .125,
          y: parseFloat(world[0].style.top) + zoom * .125
        })
      })
    }, 10000
  )
  fetch('/sundayFunday/coordinates').then((result) => {
    return result.json()
  }).then((json) => {
    for (var i = 0; i < world.length; i++) {
      world[i].style.top = json.y + 'vw'
    }
    for (var i = 0; i < world.length; i++) {
      world[i].style.left = json.x + zoom * .125 + 'vw'
    }
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
      zoomControl()
    })
  })
}

// event listeners
{
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
}

// functions
{
function movement() {
  if (wPressed) {
    for (var i = 0; i < world.length; i++) {
      world[i].style.top = parseFloat(world[i].style.top) + zoom * .125 + 'vw'
    }
  }
  if (aPressed) {
    for (var i = 0; i < world.length; i++) {
      world[i].style.left = parseFloat(world[i].style.left) + zoom * .125 + 'vw'
    }
  }
  if (sPressed) {
    for (var i = 0; i < world.length; i++) {
      world[i].style.top = parseFloat(world[i].style.top) - zoom * .125 + 'vw'
    }
  }
  if (dPressed) {
    for (var i = 0; i < world.length; i++) {
      world[i].style.left = parseFloat(world[i].style.left) - zoom * .125 + 'vw'
    }
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
    world[i].style.width = zoom * 25 + 'vw'
    world[i].style.height = zoom * 25 + 'vw'
  }
  player.style.width = zoom * 1.25 + 'vw'
  player.style.height = zoom * 1.25 + 'vw'
}
function zoomControl() {
  lastZoom = currentZoom
  currentZoom = parseFloat(world[0].style.width)
  world[0].style.top = 50 * 0.5625 - ((50 * 0.5625 - parseFloat(world[0].style.top)) * currentZoom / lastZoom) + 'vw'
  world[0].style.left = 50 - ((50 - parseFloat(world[0].style.left)) * currentZoom / lastZoom) + 'vw'
}
}

// function calls
{
setInterval(movement, 1000 / 60)
setInterval(movementAnimation, 1000 / 60)
zoomer()
}
