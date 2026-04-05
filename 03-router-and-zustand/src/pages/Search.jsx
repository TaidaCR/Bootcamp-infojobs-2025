//como renderizar una lista de elementos/componentes para mostrarlos en la UI?
import { JobsList } from "../components/JobsList.jsx"
import { Pagination } from "../components/Pagination.jsx"
import { useState, useEffect } from "react";
import { SearchFormSection } from "../components/SearchFormSection.jsx"
import { SearchTitle } from "../components/SearchTitle.jsx";
import opciones from '../data/filtros.json'
// import { useRouter } from "../hooks/useRouter.jsx";
import { useSearchParams } from "react-router";

const initialFilters = {
  technology: "",
  modalidad: "",
  nivel: ""
}

const RESULTS_PER_PAGE = 4;

//custom hook. Saco la lógica de la app y return de todo lo qe necesito en mi componente
const useFilters = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  //hook de react para manejar estado de filtros, texto a filtrar y paginación
  const [filters, setFilters] = useState(() => {

    return {
      technology: searchParams.get('technology') || "",
      modalidad: searchParams.get('type') || "",
      nivel: searchParams.get('level') || ""
    }
  })

  const [textToFilter, setTextToFilter] = useState(() => searchParams.get('text') || "")

  const [currentPage, setCurrentPage] = useState(() => {

    const page = searchParams.get('page')
    //añadir aqui valicación de que es un numero o de no negativos
    return page ? Number(page) : 1
  })

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true)
  // const { navigateTo } = useRouter()

  // const botonFiltros = document.getElementById("clearFilters");
  //Efecto, coge los jobs de la api y filtra
  useEffect(() => {

    async function fetchJobs() {
      
      try {
        const params = new URLSearchParams()

        setLoading(true)
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.modalidad) params.append('type', filters.modalidad)
        if (filters.nivel) params.append('level', filters.nivel)
        // // if (currentPage > 1) params.append('page', currentPage)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE

        //limit: resultados por página
        params.append('limit', RESULTS_PER_PAGE)
        //offset: cuantos resultados te quieres saltar
        params.append('offset', offset)
        const queryParams = params.toString();
        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()

        setJobs(json.data)

        setTotal(json.total)
        console.log(response)
        console.log(filters)
        console.log("URL de prueba:", `https://jscamp-api.vercel.app/api/jobs?${queryParams}`);
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [filters, currentPage, textToFilter])


  //Efecto para actualizar la URL cada vez que cambian los filtros, el texto a filtrar o la página actual. 
  // De esta forma, si el usuario copia la URL o la comparte, se mantendrán los filtros y la página actual.
  useEffect(() => {
    setSearchParams(() => {

      const params = new URLSearchParams()

      if (textToFilter) params.set('text', textToFilter)
      if (filters.technology) params.set('technology', filters.technology)
      if (filters.modalidad) params.set('type', filters.modalidad)
      if (filters.nivel) params.set('level', filters.nivel)
      if (currentPage > 1) params.set('page', currentPage)

      return params
    })
  }, [filters, currentPage, textToFilter, setSearchParams])

  //Las totalPages van en función a los trabajos filtrados o no
  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);
  var isFiltered = JSON.stringify(initialFilters) !== JSON.stringify(filters)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  //Establece filtros y el texto a filtrar
  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  //Limpiar filtros
  const clearFilters = () => {
    setFilters(initialFilters)
  }

  return {
    loading,
    jobs,
    total,
    filters,
    totalPages,
    currentPage,
    handleSearch,
    clearFilters,
    handlePageChange,
    isFiltered,
    handleTextFilter,
    textToFilter
  }
}

//COMPONENTE
export default function SearchPage() {
  //extraigo el custom hook creado anteriormente
  const {
    loading,
    jobs,
    total,
    filters,
    totalPages,
    currentPage,
    handleSearch,
    clearFilters,
    handlePageChange,
    isFiltered,
    handleTextFilter,
    textToFilter } = useFilters()

  //Si no se le pasa nada se renderiza cada vez que se renderiza el componente, si se le pasa un estado o prop, se renderiza cada vez que ese estado o prop cambie
  //Para fetching de datos, suscripciones
  //Si el parámetro está vacío se ejecuta una sola vez
  // useEffect(() => {
  //   document.title = `Resultados: ${total} - Página: ${currentPage}`
  // }, [total, currentPage])

  const title = `Resultados: ${total} - Página: ${currentPage}`;

  return (
    <main className="mw">
      <title>{title}</title>
      <meta name="description" content="Web de búsqueda de empleos del sector IT"></meta>
      <SearchFormSection initialText={textToFilter} textValue={textToFilter} filters={filters} clearFilters={clearFilters} onTextFilter={handleTextFilter} onSearch={handleSearch} opciones={opciones} isFiltered={isFiltered} />
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        <section className="jobs-listings col-span-12 flex flex-col gap-6">
          <SearchTitle id="titulo-busqueda" texth1="Todos los empleos" textp={`Mostrando ${total} empleos`} />

          {loading ? "Cargando empleos" : <JobsList page={currentPage} totalPages={totalPages} total={total} jobs={jobs} resultsPerPage={RESULTS_PER_PAGE} />}

        </section>
        <Pagination onPageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage} />
      </div>
    </main>
  )
}

