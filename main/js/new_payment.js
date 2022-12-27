const htmlSelect = document.querySelector('#html_select')
const htmlForm = document.querySelector('form')
const htmlInputs = document.querySelectorAll('input')
const localUser = 1 //reemplazar con localstorage
// async function apiGET(pm_element, pm_service, pm_function, pm_user) {
async function apiGET() {

  try {
    const url = `http://127.0.0.1:8000/services/`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    data.forEach((record) => {
      htmlSelect.innerHTML += `<option value="${record.id}">${record.name}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
}

// apiGET(htmlSelect, 'Services', )
apiGET()

htmlForm.onsubmit = async function (event) {
  event.preventDefault()
  const today = new Date
  const body = {
    service_id: htmlSelect.value,
    payment_date:today.toISOString().slice(0,10),
    user_id: localUser
  }

  htmlInputs.forEach((input) => {
    body[input.name] = input.value;
  });

  const body_json = JSON.stringify(body);
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body_json,
    };
    const response = await fetch(`http://127.0.0.1:8000/payments/`, options);
    // console.log(body_json)
    if (response.ok) {
      console.log('Guardado')
      window.location.replace('/')
    } else {
    console.log('No_guardado')
	}
  } catch (error){
    console.log(error)
  }
}
