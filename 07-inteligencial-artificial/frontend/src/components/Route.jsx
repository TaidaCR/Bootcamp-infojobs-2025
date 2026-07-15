import { useRouter } from '../hooks/useRouter';

export function Route({ path, component: Component, ...rest} ) {
//Si la ruta actual no coincide con la ruta del componente, no renderizamos nada
    const { currentPath } = useRouter();

    if(currentPath !== path) return null;
//Si la ruta actual coincide con la ruta del componente, renderizamos el componente
    return <Component {...rest}/>
}