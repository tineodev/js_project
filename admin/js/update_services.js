const html_forms = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const localToken = JSON.parse(localStorage.getItem('localToken')) ?? window.location.replace('/login/html/login.html')
const localID = JSON.parse(localStorage.getItem('localID')) ?? window.location.replace('/login/html/login.html')

async function actualizarvalores() {
  const response = await fetch(`http://127.0.0.1:8000/services/${getID('id')}/`);
  const data = await response.json()

  inputs.forEach((input) => {
    const valor = data[input.name]
    input.value = valor
  });

}

html_forms.onsubmit = async function (event) {
  event.preventDefault();

  const body = {};

  inputs.forEach((input) => {
    body[input.name] = input.value;
  });
  
  const body_json = JSON.stringify(body);
  console.log(body_json)
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localToken.access
      },
      body: body_json,
    };

    const response = await fetch(`http://127.0.0.1:8000/services/${getID("id")}/`, options);

    if (response.ok) {
      console.log("exito");
    } else {
      console.log("fallo");
    }
  } catch (error) {
    console.log("Algo pasó");
  }
};



function getID(pm_field) {
  const params = new URLSearchParams(window.location.search);
  return params.get(pm_field);
}


actualizarvalores()
