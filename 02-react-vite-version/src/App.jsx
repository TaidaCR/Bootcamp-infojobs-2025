//como renderizar una lista de elementos/componentes para mostrarlos en la UI?
import { Header } from "../components/Header.jsx"
import opciones from './data/filtros.json'
import jobs from './data/data.json'
import { Footer } from "../components/Footer.jsx"
import { JobsList } from "../components/JobsList.jsx"
import { Pagination } from "../components/Pagination.jsx"
import { useState } from "react";
import { SearchFormSection } from "../components/SearchFormSection.jsx"

const initialFilters = {
    search: "",
    tech: "",
    schedule: "",
    level: "",
    range: "",
    modality: ""
  }

function App() {
  const RESULTS_PER_PAGE = 5;

  //hooks para manejar estado de filtros, texto a filtrar y paginación
  const [filters, setFilters] = useState(initialFilters)
  const [textToFilter, setTextToFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  //función para manejar cambios en los filtros de selección
  //paso name y value desde cada SelectFilter con onChangeSelect//handleSelectChangeS (diferente a este handleSelectChange)
  const handleSelectChange = (name, value) =>{
      setFilters(prevFilters => ({
        ...prevFilters, 
        [name]: value}))
      setCurrentPage(1)
  }

  //Aplicamos todos los filtros de SELECT a los jobs
  const jobsFilteredByFilters = jobs.filter(job => {
      return(
        (filters.schedule === "" || job.data.schedule === filters.schedule) &&
        (filters.level === "" || job.data.level === filters.level) &&
        (filters.modality === "" || job.data.modality === filters.modality) &&
        (filters.range === "" || job.data.range === filters.range) &&
        (filters.tech === "" || job.data.tech.includes(filters.tech))
      )
  })

  //Aplicamos filtro SEARCH a los jobs ya filtrados por el select
  const jobsWithTextFilter = textToFilter === "" ? jobsFilteredByFilters : jobsFilteredByFilters.filter(job => {
    return job.titulo.toLocaleLowerCase().includes(textToFilter.toLocaleLowerCase())
  })

  //Las totalPages van en función a los trabajos filtrados o no
  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);

  const handlePageChange = (page) =>{
        setCurrentPage(page)
  }

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters(initialFilters)
    setTextToFilter("")
    console.log(textToFilter)
    console.log("filtros cleared")
  }

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-8">
       <SearchFormSection textValue={textToFilter} onChangeSelect={handleSelectChange} clearFilters={clearFilters} opciones={opciones} onSearch={handleSearch} onTextFilter={handleTextFilter} />
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          <section className="jobs-listings col-span-12 flex flex-col gap-6">

            <JobsList page={currentPage} totalPages={totalPages} jobs={jobsWithTextFilter} resultsPerPage={RESULTS_PER_PAGE} />
           
          </section>
          <Pagination onPageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage}/>
        </div>
      </main>
      <Footer text="© 2025 DevJobs. Todos los derechos reservados." />
    </>
  )
}

export default App
