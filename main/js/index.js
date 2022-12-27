const html_payments = document.querySelector("#htmlPayments");
htmlExpired;
const html_expired = document.querySelector("#htmlExpired");

// async function apiPayments() {
//   try {
//     const url = "http://127.0.0.1:8000/payments/";
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log(data.results);

//     data.results.forEach((record) => {
//       html_payments.innerHTML += listResults(record);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

async function apiGET(pm_element, pm_service, pm_function) {
  try {
    const url = `http://127.0.0.1:8000/${pm_service}/`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data.results);

    data.results.forEach((record) => {
      pm_element.innerHTML += pm_function(record);
    });
  } catch (error) {
    console.log(error);
  }
}
function listResults(data) {
  return `
  <div>Service ID: ${data.service_id}</div>
  <div>User ID(delete): ${data.user_id}</div>
  <div>Amount: ${data.amount}</div>
  <div>Logo: (faltante)</div>
  <hr></hr>
  `;
}
function listResults2(data) {
  return `
  <div>Amount fee: ${data.amount_fee}</div>
  <div>User ID(delete): ${data.user_id}</div>
  <div>Amount: ${data.amount}</div>
  <div>Logo: (faltante)</div>
  hola
  <hr></hr>
  `;
}
apiGET(html_payments, 'payments', listResults);
apiGET(html_expired, 'payments-expired', listResults2);
