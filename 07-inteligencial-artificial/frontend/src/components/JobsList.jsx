import { JobCard } from "../components/JobCard"

export function JobsList({jobs, totalPages }) {

  return (
    <>
      {(totalPages === 0) ? 
            <p>No se han encontrado empleos.</p> : 
            jobs.map((job) => (
              <JobCard key={job.id} job={job}/>
            ))
      }
    </>
  )
}