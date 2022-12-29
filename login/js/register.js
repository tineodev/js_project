const htmlForm = document.querySelector("#form_register");

// const input = document.createElement("input");
// input.type = "hidden";
// input.name = "csrfmiddlewaretoken";
// input.value = "aaaaa";
// htmlForm.appendChild(input);

htmlForm.onsubmit = async function (event) {
  event.preventDefault();

  const first_name = htmlForm.elements.first_name.value;
  const last_name = htmlForm.elements.last_name.value;
  const username = htmlForm.elements.username.value;
  const password1 = htmlForm.elements.password1.value;
  const email = htmlForm.elements.email.value;

  const user = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    password: password1,
  };

  try {
    const options = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("http://127.0.0.1:8000/users/", options);
    const data = await response.json();
    console.log(response)
    console.log(data)

    if (response.ok) {
      console.log("Guardado");
      let timerInterval;
      Swal.fire({
        title: "Account created successfully",
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
          window.location.reload();
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Wrong values...",
        text: "Please correct them and try again",
      })
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
