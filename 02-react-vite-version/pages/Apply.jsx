import { InputField } from "../components/InputField";
import { useState } from "react";
import { useEffect } from "react";

export function ApplyPage({job}) {
const [applied, setApplied] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setApplied(true);
        alert(`¡Has aplicado al puesto de ${job.titulo} en ${job.empresa}!`)
    }

    useEffect(() =>{

        document.title = job.titulo;
      
    },[job.titulo]);

    const buttonClass = applied ? "button-apply-job isApplied" : "button-apply-job"
    const applyButtonText = applied ? "Empleo solicitado" : "Enviar mi solicitud";

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="space-y-2">
                        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                            <a className="hover:text-primary" href="#">Empleos</a>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <a className="hover:text-primary" href="#">Tecnología</a>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <span className="text-primary font-medium">Aplicar</span>
                        </nav>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{job.titulo}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px] text-primary">corporate_fare</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-100">{job.empresa}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                <span>{job.ubicacion}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px]">schedule</span>
                                <span>Publicado hace 2 días</span>
                            </div>
                        </div>
                        <p>{job.descripcion}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">bookmark</span>
                            Guardar
                        </button>
                        <button className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                            Compartir oferta
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">edit_note</span>
                            </span>
                            Formulario de Aplicación
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField labelName="Nombre completo" placeholder="Alex Martínez" required={true}/>
                            <InputField labelName="Correo electrónico" placeholder="alex@ejemplo.com" type="email" required={true}/>
                            <InputField labelName="Teléfono (opcional)" placeholder="+34 000 000 000" type="tel"/>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mensaje de presentación</label>
                                <textarea className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none" placeholder="Cuéntanos por qué eres el candidato ideal para este puesto..." rows="5"></textarea>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Currículum Vitae (PDF)</label>
                                <div className="relative group">
                                    <div className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center bg-slate-50/50 dark:bg-slate-800/50 group-hover:border-primary transition-colors cursor-pointer">
                                        <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" />
                                        <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary mb-2">cloud_upload</span>
                                        <p className="text-slate-600 dark:text-slate-400 font-medium">Arrastra tu archivo aquí o <span className="text-primary">selecciónalo</span></p>
                                        <p className="text-xs text-slate-500 mt-1">Soporta PDF, DOCX (Máx. 5MB)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2 pt-4">
                                <button className={buttonClass} type="submit">
                                    {applyButtonText}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>

                <aside className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="h-40 bg-slate-200 relative">
                            <div className="absolute inset-0 bg-slate-300" data-alt="Mapa de la ubicación de la oficina en Madrid" data-location="Madrid"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                Ubicación
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                dirección completa
                            </p>
                        </div>
                    </div>


                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">redeem</span>
                            Beneficios de la empresa
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0 size-5 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Trabajo Flexible</p>
                                    <p className="text-xs text-slate-500">Modelo híbrido (3 días en casa)</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0 size-5 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Seguro Médico</p>
                                    <p className="text-xs text-slate-500">Cobertura premium 100% pagada</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0 size-5 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Formación Continua</p>
                                    <p className="text-xs text-slate-500">Presupuesto anual de 1500€ para cursos</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0 size-5 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Eventos de Equipo</p>
                                    <p className="text-xs text-slate-500">Off-sites trimestrales y actividades</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-primary p-6 rounded-xl text-white shadow-lg shadow-primary/20">
                        <p className="text-primary-foreground/80 text-sm font-medium mb-1">Candidatos inscritos</p>
                        <div className="text-3xl font-black mb-4">45 aplicantes</div>
                        <div className="w-full bg-white/20 h-2 rounded-full mb-4">
                            <div className="bg-white h-full rounded-full w-2/3"></div>
                        </div>
                        <p className="text-xs opacity-80 leading-tight">Tu perfil coincide con el 85% de los requisitos solicitados por la empresa.</p>
                    </div>
                </aside>
            </div>
        </main>
    )
}