const html_payments = document.querySelector("#htmlPayments");
const html_expired = document.querySelector("#htmlExpired");

const services = JSON.parse(localStorage.getItem('localServices')) ?? getServices()
const localToken = JSON.parse(localStorage.getItem('localToken')) ?? window.location.replace('/login/html/login.html')

const htmlLogout = document.querySelector('#htmlLogout')
const htmlUsername = document.querySelector('#htmlUsername')
const localID = JSON.parse(localStorage.getItem('localID')) ?? window.location.replace('/login/html/login.html')


htmlUsername.innerText = `Welcome, ${localID.username.toUpperCase()}`

async function getServices() {
  try {
    const url = `http://127.0.0.1:8000/services/`;
    const response = await fetch(url);
    const data = await response.json();

    data.forEach((record) => {
      delete record.description
      delete record.prefix
    });

    localStorage.setItem('localServices', JSON.stringify(data))
  } catch (error) {
    console.log(error);
  }
}


async function apiGET(pm_element, pm_service, pm_function, pm_user) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localToken.access
      },
    };
    const url = `http://127.0.0.1:8000/${pm_service}/`;
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data.results);

    data.results.forEach((record) => {
      if (record.user_id==pm_user) {
        pm_element.innerHTML += pm_function(record);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function listPayments(data) {
  const id = data.service_id
  const items = services.find((item) => item.id===id)
  const name = items ? items.name : 'Loading'
  const logo = items ? items.logo : 'Loading'
  return `
  <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
    <div class="portfolio-item">
      <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4 m-auto">
          <img src="${logo}" class="img-fluid rounded-start p-2" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text" style="margin-bottom:0">Amount: $${data.amount}</p>
            <!--<p class="card-text">ID User (delete): ${data.user_id}</p>-->
            <p class="card-text"><small class="text-muted">Payment date: ${data.payment_date}</small></p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  `;
}


function listPaymentsExpired(data) {
  const id = data.service_id
  const items = services.find((item) => item.id===id)
  const name = items ? items.name : 'Loading'
  const logo = items ? items.logo : 'Loading'
  return `
  <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
    <div class="portfolio-item">
      <div class="card mb-3 border-danger" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4 m-auto">
            <img src="${logo}" class="img-fluid rounded-start p-2" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text" style="margin-bottom:0">Amount: $${data.amount}</p>
              <p class="card-text text-danger">Amount fee: $${data.amount_fee}</p>
              <!--<p class="card-text">ID User (delete): ${data.user_id}</p>-->
              <p class="card-text"><small class="text-muted">Payment date: 'pendiente'</small></p>
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

apiGET(html_payments, 'payments', listPayments, localID.id);
apiGET(html_expired, 'payments-expired', listPaymentsExpired, localID.id);

