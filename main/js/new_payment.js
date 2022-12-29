const htmlSelect = document.querySelector("#html_select");
const htmlForm = document.querySelector("#htmlForm");
const htmlInputs = document.querySelectorAll("input");

const localToken = JSON.parse(localStorage.getItem("localToken")) ?? window.location.replace("/login/html/login.html");
const localID = JSON.parse(localStorage.getItem("localID")) ?? window.location.replace("/login/html/login.html");

const htmlLogout = document.querySelector('#htmlLogout')
const htmlUsername = document.querySelector('#htmlUsername')


htmlUsername.innerText = `Welcome, ${localID.username.toUpperCase()}`

async function apiGET() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localToken.access,
      },
    };

    console.log(options)
    const url = `http://127.0.0.1:8000/services/`;
    const response = await fetch(url, options);
    const data = await response.json();


    console.log(data);

    data.forEach((record) => {
      htmlSelect.innerHTML += `<option value="${record.id}">${record.name}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
}


htmlForm.onsubmit = async function (event) {
  event.preventDefault();
  const today = new Date();
  const body = {
    service_id: htmlSelect.value,
    payment_date: today.toISOString().slice(0, 10),
    user_id: localID.id,
  };

  htmlInputs.forEach((input) => {
    body[input.name] = input.value;
  });

  const body_json = JSON.stringify(body);
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localToken.access,
      },
      body: body_json,
    };

    const response = await fetch(`http://127.0.0.1:8000/payments/`, options);
    console.log(response)
    if (response.ok) {
      console.log("Guardado");

      let timerInterval;
      Swal.fire({
        title: "Payment saved successfully",
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
          // window.location.replace("/main/html/payments.html");
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

apiGET();


htmlLogout.onclick = function (event) {
  localStorage.removeItem('localID')
  localStorage.removeItem('localToken')
  localStorage.removeItem('localServices')
  window.location.reload();
}
