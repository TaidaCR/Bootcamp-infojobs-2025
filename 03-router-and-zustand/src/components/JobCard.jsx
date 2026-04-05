import { Link } from "./Link.jsx";
import styles from "./JobCard.module.css"
import { useFavouritesStore } from "../store/favouritesStore.js";
import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";
//Al sacarlo del componente JobCard solo renderiza este botón cuando se hace click, no todo el JobCard
export function JobCardFavouriteButton({jobId}) {
    //Con esto nos suscribimos a TODA la store
    const { isFavourite, toggleFavourite } = useFavouritesStore()
    const {isLoggedIn} = useAuthStore()
    return(
         <button disabled={!isLoggedIn} className="text-slate-400 hover:text-primary transition-colors material-symbols-outlined" onClick={ () => toggleFavourite(jobId)}>
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
        </button>
    )
}

function JobCardApplyButton(){
    const [isApplied, setIsApplied] = useState(false)
    const {isLoggedIn} = useAuthStore()

    const handleApplyClick = () => {
        setIsApplied(true)
    }

    return(
        <button disabled={!isLoggedIn} onClick={handleApplyClick}>
            {isApplied ? 'Aplicado' : 'Aplicar'}
        </button>
    )
}

export function JobCard({job})  {
    return (
                <article className="job modality schedule level range tech group relative flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-white border border-slate-200 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-blue-500/5"
                    data-modalidad={job.data?.modalidad}
                    data-nivel={job.data?.nivel}
                    data-technology={job.data?.technology.join(" ")}>
                    
                    <div className="absolute top-4 right-4">
                       <JobCardFavouriteButton jobId={job.id}/>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="size-16 rounded-xl bg-white border border-slate-100 p-2 flex items-center justify-center overflow-hidden">
                            <img alt="Company Logo" className="w-full h-full object-contain" src="#"/>
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                                    {job.titulo}
                                </h3>
                                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-100">
                                    Nuevo
                                </span>
                            </div>
                            <p className="text-slate-600 font-medium text-justify">{job.empresa}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                <span className="material-symbols-outlined text-base">schedule</span> {job.data.modalidad}
                            </span>
                            <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                <span className="material-symbols-outlined text-base">attach_money</span> {job.data.nivel}
                            </span>
                            <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                <span className="material-symbols-outlined text-base">code</span> {job.data.technology.join(" ")}
                            </span>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end justify-between">
                        <div className="h-6"></div>
                        <Link className={styles.detailsBtn} href={`/jobs/${job.id}`}>Ver detalles</Link>
                    <JobCardApplyButton/>

                    </div>
                </article>
            )
}