//como renderizar una lista de elementos/componentes para mostrarlos en la UI?
import opciones from '../src/data/filtros.json'
import jobs from '../src/data/data.json'
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

export function SearchPage() {
  const RESULTS_PER_PAGE = 5;

  //hooks para manejar estado de filtros, texto a filtrar y paginación
  const [filters, setFilters] = useState(initialFilters)
  // const [textToFilter, setTextToFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

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
  const jobsWithTextFilter = filters.search === "" ? jobsFilteredByFilters : jobsFilteredByFilters.filter(job => {
    return job.titulo.toLocaleLowerCase().includes(filters.search.toLocaleLowerCase())
  })

  //Las totalPages van en función a los trabajos filtrados o no
  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);

  const handlePageChange = (page) =>{
        setCurrentPage(page)
  }

  //Establece filtros y el texto a filtrar
  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  //Limpiar filtros
  const clearFilters = () => {
    setFilters(initialFilters)
    console.log("filtros cleared")
  }

  return (
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-8">
       <SearchFormSection textValue={filters.search} clearFilters={clearFilters} opciones={opciones} onSearch={handleSearch}/>
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          <section className="jobs-listings col-span-12 flex flex-col gap-6">

            <JobsList page={currentPage} totalPages={totalPages} jobs={jobsWithTextFilter} resultsPerPage={RESULTS_PER_PAGE} />
           
          </section>
          <Pagination onPageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage}/>
        </div>
      </main>
  )
}

