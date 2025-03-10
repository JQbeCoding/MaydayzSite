function checkoutPlate() {
  var price = 22;
  const drink = document.querySelector('input[name="drink"]:checked');
  const sides = [...document.querySelectorAll('input[name="side"]:checked')];
  let orderSummary = "Order Summary:\n";
  orderSummary += `Drink: ${drink ? drink.value : "None"}\n`;
  orderSummary += `Sides: ${
    sides.map((side) => side.value).join(", ") || "None"
  }\n`;
  alert(orderSummary);
}
function checkoutSampler() {
  const price = 32;
  const drink = document.querySelector('input[name="drink"]:checked');
  const meats = [...document.querySelectorAll('input[name="meat"]:checked')];
  const sides = [...document.querySelectorAll('input[name="side"]:checked')];

  let orderSummary = "<h2>Order Summary:</h2>";
  orderSummary += `<p id = "option"><strong>Drink:</strong> ${
    drink ? drink.value : "None"
  }</p>`;
  orderSummary += `<p id = "option"><strong>Meats:</strong> ${
    meats.length > 0 ? meats.map((meat) => meat.value).join(", ") : "None"
  }</p>`;
  orderSummary += `<p id = "option"><strong>Sides:</strong> ${
    sides.length > 0 ? sides.map((side) => side.value).join(", ") : "None"
  }</p>`;
  orderSummary += `<p id = "option"><strong>Total Price:</strong> $${price}</p>`;

  localStorage.setItem("orderSummary", orderSummary);

  window.location.replace("payment.html");
}
