const passwordInput = document.getElementsByClassName('password-input')[0]
const logInInput = document.getElementsByClassName('log-in-input')[0]
const logInButton = document.getElementsByClassName('log-in-button')[0]
const signUpBaitLink = document.getElementsByClassName('sign-up-bait-link')[0]

logInButton.addEventListener('click', () => {
  fetch('/sundayFunday/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: logInInput.value,
      password: passwordInput.value
    })
  }).then((result) => {
    location = result.url
  })
})
signUpBaitLink.addEventListener('click', () => {
  location.href = '/sundayFunday/signup'
})
logInInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === 'ArrowDown') {
    passwordInput.focus()
  }
})
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    logInButton.click()
  }
  if (e.key === 'ArrowUp') {
    logInInput.focus()
  }
})

logInInput.value = ''
passwordInput.value = ''