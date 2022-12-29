const htmlForm = document.querySelector("#form_register");

const input = document.createElement("input");
input.type = "hidden";
input.name = "csrfmiddlewaretoken";
input.value = "aaaaa";
htmlForm.appendChild(input);

htmlForm.onsubmit = async function (event) {
  event.preventDefault();

  const first_name = htmlForm.elements.first_name.value;
  const last_name = htmlForm.elements.last_name.value;
  const username = htmlForm.elements.username.value;
  const password1 = htmlForm.elements.password1.value;
  const password2 = htmlForm.elements.password2.value;
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
    // console.log(JSON.stringify(user));
    const response = await fetch("http://127.0.0.1:8000/users/", options);
    const data = await response.json();
    // console.log(data);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
