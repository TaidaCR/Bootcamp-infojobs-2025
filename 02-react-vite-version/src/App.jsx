//como renderizar una lista de elementos/componentes para mostrarlos en la UI?
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"
import { SearchPage } from "../pages/Search.jsx"
import { HomePage } from "../pages/Home.jsx"

import { Route } from "../components/Route.jsx";
import { NotFoundPage } from "../pages/404.jsx";
import { ApplyPage } from "../pages/Apply.jsx";

import { useEffect, useState } from "react";

const useJobs = () => {
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    async function fetchJobs() {
      try {


        const response = await fetch('https://jscamp-api.vercel.app/api/jobs')
        const json = await response.json()

        setJobs(json.data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }

    fetchJobs()
  }, [])

  return { jobs }
}


function App() {

  const { jobs } = useJobs()

  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/404" component={NotFoundPage} />
      {jobs.map(job => (
        <Route
          key={job.id}
          path={`/apply/${job.id}`}
          component={ApplyPage}
          job={job}

        />
      ))
      }
      <Footer text="© 2025 DevJobs. Todos los derechos reservados." />
    </>
  )
}

export default App
