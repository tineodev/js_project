const html_payments = document.querySelector("#htmlPayments");
htmlExpired;
const html_expired = document.querySelector("#htmlExpired");


async function apiGET(pm_element, pm_service, pm_function, pm_user) {
  try {
    const url = `http://127.0.0.1:8000/${pm_service}/`;
    const response = await fetch(url);
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
  return `
  <div>Logo: (faltante)</div>
  <div>Service ID: ${data.service_id}</div>
  <div>Fecha pago: ${data.payment_date}</div>
  <div>Amount: ${data.amount}</div>
  <div>User ID(delete): ${data.user_id}</div>
  <hr></hr>
  `;
}
function listPaymentsExpired(data) {
  return `
  <div>Logo: (faltante)</div>
  <div>Service ID: ${data.service_id}</div>
  <div>Fecha pago: (faltante)</div>
  <div>Amount: ${data.amount}</div>
  <div>Amount fee: ${data.amount_fee}</div>
  <div>User ID(delete): ${data.user_id}</div>
  <hr></hr>
  `;
}
apiGET(html_payments, 'payments', listPayments, 1);
apiGET(html_expired, 'payments-expired', listPaymentsExpired, 1);
