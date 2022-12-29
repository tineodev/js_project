const htmlForm = document.querySelector("form");
const htmlInputs = document.querySelectorAll("input");

const localToken = JSON.parse(localStorage.getItem("localToken")) ?? window.location.replace("/js_project/login/html/login.html");
const localID = JSON.parse(localStorage.getItem("localID")) ?? window.location.replace("/js_project/login/html/login.html");

const htmlLogout = document.querySelector('#htmlLogout')
const htmlUsername = document.querySelector('#htmlUsername')


htmlUsername.innerText = `Welcome, ${localID.username.toUpperCase()}`

if (!localID.is_staff) {
  Swal.fire("I'm sorry", "Only administrators can access", "error").then(() =>
    window.location.replace("/js_project/main/html/payments.html")
  );
}

htmlForm.onsubmit = async function (event) {
  event.preventDefault();
  const body = {};

  htmlInputs.forEach((input) => {
    body[input.name] = input.value;
  });
  // console.log(body)

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
    const response = await fetch(`https://restproject-production.up.railway.app/services/`, options);
    if (response.ok) {
      // console.log('Guardado')

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
          window.location.replace("/js_project/admin/html/services.html");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Wrong values...",
        text: "Please correct them and try again",
      });
      // console.log("No_guardado");
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    console.log(error);
  }
};

htmlLogout.onclick = function (event) {
  localStorage.removeItem('localID')
  localStorage.removeItem('localToken')
  localStorage.removeItem('localServices')
  window.location.reload();
}