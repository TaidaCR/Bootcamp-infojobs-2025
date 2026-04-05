import styles from "./Header.module.css"
import { NavLink } from "react-router";
// import { useAuth } from "../context/AuthContext.jsx";
import { useAuthStore } from "../store/authStore.js";
import { useFavouritesStore } from "../store/favouritesStore.js";

export function Header() {
    const { isLoggedIn } = useAuthStore()
    const {countFavourites} = useFavouritesStore()

    const numberOfFavourites = countFavourites()
    return(
<header>
       
            <div className="flex items-center gap-4 text-slate-800">
                <div className="size-8 text-primary">
                    <span className="material-symbols-outlined text-3xl">work_outline</span>
                </div>
              
                <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">DevJobs</h2>

            </div>
            <nav className="navigation-bar">
                <NavLink className={({isActive}) => `${styles.link} ${isActive ? styles.active : ''}`} to="/">Home</NavLink>
                {isLoggedIn && (
                <NavLink className={({isActive}) => `${styles.link} ${isActive ? styles.active : ''}`} to="/Profile">Perfil</NavLink>
                )
                    }
                <NavLink className={({isActive}) => `${styles.link} ${isActive ? styles.active : ''}`}   to="/search">Buscar Empleos</NavLink>
                {
                    isLoggedIn && (
                    <NavLink 
                        className={({isActive}) => `${styles.link} ${isActive ? styles.active : ''}`}   to="/profile">
                            Favoritos {numberOfFavourites}</NavLink>

                    )
                }
            </nav>
            
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-600 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                </button>
                
                <div>
                    <devjobs-avatar service="github" username="taidacr" size="24"></devjobs-avatar>
                    <devjobs-avatar service="google" username="taidacr" size="32"></devjobs-avatar>
                </div>

                <UserButton/>
            </div>
    
    </header>
    )
      
}

//Antes al hacer click renderizaba el header entero,
//al separarlo renderiza solo en botón porque meto el useContext dentro del componente del botón, no en el header entero. DEBERIA, SE HACE CON ZUSTAND
function UserButton() {
//   const { isLoggedIn, login, logout } = useAuth()
  const { isLoggedIn, login, logout } = useAuthStore()
  const {clearFavourites} = useFavouritesStore()

  const handleLogOut = () => {
    logout()
    clearFavourites()
  }

  return isLoggedIn ? (
    <button className="bg-primary py-1 px-4 rounded-full" onClick={handleLogOut}>Cerrar sesión</button>
  ) : (
    <button className="bg-primary py-1 px-4 rounded-full" onClick={login}>Iniciar sesión</button>
  )
}