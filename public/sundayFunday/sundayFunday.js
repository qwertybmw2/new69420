const settings = document.getElementsByClassName('settings-borgir')[0]
const uiOne = document.getElementsByClassName('ui-one')[0]
const buildingMenu = document.getElementsByClassName('building-menu')[0]
const selector = document.getElementsByClassName('selector')[0]
const world = document.getElementsByClassName('world')[0]
const highlightGrid = document.getElementsByClassName('highlight-grid')[0]
const highlight = document.getElementsByClassName('highlight')[0]
const arrowFullLeft = document.getElementsByClassName('arrow-full-left')[0]
const arrowLeft = document.getElementsByClassName('arrow-left')[0]
const arrowRight = document.getElementsByClassName('arrow-right')[0]
const arrowFullRight = document.getElementsByClassName('arrow-full-right')[0]
const selectorInput = document.getElementById('selector-input')
const tileHighlighted = {}
const keysPressed = {}
let scrollSpeed = 1, yOffset = 0, xOffset = 0, highlighting = false, buildingsUnlocked = {}, buildingMenuPage = 1, buildingMenuTab = 'first'

fetch('/sundayFunday/api').then((result) => {
  return result.json()
}).then((json) => {
  addEventListener('keydown', (e) => {
    keysPressed[e.key] = true
    if (e.key === 'b') {
      if (highlighting || highlighting === 'almost not') {
        hideBuildingMenu()
      } else if (!highlighting || highlighting === 'almost') {
        showBuildingMenu()
      }
    }
    if (e.key === 'Enter' && document.activeElement === selectorInput) {
      if (selectorInput.value > 0 && selectorInput.value <= buildingsUnlocked[buildingMenuTab]) {
        buildingMenuPage = selectorInput.value
        selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
        selectorInput.blur()
      } else {
        selectorInput.blur()
      }
    }
  })
  addEventListener('keyup', (e) => {
    delete keysPressed[e.key]
  })
  addEventListener('mouseover', (e) => {
    tileHighlighted.x = Math.round((parseInt(e.target.id) / 50 - Math.floor(parseInt(e.target.id) / 50)) * 50 + 1)
    tileHighlighted.y = Math.floor(parseInt(e.target.id) / 50) + 1
  })
  addEventListener('click', (e) => {
    mousedown = true
    switch (e.target.className) {
      case 'tab-one':
        buildingMenuTab = 'first'
        buildingMenuPage = 1
        selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
        break
      case 'tab-two':
        buildingMenuTab = 'second'
        buildingMenuPage = 1
        selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
        break
      case 'tab-three':
        buildingMenuTab = 'third'
        buildingMenuPage = 1
        selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
        break
      case 'tab-four':
        buildingMenuTab = 'fourth'
        buildingMenuPage = 1
        selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
        break
      case 'tab-five':
        buildingMenuTab = 'fifth'
        buildingMenuPage = 1
        selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
        break
      case 'tab-six':
        buildingMenuTab = 'sixth'
        buildingMenuPage = 1
        selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
        break
      case 'tab-seven':
        buildingMenuTab = 'seventh'
        buildingMenuPage = 1
        selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
        break
      case 'tab-eight':
        buildingMenuTab = 'eighth'
        buildingMenuPage = 1
        selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
        break
    }
  })
  addEventListener('mouseup', () => {
    mousedown = false
    switch (document.activeElement) {
      case arrowFullLeft:
        arrowFullLeft.blur()
        break;
      case arrowLeft:
        arrowLeft.blur()
        break;
      case arrowRight:
        arrowRight.blur()
        break;
      case arrowFullRight:
        arrowFullRight.blur()
        break;
    }
  })
  uiOne.children[0].addEventListener('mousedown', () => {
    if (highlighting) {
      highlighting = 'almost not'
    }
    if (!highlighting) {
      highlighting = 'almost'
    }
  })
  uiOne.children[0].addEventListener('mouseup', () => {
    if (highlighting == 'almost') {
      showBuildingMenu()
    }
    if (highlighting == 'almost not') {
      hideBuildingMenu()
    }
    uiOne.children[0].blur()
  })
  uiOne.children[0].addEventListener('mouseleave', () => {
    if (highlighting == 'almost') {
      highlighting = false
    }
    if (highlighting == 'almost not') {
      highlighting = true
    }
    uiOne.children[0].blur()
  })
  selectorInput.addEventListener('focus', () => {
    selectorInput.value = ''
  })
  selectorInput.addEventListener('focusout', () => {
    selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
  })
  arrowFullLeft.addEventListener('mouseleave', () => {
    arrowFullLeft.blur()
  })
  arrowLeft.addEventListener('mouseleave', () => {
    arrowLeft.blur()
  })
  arrowRight.addEventListener('mouseleave', () => {
    arrowRight.blur()
  })
  arrowFullRight.addEventListener('mouseleave', () => {
    arrowFullRight.blur()
  })
  arrowFullLeft.addEventListener('click', () => {
    buildingMenuPage = 1
    selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
  })
  arrowLeft.addEventListener('click', () => {
    if (buildingMenuPage > 1) {
      buildingMenuPage--
    }
    selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
  })
  arrowRight.addEventListener('click', () => {
    if (buildingMenuPage < buildingsUnlocked[buildingMenuTab]) {
      buildingMenuPage++
    }
    selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
  })
  arrowFullRight.addEventListener('click', () => {
    buildingMenuPage = buildingsUnlocked[buildingMenuTab]
    selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
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
  buildingsUnlocked = json.buildingsUnlocked
  selectorInput.value = buildingMenuPage + '/' + buildingsUnlocked[buildingMenuTab]
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
  div.id = i
  world.appendChild(div)
}

(function resizeControl() {
  if (parseInt(world.style.top) < -(3000 - window.innerHeight)) {
    world.style.top = -(3000 - window.innerHeight) + 'px'
    highlightGrid.style.top = -(3000 - window.innerHeight) + 'px'
  }
  if (parseInt(world.style.left) < -(3000 - window.innerWidth)) {
    world.style.left = -(3000 - window.innerWidth) + 'px'
    highlightGrid.style.left = -(3000 - window.innerWidth) + 'px'
  }
  if (parseInt(world.style.left) / 5 != parseInt(parseInt(world.style.left) / 5)) {
    xOffset = parseInt((parseInt(world.style.left) / 5).toString().slice(-1)) / 2
  }
  if (parseInt(world.style.top) / 5 != parseInt(parseInt(world.style.top) / 5)) {
    yOffset = parseInt((parseInt(world.style.top) / 5).toString().slice(-1)) / 2
  }

  requestAnimationFrame(resizeControl)
}) ()
function movement() {
  if (parseInt(world.style.top) > -(2996 - window.innerHeight) && keysPressed['s']){
    world.style.top = parseInt(world.style.top) - 5 * scrollSpeed + 'px'
    highlightGrid.style.top = parseInt(highlightGrid.style.top) - 5 * scrollSpeed + 'px'
  } else if (keysPressed['s']) {
    if (parseInt(world.style.top) > -(2997 - window.innerHeight)) {
      world.style.top = parseInt(world.style.top) - 4 * scrollSpeed + 'px'
      highlightGrid.style.top = parseInt(highlightGrid.style.top) - 4 * scrollSpeed + 'px'
    } else if (parseInt(world.style.top) > -(2998 - window.innerHeight)) {
      world.style.top = parseInt(world.style.top) - 3 * scrollSpeed + 'px'
      highlightGrid.style.top = parseInt(highlightGrid.style.top) - 3 * scrollSpeed + 'px'
    } else if (parseInt(world.style.top) > -(2999 - window.innerHeight)) {
      world.style.top = parseInt(world.style.top) - 2 * scrollSpeed + 'px'
      highlightGrid.style.top = parseInt(highlightGrid.style.top) - 2 * scrollSpeed + 'px'
    } else if (parseInt(world.style.top) > -(3000 - window.innerHeight)) {
      world.style.top = parseInt(world.style.top) - 1 * scrollSpeed + 'px'
      highlightGrid.style.top = parseInt(highlightGrid.style.top) - 1 * scrollSpeed + 'px'
    }
  }
  if (parseInt(world.style.top) < 1000 && keysPressed['w']){
    if (yOffset === 0) {
      world.style.top = parseInt(world.style.top) + 5 * scrollSpeed + 'px'
      highlightGrid.style.top = parseInt(highlightGrid.style.top) + 5 * scrollSpeed + 'px'
    } else if (yOffset === 1) {
      world.style.top = parseInt(world.style.top) + 1 * scrollSpeed + 'px'
      highlightGrid.style.top = parseInt(highlightGrid.style.top) + 1 * scrollSpeed + 'px'
    } else if (yOffset === 2) {
      world.style.top = parseInt(world.style.top) + 2 * scrollSpeed + 'px'
      highlightGrid.style.top = parseInt(highlightGrid.style.top) + 2 * scrollSpeed + 'px'
    } else if (yOffset === 3) {
      world.style.top = parseInt(world.style.top) + 3 * scrollSpeed + 'px'
      highlightGrid.style.top = parseInt(highlightGrid.style.top) + 3 * scrollSpeed + 'px'
    } else if (yOffset === 4) {
      world.style.top = parseInt(world.style.top) + 4 * scrollSpeed + 'px'
      highlightGrid.style.top = parseInt(highlightGrid.style.top) + 4 * scrollSpeed + 'px'
    }
    yOffset = 0
  }
  if (parseInt(world.style.left) > -(2996 - window.innerWidth) && keysPressed['d']){
    world.style.left = parseInt(world.style.left) - 5 * scrollSpeed + 'px'
    highlightGrid.style.left = parseInt(highlightGrid.style.left) - 5 * scrollSpeed + 'px'
  } else if (keysPressed['d']) {
    if (parseInt(world.style.left) > -(2997 - window.innerWidth)) {
      world.style.left = parseInt(world.style.left) - 4 * scrollSpeed + 'px'
      highlightGrid.style.left = parseInt(highlightGrid.style.left) - 4 * scrollSpeed + 'px'
    } else if (parseInt(world.style.left) > -(2998 - window.innerWidth)) {
      world.style.left = parseInt(world.style.left) - 3 * scrollSpeed + 'px'
      highlightGrid.style.left = parseInt(highlightGrid.style.left) - 3 * scrollSpeed + 'px'
    } else if (parseInt(world.style.left) > -(2999 - window.innerWidth)) {
      world.style.left = parseInt(world.style.left) - 2 * scrollSpeed + 'px'
      highlightGrid.style.left = parseInt(highlightGrid.style.left) - 2 * scrollSpeed + 'px'
    } else if (parseInt(world.style.left) > -(3000 - window.innerWidth)) {
      world.style.left = parseInt(world.style.left) - 1 * scrollSpeed + 'px'
      highlightGrid.style.left = parseInt(highlightGrid.style.left) - 1 * scrollSpeed + 'px'
    }
  }
  if (parseInt(world.style.left) < 1000 && keysPressed['a']){
    if (xOffset === 0) {
      world.style.left = parseInt(world.style.left) + 5 * scrollSpeed + 'px'
      highlightGrid.style.left = parseInt(highlightGrid.style.left) + 5 * scrollSpeed + 'px'
    } else if (xOffset === 1) {
      world.style.left = parseInt(world.style.left) + 1 * scrollSpeed + 'px'
      highlightGrid.style.left = parseInt(highlightGrid.style.left) + 1 * scrollSpeed + 'px'
    } else if (xOffset === 2) {
      world.style.left = parseInt(world.style.left) + 2 * scrollSpeed + 'px'
      highlightGrid.style.left = parseInt(highlightGrid.style.left) + 2 * scrollSpeed + 'px'
    } else if (xOffset === 3) {
      world.style.left = parseInt(world.style.left) + 3 * scrollSpeed + 'px'
      highlightGrid.style.left = parseInt(highlightGrid.style.left) + 3 * scrollSpeed + 'px'
    } else if (xOffset === 4) {
      world.style.left = parseInt(world.style.left) + 4 * scrollSpeed + 'px'
      highlightGrid.style.left = parseInt(highlightGrid.style.left) + 4 * scrollSpeed + 'px'
    }
    xOffset = 0
  }
}
(function selector() {
  highlight.style.gridRowStart = tileHighlighted.y
  highlight.style.gridColumnStart = tileHighlighted.x

  if (highlighting && tileHighlighted.x == parseInt(tileHighlighted.x)) {
    highlight.style.display = 'block'
    document.body.style.cursor = 'none'
  } else {
    highlight.style.display = 'none'
    document.body.style.cursor = 'default'
  }

  requestAnimationFrame(selector)
}) ()
function hideBuildingMenu() {
  highlighting = false
  buildingMenu.style.transition = 'bottom .8s'
  buildingMenu.style.bottom = '-400px'
  buildingMenu.children[0].style.transition = 'bottom .8s'
  buildingMenu.children[0].style.bottom = '-45px'
  buildingMenu.children[1].style.transition = 'bottom .8s'
  buildingMenu.children[1].style.bottom = '-85px'
  buildingMenu.children[2].style.transition = 'bottom .8s'
  buildingMenu.children[2].style.bottom = '-125px'
  buildingMenu.children[3].style.transition = 'bottom .8s'
  buildingMenu.children[3].style.bottom = '-165px'
  buildingMenu.children[4].style.transition = 'bottom .8s'
  buildingMenu.children[4].style.bottom = '-205px'
  buildingMenu.children[5].style.transition = 'bottom .8s'
  buildingMenu.children[5].style.bottom = '-245px'
  buildingMenu.children[6].style.transition = 'bottom .8s'
  buildingMenu.children[6].style.bottom = '-285px'
  buildingMenu.children[7].style.transition = 'bottom .8s'
  buildingMenu.children[7].style.bottom = '-325px'
}
function showBuildingMenu() {
  highlighting = true
  buildingMenu.style.transition = 'bottom .8s'
  buildingMenu.style.bottom = '175px'
  buildingMenu.children[0].style.transition = 'bottom .8s'
  buildingMenu.children[0].style.bottom = '535px'
  buildingMenu.children[1].style.transition = 'bottom .8s'
  buildingMenu.children[1].style.bottom = '495px'
  buildingMenu.children[2].style.transition = 'bottom .8s'
  buildingMenu.children[2].style.bottom = '455px'
  buildingMenu.children[3].style.transition = 'bottom .8s'
  buildingMenu.children[3].style.bottom = '415px'
  buildingMenu.children[4].style.transition = 'bottom .8s'
  buildingMenu.children[4].style.bottom = '375px'
  buildingMenu.children[5].style.transition = 'bottom .8s'
  buildingMenu.children[5].style.bottom = '335px'
  buildingMenu.children[6].style.transition = 'bottom .8s'
  buildingMenu.children[6].style.bottom = '295px'
  buildingMenu.children[7].style.transition = 'bottom .8s'
  buildingMenu.children[7].style.bottom = '255px'
}