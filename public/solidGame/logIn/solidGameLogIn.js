/*
  ==========
  variables
  ==========
*/
{
var passwordInput = document.getElementsByClassName('password-input')[0]
var loginInput = document.getElementsByClassName('login-input')[0]
var loginButton = document.getElementsByClassName('login-button')[0]
var signUpBaitLink = document.getElementsByClassName('sign-up-bait-link')[0]
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
loginButton.addEventListener('click', (e) => {
  fetch('/solidGame/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: loginInput.value,
      password: passwordInput.value
    })
  }).then((result) => {
    location.href = result.ulr
  })
})
signUpBaitLink.addEventListener('click', (e) => {
  location.href = '/solidGame/signup'
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
