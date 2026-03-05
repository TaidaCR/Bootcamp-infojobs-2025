// var applyButtons = document.querySelectorAll('.button-apply-job');

// applyButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         button.textContent= "Aplicado";
//         button.classList.add("isApplied");
//         button.disababled = true;
//     })
// });

//MAS CORRECTO QUE EL ANTERIOR PORQUE NO ITERA. BUSCA EL TARGET Y AHI APLCIA
const jobsListings = document.querySelector('.jobs-listings');

//? (optionalChaning) PREGUNTA SI ES NULL O UNDEFINED.
jobsListings?.addEventListener("click", function (e) {
    if (e.target.classList.contains("button-apply-job")) {
        e.target.classList.add("isApplied")
        e.target.textContent = "Aplicado"
        e.target.disabled = true;
    }
})