const jobsListings = document.querySelector('.jobs-listings');
const pagination = document.querySelector('.pagination');
const paginationContainer = document.querySelector('.pagination-container');
const previousBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');
const RESULTS_PER_PAGE = 4;

fetch('data.json')
.then((response) => {
    return response.json();
}).then((jobs) => {
    console.log(jobs)

    let numPage = 1;

    for (let i = 0; i < jobs.length; i += RESULTS_PER_PAGE){

        const pageButton = document.createElement('button');

        pageButton.className = ` ${i === 0 ? "btn-active" : ""} page-btn w-10 h-10 button-${numPage} rounded-full bg-primary text-white font-bold shadow-md shadow-blue-500/20`;
        pageButton.innerHTML += `${numPage}`;
        numPage ++;
        pagination.appendChild(pageButton);        
    }

    changePage(jobs);
    displayJobs(jobs, 1);
})

function changePage(jobs){

    const paginationButtons = document.querySelectorAll('.page-btn')

    paginationContainer.addEventListener('click', (e) =>{
        //si click en un boton número
        if (e.target.classList.contains('page-btn')){
            paginationButtons.forEach(button => {
                if (e.target === button){
                    document.querySelector(".page-btn.btn-active").classList.remove("btn-active")
                    button.classList.add("btn-active")
                    
                    const currentPage = parseInt(button.textContent)
                    
                    displayJobs(jobs,currentPage);
                    addBtnActive(jobs)
                } 
            })
        //si click en flechas
        } else if (e.target.closest('.change-btn')){

            const changeBtn = e.target.closest('.change-btn');
            const currentPage = document.querySelector(".page-btn.btn-active").textContent;
            const currentPageInt = changeBtn.id === "previous-btn" ? (parseInt(currentPage) - 1) : (parseInt(currentPage) + 1);
        
            displayJobs(jobs,currentPageInt);

            const btnActive = document.querySelector(`.button-${currentPageInt}`)

            document.querySelector(".page-btn.btn-active").classList.remove("btn-active")
            btnActive.classList.add("btn-active")
            addBtnActive(jobs)
        }
    })
}

function addBtnActive(jobs){

    const currentPage = document.querySelector('.page-btn.btn-active');
    nextBtn.disabled = false;
    previousBtn.disabled = false;
    if (currentPage.textContent === "1"){
        previousBtn.disabled = true;
    }  else if (Math.ceil(jobs.length / RESULTS_PER_PAGE) === parseInt(currentPage.textContent)){
        nextBtn.disabled = true;
    } 
}

function displayJobs(jobs, page){
        jobsListings.innerHTML = '';
        page--;
        const start = RESULTS_PER_PAGE * page;
        const end = start + RESULTS_PER_PAGE;
        const paginatedJobs = jobs.slice(start, end);
        
        paginatedJobs.forEach(job => {

            const article = document.createElement('article')
            const tecnologias = job.data.tech.join(" ");
            article.className = 'job modality schedule level range tech group relative flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-white border border-slate-200 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-blue-500/5';
            article.dataset.modality = job.data.modality;
            article.dataset.range = job.data.range;
            article.dataset.level = job.data.level;
            article.dataset.schedule = job.data.schedule;
            article.dataset.tech = tecnologias;

                                //template string
            article.innerHTML = `<div class="absolute top-4 right-4">
                            <button class="text-slate-400 hover:text-primary transition-colors">
                                <span class="material-symbols-outlined">bookmark_border</span>
                            </button>
                        </div>
                        <div class="flex-shrink-0">
                            <div class="size-16 rounded-xl bg-white border border-slate-100 p-2 flex items-center justify-center overflow-hidden"
                                data-alt="TechCorp Logo">
                                <img alt="Company Logo" class="w-full h-full object-contain"
                                    src=${job.urlImg} />
                            </div>
                        </div>
                        <div class="flex-grow flex flex-col gap-3">
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <h3 class="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                                        ${job.titulo}</h3>
                                    <span
                                        class="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-100">Nuevo</span>
                                </div>
                                <p class="text-slate-600 font-medium">Google Inc.</p>
                            </div>
                            <div class="flex flex-wrap gap-2 text-sm text-slate-500">
                                <span
                                    class="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                    <span class="material-symbols-outlined text-base">schedule</span> ${job.data.schedule}
                                </span>
                                <span
                                    class="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                    <span class="material-symbols-outlined text-base">attach_money</span> ${job.data.range}
                                </span>
                                <span
                                    class="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                    <span class="material-symbols-outlined text-base">schedule</span> ${job.data.modality}
                                </span>
                                <span
                                    class="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                    <span class="material-symbols-outlined text-base">schedule</span> ${tecnologias}
                                </span>
                            </div>
                        </div>
                        <div class="hidden md:flex flex-col items-end justify-between">
                            <div class="h-6"></div>
                            <button
                                class="button-apply-job bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-bold text-sm transition-transform active:scale-95 shadow-lg shadow-blue-500/20">
                                Aplicar
                            </button>
                        </div>`

                        jobsListings.appendChild(article);
        });
}
