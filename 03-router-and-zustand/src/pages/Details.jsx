import { useParams } from "react-router";
import { useState, useEffect} from "react";
import { Link } from "../components/Link.jsx"
import { NavLink } from "react-router";
import snarkdown from "snarkdown";
import styles from "./Details.module.css"
// import { useAuth } from "../context/AuthContext.jsx";
import { useAuthStore } from "../store/authStore.js";
import { useFavouritesStore } from "../store/favouritesStore.js";

//1. EJERCICIO: MEJORAR ESTILOS
//2. pasar componentes a otros archivos

//PROPDRILLING: pasar una prop de un componente a otro hijo y asi sucesivamente hasta llegar al componente que lo necesita. 
function JobSection({ title, content }) {
    const html = snarkdown(content)

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: html }}
            />
        </section>
    )
}

function DetailFavouriteButton({jobId}){
    const { isLoggedIn } = useAuthStore()
    const {isFavourite, toggleFavourite} = useFavouritesStore()

    return(
        isLoggedIn && ( 
        <button className="text-slate-400 hover:text-primary transition-colors material-symbols-outlined" onClick={ () => toggleFavourite(jobId)}>
            {isFavourite(jobId) ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#b73434"/> </g>
                </svg>
                 : 
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#7c3131">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#ffffff"/> </g>
                </svg>
            }
        </button>)
            
    )
}

function DetailsPageBreadcrumb({ job }) {
    return (
        <nav className={styles.breadcrumb}>
            <NavLink to="/" className={({ isActive }) => `${styles.breadcrumbLink} ${isActive ? styles.bcActive : ''}`} >
                Home
            </NavLink>
            <span className={styles.breadcrumbSeparator}>/</span>
            <NavLink to="/search" className={({ isActive }) => `${styles.breadcrumbLink} ${isActive ? styles.bcActive : ''}`} >
                Empleos
            </NavLink>
            <span className={styles.breadcrumbSeparator}>/</span>
            <NavLink to={`/jobs/${job.id}`} className={({ isActive }) => `${styles.breadcrumbLink} ${isActive ? styles.bcActive : ''}`}>{job.titulo}</NavLink>
        </nav>
    )
}

function DetailsPageHeader({ job}) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{job.titulo}</h1>
            <div className={styles.meta}>
                <p className={styles.company}>{job.empresa}</p>
                <p className={styles.location}>{job.ubicacion}</p>
            </div>
            <DetailsApplyButton jobId={job.id}/>
        </header>
    )
}

function DetailsApplyButton({jobId}) {
    const { isLoggedIn } = useAuthStore()

    return (
        <>
            <button className={styles.applyButton} disabled={!isLoggedIn}>{isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}</button>
            <DetailFavouriteButton jobId={jobId}/>
        </>
    )
}

export default function DetailsPage() {

    //el nombre del parámetro es el que está puesto en la ruta en app.jsx. Si pongo jobID, entonces aqui igual
    const { id } = useParams()

    //Navegación programática. Diferente a usar un Link, que es para navegación declarativa, esto es para navegar desde código, por ejemplo al hacer click en un botón o al detectar un error. En este caso lo usaremos para el botón de volver a la lista de empleos cuando no se encuentra la oferta.
    // const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Job not found')
                return response.json()
            //Aqui va navigate para que lleve a la pagina error????
            })
            .then(json => {
                setJob(json)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <div className={styles.loading}>
                <p>Cargando oferta...</p>
                {/* aquí puedes pegar el HTML de skeleton que ya tienes preparado */}
            </div>
        )
    }

    if (error || !job) {
        return (
            <div className={styles.notFound}>
                <h1>Oferta no encontrada</h1>
                <p>Puede que esta oferta haya caducado o que la URL no sea correcta.</p>
                <Link className={styles.backButton} href="/search">
                    Volver a la lista de empleos
                </Link>
            </div>
        )
    }


    return (
        <main className={styles.container}>
            <DetailsPageBreadcrumb job={job}/>
            <DetailsPageHeader job={job}/>
            <JobSection title="Descripción del puesto" content={job.content.description} />
            <JobSection title="Requisitos" content={job.content.requirements} />
            <JobSection title="Responsabilidades" content={job.content.responsibilities} />
            <JobSection title="Sobre la empresa" content={job.content.about} />
        </main>
    )
}