import {useEffect, useState} from 'react'

//hook personalizado para manejar el path actual y navegar sin recargar la página, actualizando el estado del path actual
export function useRouter(){
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener("popstate", handleLocationChange)

        return() => {
        window.removeEventListener("popstate", handleLocationChange)
        }
    }, []) 

    //usado en Link.jsx para cambiar el path al hacer click en un Link sin recargar la página
    function navigateTo(path){
        window.history.pushState({}, '', path)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return {currentPath, navigateTo}
}