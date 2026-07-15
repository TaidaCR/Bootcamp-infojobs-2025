//como renderizar una lista de elementos/componentes para mostrarlos en la UI?
import {lazy, Suspense} from "react";
import { Routes, Route } from 'react-router'
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

const HomePage = lazy(() => import("./pages/Home.jsx"))
const SearchPage = lazy(() => import("./pages/Search.jsx"))
const DetailsPage = lazy(() => import("./pages/Details.jsx"))
const NotFoundPage = lazy(() => import("./pages/404.jsx")) 
const ProfilePage = lazy(() => import("./pages/Profile.jsx"))
const LoginPage = lazy(() => import("./pages/Login.jsx"))
const RegisterPage = lazy(() => import("./pages/Register.jsx"))

function App() {
  // const { jobs } = useJobs()

  return (
    <>
      <Header/>
      {/* Poner velocidad 3G para probar el fallback del suspense */}
      <Suspense fallback={<p>CARGANDO...</p>}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/jobs/:id" element={<DetailsPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
        } />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      </Suspense>

      <Footer text="© 2025 DevJobs. Todos los derechos reservados." />
    </>
  )
}

export default App
