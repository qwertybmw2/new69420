/*
  ==========
  variables
  ==========
*/
{
var passwordInput = document.getElementsByClassName('password-input')[0]
var loginInput = document.getElementsByClassName('login-input')[0]
var registerButton = document.getElementsByClassName('register-button')[0]
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
registerButton.addEventListener('click', (e) => {
  fetch('/solidGame/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: loginInput.value, password: passwordInput.value})// these are credentials
  }).then((result) => {
    window.location.href = result.url
  })
})
signUpBaitLink.addEventListener('click', (e) => {
  console.log('clicked :)')
  window.location.href = '/solidGame/signup'
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
