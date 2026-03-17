import { Link } from "./Link.jsx";

export function JobCard({data, titulo, empresa, urlImg, idEmpleo})  {
    return (
                <a className="job modality schedule level range tech group relative flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-white border border-slate-200 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-blue-500/5"
                    data-modality={data?.modality}
                    data-range={data?.range}
                    data-level={data?.level}
                    data-schedule={data?.schedule}
                    data-tech={data?.tech.join(" ")}>
                    
                    <div className="absolute top-4 right-4">
                        <button className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">bookmark_border</span>
                        </button>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="size-16 rounded-xl bg-white border border-slate-100 p-2 flex items-center justify-center overflow-hidden">
                            <img alt="Company Logo" className="w-full h-full object-contain" src={urlImg} />
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                                    {titulo}
                                </h3>
                                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-100">
                                    Nuevo
                                </span>
                            </div>
                            <p className="text-slate-600 font-medium text-justify">{empresa}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                <span className="material-symbols-outlined text-base">schedule</span> {data.schedule}
                            </span>
                            <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                <span className="material-symbols-outlined text-base">attach_money</span> {data.range}
                            </span>
                            <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                <span className="material-symbols-outlined text-base">apartment</span> {data.modality}
                            </span>
                            <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                                <span className="material-symbols-outlined text-base">code</span> {data.tech.join(" ")}
                            </span>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end justify-between">
                        <div className="h-6"></div>
                        <Link href={`/apply/${idEmpleo}`}>APLICAR</Link>
                    </div>
                </a>
            )
}