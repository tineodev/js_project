const formLogin = document.querySelector('#form_login')
const formRegister = document.querySelector('#form_register')
const inputsLogin = document.querySelectorAll('.input_login')
const inputsRegister = document.querySelectorAll('.input_register')

formLogin.onsubmit = async function (event) {
  event.preventDefault()

  const body = {}

  inputsLogin.forEach((input) => {
    body[input.name] = input.value
  });

  const body_json = JSON.stringify(body);

  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body_json,
    };
    const response = await fetch('http://127.0.0.1:8000/token/', options);
    const data = await response.json();
    
    if (data.detail) {
      // !Añadir alerta
      window.location.replace('/login/html/login.html')
    } else {
      const responseID = await fetch(`http://127.0.0.1:8000/users/${body.username}/`);
      const dataID = await responseID.json();
      localStorage.setItem('localID', JSON.stringify(dataID))
      localStorage.setItem('localToken', JSON.stringify(data))
      window.location.replace('/main/html/index.html')
    }
  } catch (error) {
    console.log(error)
  }
}