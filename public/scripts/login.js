const handleSignup = function() {
  $('#signup-button').on('click', event => {
    console.log('signup clicked');
    event.preventDefault();
    const userInfo = {
      username: $('#username-input').val(),
      password: $('#password-input').val()
    };
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/signup',
      data: JSON.stringify(userInfo),
      success: successHandler,
      error: errorHandler,
      contentType: 'application/json'
    });

    function successHandler(data) {
      console.log(data);
      localStorage.setItem('currUserId', data.payload.id);
    }

    function errorHandler(err) {
      console.log('ERRROR', err);
    }
  });
};

const handleLogin = function() {
  $('#login-button').on('click', event => {
    console.log('login clicked');
    event.preventDefault();
    const userInfo = {
      username: $('#username-input').val(),
      password: $('#password-input').val()
    };
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/signin',
      data: JSON.stringify(userInfo),
      success: successHandler,
      error: errorHandler,
      contentType: 'application/json'
    });

    function successHandler(data) {
      localStorage.setItem('currUserId', data.payload.id);
    }

    function errorHandler(err) {
      console.log('ERRROR', err);
    }
  });
};

handleSignup();
handleLogin();
