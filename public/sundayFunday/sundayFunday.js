const settings = document.getElementsByClassName('settings-borgir')[0]
const world = document.getElementsByClassName('world')[0]
const highlight = document.getElementsByClassName('highlight')[0]
const one = document.getElementById('one')
const two = document.getElementById('two')
const three = document.getElementById('three')
const cursorPosition = {x: 1, y: 1}
const keysPressed = {}
let tileHighlighted = 0, scrollSpeed = 1, yOffset = 0, xOffset = 0

fetch('/sundayFunday/api').then((result) => {
  return result.json()
}).then((json) => {
  addEventListener('keydown', (e) => {
    keysPressed[e.key] = true
  })
  addEventListener('keyup', (e) => {
    delete keysPressed[e.key]
  })
  addEventListener('mousemove', (e) => {
    cursorPosition.x = (e.clientX) / 19.2
    cursorPosition.y = (e.clientY) / 19.2
  })

  setInterval(movement, 5)
  setInterval(
    () => {
      fetch('/sundayFunday', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          x: 0,
          y: 0,
          zoom: 1
        })
      })
    }, 500
  )
})
settings.addEventListener('click', () => {
  fetch('/sundayFunday', {
    method: 'DELETE'
  }).then((result) => {
    location = result.url
  })
})
for (let i = 0; i < 2500; i++) {
  let div = document.createElement('div')
  world.prepend(div)
}

function movement() {
  if (parseInt(world.style.top) > -(1996 - window.innerHeight) && keysPressed['s']){
    world.style.top = parseInt(world.style.top) - 5 * scrollSpeed + 'px'
  } else if (keysPressed['s']) {
    if (parseInt(world.style.top) > -(1997 - window.innerHeight)) {
      world.style.top = parseInt(world.style.top) - 4 * scrollSpeed + 'px'
      yOffset = 4
    } else if (parseInt(world.style.top) > -(1998 - window.innerHeight)) {
      world.style.top = parseInt(world.style.top) - 3 * scrollSpeed + 'px'
      yOffset = 3
    } else if (parseInt(world.style.top) > -(1999 - window.innerHeight)) {
      world.style.top = parseInt(world.style.top) - 2 * scrollSpeed + 'px'
      yOffset = 2
    } else if (parseInt(world.style.top) > -(2000 - window.innerHeight)) {
      world.style.top = parseInt(world.style.top) - 1 * scrollSpeed + 'px'
      yOffset = 1
    }
  }
  if (parseInt(world.style.top) < 0 && keysPressed['w']){
    if (yOffset === 0) {
      world.style.top = parseInt(world.style.top) + 5 * scrollSpeed + 'px'
    } else if (yOffset === 1) {
      world.style.top = parseInt(world.style.top) + 1 * scrollSpeed + 'px'
    } else if (yOffset === 2) {
      world.style.top = parseInt(world.style.top) + 2 * scrollSpeed + 'px'
    } else if (yOffset === 3) {
      world.style.top = parseInt(world.style.top) + 3 * scrollSpeed + 'px'
    } else if (yOffset === 4) {
      world.style.top = parseInt(world.style.top) + 4 * scrollSpeed + 'px'
    }
    yOffset = 0
  }
  if (parseInt(world.style.left) > -(1996 - window.innerWidth) && keysPressed['d']){
    world.style.left = parseInt(world.style.left) - 5 * scrollSpeed + 'px'
  } else if (keysPressed['d']) {
    if (parseInt(world.style.left) > -(1997 - window.innerWidth)) {
      world.style.left = parseInt(world.style.left) - 4 * scrollSpeed + 'px'
      xOffset = 4
    } else if (parseInt(world.style.left) > -(1998 - window.innerWidth)) {
      world.style.left = parseInt(world.style.left) - 3 * scrollSpeed + 'px'
      xOffset = 3
    } else if (parseInt(world.style.left) > -(1999 - window.innerWidth)) {
      world.style.left = parseInt(world.style.left) - 2 * scrollSpeed + 'px'
      xOffset = 2
    } else if (parseInt(world.style.left) > -(2000 - window.innerWidth)) {
      world.style.left = parseInt(world.style.left) - 1 * scrollSpeed + 'px'
      xOffset = 1
    }
  }
  if (parseInt(world.style.left) < 0 && keysPressed['a']){
    if (xOffset === 0) {
      world.style.left = parseInt(world.style.left) + 5 * scrollSpeed + 'px'
    } else if (xOffset === 1) {
      world.style.left = parseInt(world.style.left) + 1 * scrollSpeed + 'px'
    } else if (xOffset === 2) {
      world.style.left = parseInt(world.style.left) + 2 * scrollSpeed + 'px'
    } else if (xOffset === 3) {
      world.style.left = parseInt(world.style.left) + 3 * scrollSpeed + 'px'
    } else if (xOffset === 4) {
      world.style.left = parseInt(world.style.left) + 4 * scrollSpeed + 'px'
    }
    xOffset = 0
  }
}
(function resizeControl() {
  if (parseInt(world.style.top) < -(2000 - window.innerHeight)) {
    world.style.top = -(2000 - window.innerHeight) + 'px'
  }
  if (parseInt(world.style.left) < -(2000 - window.innerWidth)) {
    world.style.left = -(2000 - window.innerWidth) + 'px'
  }
  if (parseInt(world.style.left) / 5 != parseInt(parseInt(world.style.left) / 5)) {
    xOffset = parseInt((parseInt(world.style.left) / 5).toString().slice(-1)) / 2
  }
  if (parseInt(world.style.top) / 5 != parseInt(parseInt(world.style.top) / 5)) {
    yOffset = parseInt((parseInt(world.style.top) / 5).toString().slice(-1)) / 2
  }

  requestAnimationFrame(resizeControl)
}) ()
function selector() {
  highlight.style.top = world.style.top
  highlight.style.left = world.style.left

  requestAnimationFrame(selector)
} selector()

world.children[49].style.backgroundColor = '#202126'
world.children[2450].style.backgroundColor = '#202126'
world.children[2499].style.backgroundColor = '#202126'
