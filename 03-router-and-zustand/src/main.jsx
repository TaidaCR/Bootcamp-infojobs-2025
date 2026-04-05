import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { AuthProvider } from '../context/AuthContext.jsx'
// import { FavouritesProvider } from '../context/FavContext.jsx'


//PUNTO DE ENTRADA DE LA APLICACION
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* //Con el AuthProvider envolvemos toda la app y todos los componentes pueden acceder al contexto
  //Comentado al usar zustand reemplazamos esto */}
    {/* <AuthProvider> */}
        <App />
    {/* </AuthProvider> */}
  </BrowserRouter>

)
