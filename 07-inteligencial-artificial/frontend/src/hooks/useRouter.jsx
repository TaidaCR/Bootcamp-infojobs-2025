import { useNavigate, useLocation } from 'react-router';

//hook personalizado para manejar el path actual y navegar sin recargar la página, actualizando el estado del path actual
export function useRouter(){
    //hook de react router: nos permite navegar
    const navigate = useNavigate()
    //hook de react router: nos devuelve la localización actual de la url
    const location = useLocation()

    function navigateTo(path){
        navigate(path)
    }

    return {currentPath: location.pathname,
            navigateTo}
}