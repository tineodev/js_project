const html_forms = document.querySelector("form");
const inputs = document.querySelectorAll("input");

const localToken = JSON.parse(localStorage.getItem('localToken')) ?? window.location.replace('/login/html/login.html')
const localID = JSON.parse(localStorage.getItem('localID')) ?? window.location.replace('/login/html/login.html')

const htmlLogout = document.querySelector('#htmlLogout')
const htmlUsername = document.querySelector('#htmlUsername')


htmlUsername.innerText = `Welcome, ${localID.username.toUpperCase()}`


if (!localID.is_staff) {
  Swal.fire(
    "I'm sorry",
    'Only administrators can access',
    'error'
  ).then(() => (window.location.replace("/main/html/index.html"))); 
}


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
      // console.log("exito");

      let timerInterval;
      Swal.fire({
        title: "Service saved successfully",
        html: "This window will close soon.",
        timer: 1500,
        timerProgressBar: true,
        icon: "success",
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
          window.location.replace("/");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Wrong values...",
        text: "Please correct them and try again",
      })
      // console.log("No_guardado");
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
    console.log(error);
  }
};



function getID(pm_field) {
  const params = new URLSearchParams(window.location.search);
  return params.get(pm_field);
}

htmlLogout.onclick = function (event) {
  localStorage.removeItem('localID')
  localStorage.removeItem('localToken')
  localStorage.removeItem('localServices')
  window.location.reload();
}

actualizarvalores()
