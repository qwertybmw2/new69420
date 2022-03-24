const passwordInput = document.getElementsByClassName('password-input')[0]
const logInInput = document.getElementsByClassName('log-in-input')[0]
const signUpButton = document.getElementsByClassName('sign-up-button')[0]
const logInBaitLink = document.getElementsByClassName('log-in-bait-link')[0]

signUpButton.addEventListener('click', () => {
  fetch('/sundayFunday/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: logInInput.value,
      password: passwordInput.value
    })
  }).then((result) => {
    window.location.href = result.url
  })
})
logInBaitLink.addEventListener('click', () => {
  location.href = '/sundayFunday/login'
})
logInInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === 'ArrowDown') {
    passwordInput.focus()
  }
})
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    signUpButton.click()
  }
  if (e.key === 'ArrowUp') {
    logInInput.focus()
  }
})

logInInput.value = ''
passwordInput.value = ''
