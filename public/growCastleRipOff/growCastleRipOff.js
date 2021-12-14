var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
var renderer = new THREE.WebGLRenderer({antialias: false})
var light = new THREE.PointLight(0xffffff,1,2000,2)

var platformGeometry = new THREE.BoxGeometry(100,.01,100)
var platformMaterial = new THREE.MeshBasicMaterial({color: 0xedf0f1})
var cubeGeometry = new THREE.BoxGeometry(5,5,5)
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0x0088a9,vertexColors: THREE.FaceColors})
var platform = new THREE.Mesh(platformGeometry,platformMaterial)
var cube = new THREE.Mesh(cubeGeometry,cubeMaterial)

var wPressed, aPressed, sPressed, dPressed, spacePressed, jumping, falling
var spaceUp = true
var cubeSpeed = .5
var jumpCounter = 0
var cameraLookAt = new THREE.Vector3(0,0,0)

document.body.appendChild(renderer.domElement)

renderer.setClearColor('#24252a')
renderer.setSize(window.innerWidth,window.innerHeight)

cube.geometry.faces[8].color = new THREE.Color(0x000000)
cube.geometry.faces[9].color = new THREE.Color(0x000000)

camera.position.set(0,75,0)
light.position.set(0,1000,0)
cube.position.set(0,2.505,0)

scene.add(light,platform,cube)

addEventListener('resize', () => {
  renderer.setSize(window.innerWidth,window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight

  camera.updateProjectionMatrix()
})
addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      wPressed = true
      break
    case 'a':
      aPressed = true
      break
    case 's':
      sPressed = true
      break
    case 'd':
      dPressed = true
      break
    case ' ':
      spacePressed = true
  }
})
addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      wPressed = false
      break
    case 'a':
      aPressed = false
      break
    case 's':
      sPressed = false
      break
    case 'd':
      dPressed = false
      break
    case ' ':
      spacePressed = false
      spaceUp = true
  }
})

function render() {
  cubeMovement()
  cubeJump()
  cubeFall()
  cameraMovement()
  cords()

  renderer.render(scene,camera)

  requestAnimationFrame(render)
}
function cubeMovement() {
  if (wPressed) {
    cube.position.z -= cubeSpeed * Math.cos(cube.rotation.y)
    cube.position.x -= cubeSpeed * Math.sin(cube.rotation.y)
  }
  if (aPressed) {
    if (cube.rotation.y > Math.PI * 2) {
      cube.rotation.y = 0
    } else {
      cube.rotation.y += Math.PI * 2 / 360
    }
  }
  if (sPressed) {
    cube.position.z += cubeSpeed * Math.cos(cube.rotation.y)
    cube.position.x += cubeSpeed * Math.sin(cube.rotation.y)
  }
  if (dPressed) {
    if (cube.rotation.y < -Math.PI * 2) {
      cube.rotation.y = 0
    } else {
      cube.rotation.y += -Math.PI * 2 / 360
    }
  }
}
function cubeJump() {
  if (spacePressed && jumpCounter < 20 && !falling && spaceUp) {
    jumping = true
    spaceUp = false
    }
  if (jumpCounter === 20) {
    jumpCounter = 0
    jumping = false
  }
  if (jumping) {
    cube.position.y += .5
    jumpCounter++
  }
}
function cubeFall() {
  if (!jumping && cube.position.y - cube.geometry.parameters.height / 2 >= platform.geometry.parameters.height + platform.position.y) {
    cube.position.y -= .5
    falling = true
  } else {
    falling = false
  }
}
function cameraMovement() {
  camera.position.x = cube.position.x + 13 * Math.sin(cube.rotation.y + .35)
  camera.position.y = cube.position.y + 5
  camera.position.z = cube.position.z + 13 * Math.cos(cube.rotation.y + .35)
  cameraLookAt.x = camera.position.x - 20 * Math.sin(cube.rotation.y - .1)
  cameraLookAt.y = camera.position.y
  cameraLookAt.z = camera.position.z - 20 * Math.cos(cube.rotation.y - .1)
  camera.lookAt(cameraLookAt)
}
function cords() {
  document.getElementsByClassName('cords')[0].innerText = Number((cube.rotation.y).toFixed(2))
}

render()
