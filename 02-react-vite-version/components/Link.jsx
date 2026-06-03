import {useRouter} from '../hooks/useRouter.jsx'

export function Link({href, children, className, ...restOfProps}){
    const {currentPath, navigateTo} = useRouter()
    const isActive = currentPath === href;

    const handleClick = (event) => {

        event.preventDefault();

        navigateTo(href)
    }

    return (
        <a href={href} {...restOfProps} className={className || (isActive ? "text-primary hover:underline active" : "text-primary hover:underline")}  onClick={handleClick}>
            {children}
        </a>
    )
}