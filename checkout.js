function checkoutPlate() {
    const drink = document.querySelector('input[name="drink"]:checked');
    const sides = [...document.querySelectorAll('input[name="side"]:checked')];
    let orderSummary = "Order Summary:\n";
    orderSummary += `Drink: ${drink ? drink.value : "None"}\n`;
    orderSummary += `Sides: ${sides.map(side => side.value).join(", ") || "None"}\n`;
    alert(orderSummary);
}
function checkoutSampler() {
    const drink = document.querySelector('input[name="drink"]:checked');
    const sides = [...document.querySelectorAll('input[name="side"]:checked')];
    let orderSummary = "Order Summary:\n";
    orderSummary += `Drink: ${drink ? drink.value : "None"}\n`;

    orderSummary += `meats: ${sides.map(side => side.value).join(", ") || "None"}\n`;
    orderSummary += `Sides: ${sides.map(side => side.value).join(", ") || "None"}\n`;
    alert(orderSummary);
}
