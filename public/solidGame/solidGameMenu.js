/*
  ==========
  variables
  ==========
*/
{
var passwordInput = document.getElementsByClassName('password-input')[0]
var loginInput = document.getElementsByClassName('login-input')[0]
var loginButton = document.getElementsByClassName('login-button')[0]
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

}

{
loginButton.addEventListener('click', (e) => {
  var credentials = {username: loginInput.value, password: passwordInput.value}
  fetch('/solidGame/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
})
addEventListener('keydown', (e) => {
  switch (e.target.className) {
    case 'login-input':
      if (e.key === 'Enter') {
        location = 'file:///C:/users/szymon/desktop/html/solidGame/solidGame/solidGame.html'
      }
  }
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
