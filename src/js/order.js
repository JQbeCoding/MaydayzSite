// Global variable to keep track of the number of payments
// Initialize paymentCount from localStorage, or 0 if not set
var paymentCount = parseInt(localStorage.getItem('paymentCount')) || 0;
var paymentTotal = 0; 

// Display initial count (optional, for verification)
console.log("Initial Payment Count (from localStorage): " + paymentCount);

// Function to update and save payment count
function updatePaymentCount() {
  paymentCount++;
  localStorage.setItem('paymentCount', paymentCount); // Save to localStorage
  console.log("Payment Count: " + paymentCount);
}


function openSamplerPayment() {
  window.open(
    "https://square.link/u/DiLFGufU",
    "Sampler",
    "width=700,height=500,top=150,left=375"
  );

  console.log("Sampler Payment Link Opened");
  updatePaymentCount(); 
}

function openPlatesPayment() {
  window.open(
    "https://square.link/u/LQwii9Tz",
    "Sampler",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Plates Payment Link Opened");
  updatePaymentCount();
}

function openNuggetsPayment() {
  window.open(
    "https://square.link/u/d071gIWh",
    "Nuggets",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Nuggets Payment Link Opened");
  updatePaymentCount();
}

function openSandwichPayment() {
  window.open(
    "https://square.link/u/Y0cOImSn",
    "Sanwhich",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Sandwich Payment Link Opened");
  updatePaymentCount();
}

function openCobblerPayment() {
  window.open(
    "https://square.link/u/EWZdQQbf",
    "Cobbler",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Cobbler Payment Link Opened");
  updatePaymentCount();
}

function openPeachCobblerPayment() {
  window.open(
    "https://square.link/u/7J9qeSCt",
    "Cobbler",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Peach Cobbler Payment Link Opened");
  updatePaymentCount();
}

function openRibPlatePayment() {
  window.open(
    "https://square.link/u/06cF8aZF",
    "Rib Plate",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Rib Plate Payment Link Opened");
  updatePaymentCount();
}

function openPulledPorkPayment() {
  window.open(
    "https://square.link/u/WPbCdn1F",
    "Pulled Pork",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Pulled Pork Payment Link Opened");
  updatePaymentCount();
}

function openPorkChopPayment() {
  window.open(
    "https://square.link/u/5GRCttGm",
    "Pork Chop Plate",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Pork Chop Payment Link Opened");
  updatePaymentCount();
}

function openPulledChickenPayment() {
  window.open(
    "https://square.link/u/D2zoTAFF",
    "Pork Chop Plate",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Pulled Chicken Payment Link Opened");
  updatePaymentCount();
}

function openChickenPayment() {
  window.open(
    "https://square.link/u/FutoPIdm",
    "Pork Chop Plate",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Chicken Payment Link Opened");
  updatePaymentCount();
}

function paymentTest() {
  window.open(
    "Dasampler.html",
    "Pork Chop Plate",
    "width=700,height=700,top=150,left=375"
  );
  console.log("Payment Test Link Opened");
  updatePaymentCount();
}

function openTurkeyPlatePayment() {
  window.open(
    "https://square.link/u/7fKhbrnY",
    "Turkey Plate",
    "width=500,height=500,top=150,left=375"
  );
  console.log("Turkey Plate Payment Link Opened");
  updatePaymentCount();
}