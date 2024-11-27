var platezPayment = document.getElementById(paymentProcess)

window.onclick = function (process){
    if(process.target == platezPayment){
        modal.style.display = "none";
    }
}