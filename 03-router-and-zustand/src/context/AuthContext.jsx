import { createContext, useContext, useState } from "react";

//Prop drilling (uno o dos niveles) vs context API (más niveles, estados que no cambien mucho, EJEMPLO: inicio/cierre sesión,, cambio idioma, para el resto: zustand)

//Esto se hace para que no haya que pasar las props por todos los componentes
//Primero creamos el contexto. Exportamos el contexto para poder consumirlo. 
export const AuthContext = createContext()

//Lo añadimo en main.jsx, en header y en Details
//Proveedor. Componente que envuelve la parte de la app que nos provee los valores que queremos leer
export function AuthProvider({ children }){
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  const value={
    isLoggedIn,
    login,
    logout
  }


  return <AuthContext value={value}>{children}</AuthContext>
}

//custom hook para no tener que importar todo el tiempo tantas cosas como useContext, Auth...
export function useAuth(){
    //Nueva utilidad: se puede usar tambien use, se importa arriba y se pone aqui
    const context = useContext(AuthContext)

    //Validación para asegurarnos de que el hook se usa dentro del proveedor. Si alguien intenta usar el hook sin envolver su componente en el proveedor, lanzamos un error para avisarle.
    if (context === undefined) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider")
    }

    return context
}



//Consumidor