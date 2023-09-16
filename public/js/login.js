const loginHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-login');
  const passwordEl = document.querySelector('#password-login');

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Login Failed!');
  }
};

document.querySelector('#login-form').addEventListener('submit', loginHandler);
