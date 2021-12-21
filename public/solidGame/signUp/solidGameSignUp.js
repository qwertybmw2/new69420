/*
  ==========
  variables
  ==========
*/
{
var passwordInput = document.getElementsByClassName('password-input')[0]
var loginInput = document.getElementsByClassName('login-input')[0]
var registerButton = document.getElementsByClassName('register-button')[0]
var logInBaitLink = document.getElementsByClassName('log-in-bait-link')[0]
}
{
  loginInput.value = ''
  passwordInput.value = ''
}

/*
  =========
  functions
  =========
*/
{
registerButton.addEventListener('click', (e) => {
  fetch('/solidGame/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: loginInput.value,
      password: passwordInput.value
    })
  }).then((result) => {
    window.location.href = result.url
  })
})
logInBaitLink.addEventListener('click', (e) => {
  location.href = '/solidGame/login'
})
}
/*
  ==============
  function calls
  ==============
*/

{
loginInput.focus()
}
