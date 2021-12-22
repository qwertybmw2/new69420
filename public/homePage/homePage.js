/*
  =========
  variables
  =========
*/
{
var grid = document.getElementsByClassName('grid')[0]
var twitch = document.getElementsByClassName('twitch')[0]
var youtube = document.getElementsByClassName('youtube')[0]
var searchBox = document.getElementsByClassName('search-box')[0]
var button = document.getElementsByClassName('button')[0]
var bait = document.getElementsByClassName('bait')
var logging = true
}

{
searchBox.value = ''
for (var i = 0; i < bait.length; i++) {
  bait[i].innerText = 'a'
}
}

/*
  =========
  functions
  =========
*/
{
addEventListener('keydown', (e) => {
  var searchString = e.target.value

  if (document.activeElement.className != 'search-box') {
    switch (e.key) {
      case 't':
        location = 'https://www.twitch.tv'
        break
      case 'y':
        location = 'https://www.youtube.com'
        break
      case 'p':
        location = 'http://localhost:2137/sundayFunday'
    }
  } else if (e.key === 'Enter') {
    button.click()
    location = 'https://twitch.tv/' + searchString
  }
})
addEventListener('click', (e) => {
  switch (e.target.className) {
    case 'bait bait0':
      location = 'https://www.twitch.tv/' + 'northernlion'
      break
    case 'bait bait1':
      location = 'https://www.twitch.tv/' + 'hasanabi'
      break
    case 'bait bait2':
      location = 'https://www.twitch.tv/' + ''
      break
    case 'bait bait3':
      location = 'https://www.twitch.tv/' + ''
      break
    case 'bait bait4':
      location = 'https://www.twitch.tv/' + ''
      break
    case 'bait bait5':
      location = 'https://www.twitch.tv/' + ''
      break
    case 'bait bait6':
      location = 'https://www.twitch.tv/' + ''
      break
    case 'bait bait7':
      location = 'https://www.twitch.tv/' + ''
      break
    case 'bait bait8':
      location = 'https://www.twitch.tv/' + ''
      break
    case 'bait bait9':
      location = 'https://www.twitch.tv/' + ''
      break
    case 'twitch':
      location = 'https://www.twitch.tv'
      break
    case 'twitch-png1':
      location = 'https://www.twitch.tv'
      break
    case 'twitch-png2':
      location = 'https://www.twitch.tv'
      break
    case 'youtube':
      location = 'https://www.youtube.com'
      break
    case 'youtube-png':
      location = 'https://www.youtube.com'
      break
      case 'solidGame':
      location = '/solidGame'
      break
    case 'newest-project':
      location = 'http://localhost:2137/sundayFunday'
  }
})
addEventListener('mouseover', (e) => {
  if (e.target.className === 'twitch' ||
  e.target.className === 'twitch-png1'||
  e.target.className === 'twitch-png2'||
  e.target.className === 'search-box' ||
  e.target.className === 'bait') {
    for (var i = 0; i < 10; i++) {
      bait[i].style.transition = 'height .4s linear, bottom .4s linear'
      bait[i].style.height = '2.915vh'
      bait[i].style.bottom = '81.65vh'
    }
    setTimeout(function () {for (var i = 0; i < 10; i++) {bait[i].style.transition = 'all 0s'}}, 1)
    searchBox.focus()
    searchBox.style.transition = 'all .4s linear'
    searchBox.style.backgroundColor = '#444'
    searchBox.style.marginTop = '-8.88vh'
    searchBox.style.marginLeft = '0'
    searchBox.style.width = '20vw'
    setTimeout(function () {searchBox.style.transition = 'all 0s'}, 1)
    twitch.children[0].style.transition = 'all .4s linear'
    twitch.children[0].style.marginTop = '-17.77vh'
    twitch.children[0].style.marginLeft = '-20vw'
    twitch.children[0].style.width = '0vw'
    twitch.children[1].style.transition = 'all .4s linear'
    twitch.children[1].style.marginTop = '-17.77vh'
    twitch.children[1].style.marginLeft = '0vw'
    twitch.children[1].style.width = '0vw'
    setTimeout(function () {twitch.children[0].style.transition = 'all 0s'}, 1)
    setTimeout(function () {twitch.children[1].style.transition = 'all 0s'}, 1)
  }
})
addEventListener('mouseout', (e) => {
  if (e.target.className === 'twitch' ||
  e.target.className === 'bait') {
    for (var i = 0; i < 10; i++) {
      bait[i].style.transition = 'height .4s linear, bottom .4s cubic-bezier(0,0,1,.9)'
      bait[i].style.height = '0'
      bait[i].style.bottom = '71.65vh'
    }
    setTimeout(function () {for (var i = 0; i < 10; i++) {bait[i].style.transition = 'all 0s'}}, 1)
    searchBox.blur()
    searchBox.style.transition = 'all .4s linear'
    searchBox.style.backgroundColor = 'transparent'
    searchBox.style.marginTop = '0'
    searchBox.style.marginLeft = '10vw'
    searchBox.style.width = '0'
    setTimeout(function () {searchBox.style.transition = 'all 0s'}, 1)
    twitch.children[0].style.transition = 'all .4s linear'
    twitch.children[0].style.marginTop = '.53vh'
    twitch.children[0].style.marginLeft = '-1.3vw'
    twitch.children[0].style.width = '8vw'
    twitch.children[1].style.transition = 'all .4s linear'
    twitch.children[1].style.marginTop = '0'
    twitch.children[1].style.marginLeft = '-1vw'
    twitch.children[1].style.width = '15vw'
    setTimeout(function () {twitch.children[0].style.transition = 'all 0s'}, 1)
    setTimeout(function () {twitch.children[1].style.transition = 'all 0s'}, 1)
  }
})
}
