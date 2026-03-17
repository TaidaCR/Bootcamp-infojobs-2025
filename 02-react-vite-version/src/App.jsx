//como renderizar una lista de elementos/componentes para mostrarlos en la UI?
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"
import { SearchPage } from "../pages/Search.jsx"
import {HomePage} from "../pages/Home.jsx"

import { Route } from "../components/Route.jsx";
import { NotFoundPage } from "../pages/404.jsx";
import { ApplyPage } from "../pages/Apply.jsx";

import jobs from '../src/data/data.json'

function App() {
//EJERCICIOS:
//2. Mejorar componente Link
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
