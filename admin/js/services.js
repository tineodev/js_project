const htmlServices = document.querySelector("#htmlServices");

const services = JSON.parse(localStorage.getItem('localServices')) ?? getServices()
const localToken = JSON.parse(localStorage.getItem('localToken')) ?? window.location.replace('/js_project/login/html/login.html')

const htmlLogout = document.querySelector('#htmlLogout')
const htmlUsername = document.querySelector('#htmlUsername')
const localID = JSON.parse(localStorage.getItem('localID')) ?? window.location.replace('/js_project/login/html/login.html')

const htmlForm = document.querySelector("form");
const htmlInputs = document.querySelectorAll("input");



htmlUsername.innerText = `Welcome, ${localID.username.toUpperCase()}`

if (!localID.is_staff) {
  Swal.fire("I'm sorry", "Only administrators can access", "error").then(() =>
    window.location.replace("/js_project/main/html/payments.html")
  );
}

htmlUsername.innerText = `Welcome, ${localID.username.toUpperCase()}`

async function getServices() {
  try {
    const url = `https://restproject-production.up.railway.app/services/`;
    const response = await fetch(url);
    const data = await response.json();

    localStorage.setItem('localServices', JSON.stringify(data))
  } catch (error) {
    console.log(error);
  }
}


async function apiGET(pm_element, pm_service, pm_function) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localToken.access
      },
    };
    const url = `https://restproject-production.up.railway.app/${pm_service}/`;
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);

    data.forEach((record) => {
      pm_element.innerHTML += pm_function(record);
      
    });
  } catch (error) {
    console.log(error);
  }
}

function listServices(data) {
  return `
  <div class="col-lg-6 col-sm-12">
    <div class="portfolio-item">
      <div class="card mb-3" style="max-width: 640px;">
      <div class="row g-0">
        <div class="col-md-4 m-auto">
          <img src="${data.logo}" class="img-fluid rounded-start p-2" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title ">${data.name}</h5>
            <p class="card-text" style="margin-bottom:0;"><small class="text-muted">${data.prefix}</small></p>
            <p class="card-text" style="font-size:.8rem">${data.description}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  `;
}


htmlLogout.onclick = function (event) {
  localStorage.removeItem('localID')
  localStorage.removeItem('localToken')
  localStorage.removeItem('localServices')
  window.location.reload();
}

apiGET(htmlServices, 'services', listServices);

