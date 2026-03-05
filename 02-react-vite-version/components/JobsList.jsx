import { JobCard } from "../components/JobCard"
import { SearchTitle } from "../components/SearchTitle.jsx"

export function JobsList({ page, jobs, resultsPerPage, totalPages }) {
  page--;
  const start = resultsPerPage * page;
  const end = start + resultsPerPage;
  const paginatedJobs = jobs.slice(start, end);

  return (
    <>
      <SearchTitle id="titulo-busqueda" texth1="Todos los empleos" textp={`Mostrando ${start+1}-${end} de ${jobs.length} empleos`} />

      {(totalPages === 0) ? 
            <p>No se han encontrado empleos.</p> : 
            paginatedJobs.map((job, index) => (
              <JobCard key={index} data={job.data} empresa={job.empresa} titulo={job.titulo} urlImg={job.urlImg} />
            ))
      }
    </>
  )
}