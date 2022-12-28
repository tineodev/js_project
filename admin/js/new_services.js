const htmlForm = document.querySelector('form')
const htmlInputs = document.querySelectorAll('input')
const localToken = JSON.parse(localStorage.getItem('localToken')) ?? window.location.replace('/login/html/login.html')
const localID = JSON.parse(localStorage.getItem('localID')) ?? window.location.replace('/login/html/login.html')


htmlForm.onsubmit = async function (event) {
  event.preventDefault()
  const body = {}

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
        'Authorization': 'Bearer ' + localToken.access
      },
      body: body_json,
    };
    const response = await fetch(`http://127.0.0.1:8000/services/`, options);
    if (response.ok) {
      console.log('Guardado')
      // window.location.replace('/')
    } else {
    console.log('No_guardado')
	}
  } catch (error){
    console.log(error)
  }
}


