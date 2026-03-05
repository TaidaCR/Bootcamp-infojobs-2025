const searchInput = document.getElementById("inputSearch");
const salaryRangeFilter = document.getElementById("range")
const employmentTypeFilter = document.getElementById("type")
const experienceLevelFilter = document.getElementById("level")
const modalityFilter = document.getElementById("modality");
const techFilter = document.getElementById("tech");
const clearFiltersButton = document.getElementById("clearFilters");
const tituloBusqueda = document.getElementById("titulo-busqueda");

function filterJobs(filter, dataFilter) {
    filter.addEventListener("change", function () {
        const valor = this.value;
        const jobs = document.querySelectorAll('.job');
        
        jobs.forEach(job => {
            const modalidad = job.dataset[dataFilter] || "";
            let isShown = false;

            // 1. Lógica de comparación
            if (valor === "") {
                isShown = true; // Si el filtro está vacío, mostramos
            } else if (filter.id === "tech") {
                // Filtro de lista: comprueba si el valor está incluido
                isShown = modalidad.toLowerCase().includes(valor.toLowerCase());
            } else {
                // Filtro normal: comparación exacta
                isShown = modalidad === valor;
            }

            // 2. Aplicar la clase específica de este filtro
            // Si NO debe mostrarse, añadimos la clase oculta. Si debe mostrarse, la quitamos.
            job.classList.toggle("hiddenFilter" + filter.id, !isShown);
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {
filterJobs(modalityFilter, 'modality')
filterJobs(salaryRangeFilter, 'range')
filterJobs(employmentTypeFilter,  'schedule')
filterJobs(experienceLevelFilter, 'level')
filterJobs(techFilter, 'tech')
})


//FILTRO SEARCH
searchInput.addEventListener('keyup', () => {
    const jobs = document.querySelectorAll('.job');
    let searchText = searchInput.value.toLowerCase();
  
    jobs.forEach(job => {
            const jobTitle = job.querySelector('h3')
            const titleToCompare = jobTitle.textContent.toLowerCase();
            const isShown = titleToCompare.includes(searchText)

            job.classList.toggle("hiddenSearch", !isShown)
    });

    //TITULO BUSQUEDA
    searchText.trim() === "" ? tituloBusqueda.textContent = "Todos los empleos" :  tituloBusqueda.textContent = `Resultados para "${searchInput.value}"`;
    
})

clearFiltersButton.addEventListener("click", () => {
    const jobs = document.querySelectorAll('.job');
    salaryRangeFilter.value = "";
    modalityFilter.value = "";
    employmentTypeFilter.value = "";
    experienceLevelFilter.value = "";
    techFilter.value = "";
    searchInput.value = "";
    tituloBusqueda.textContent = "Todos los empleos"


jobs.forEach(job => {
    job.classList.remove("hiddenSearch", "hiddenFiltertech", "hiddenFilterlevel", "hiddenFilterrange", "hiddenFiltermodality", "hiddenFiltertype");
});
})
