//como renderizar una lista de elementos/componentes para mostrarlos en la UI?
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"
import { SearchPage } from "../pages/Search.jsx"
import {HomePage} from "../pages/Home.jsx"
import { NotFoundPage } from "../pages/404.jsx";

import {useEffect, useState} from 'react'


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  let page=null;

  if (currentPath === "/"){
    page = <HomePage/>
  } else if (currentPath === "/search"){
    page= <SearchPage/>
  } else{
    page=<NotFoundPage/>
  }

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
   window.addEventListener("popstate", handleLocationChange)
    return() => {
      window.removeEventListener("popstate", handleLocationChange)
    }
  }, []) 

  return (
    <>
      <Header />
      {page}
      <Footer text="© 2025 DevJobs. Todos los derechos reservados." />
    </>
  )
}

export default App
