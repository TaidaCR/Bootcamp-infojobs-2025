import {useRouter} from '../hooks/useRouter.jsx'

export function Link({href, children, ...restOfProps}){
    const {navigateTo} = useRouter()

    const handleClick = (event) => {

        event.preventDefault()

        navigateTo(href)
    }

    return (
        <a href={href} {...restOfProps} className="text-primary hover:underline" onClick={handleClick}>
            {children}
        </a>
    )
}