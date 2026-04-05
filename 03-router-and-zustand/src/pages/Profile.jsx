import { useAuthStore } from "../store/authStore.js";

export default function ProfilePage() {

    const {logout} = useAuthStore()
    return (
        <main class="mw">
            {/* <aside className="hidden lg:flex flex-col w-72 sticky top-28 h-[calc(100vh-8rem)]">
                <div className="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm flex flex-col h-full border border-blue-100 dark:border-slate-700">
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-blue-100 dark:border-slate-700">
                        <div className="size-12 rounded-full bg-cover bg-center" data-alt="portrait of a professional woman smiling">
                        </div>
                        <div>
                            <h3 className="font-bold text-text-main dark:text-white leading-tight">Ana García</h3>
                            <p className="text-xs text-text-muted">Diseñadora UX/UI</p>
                        </div>
                    </div>
                    <nav className="flex-1 space-y-2">
                        <a className="flex items-center gap-3 px-4 py-3 rounded-full bg-primary/20 text-text-main dark:text-white font-medium transition-all shadow-sm" href="#">
                            <span className="material-symbols-outlined fill text-primary-dark dark:text-primary">person</span>
                            <span>Información Personal</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 rounded-full text-text-muted hover:bg-background-light dark:hover:bg-background-dark/50 hover:text-text-main dark:hover:text-white transition-all group" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">description</span>
                            <span>CV y Portafolio</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 rounded-full text-text-muted hover:bg-background-light dark:hover:bg-background-dark/50 hover:text-text-main dark:hover:text-white transition-all group" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">notifications</span>
                            <span>Notificaciones</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 rounded-full text-text-muted hover:bg-background-light dark:hover:bg-background-dark/50 hover:text-text-main dark:hover:text-white transition-all group" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">lock</span>
                            <span>Privacidad</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 rounded-full text-text-muted hover:bg-background-light dark:hover:bg-background-dark/50 hover:text-text-main dark:hover:text-white transition-all group" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">work_history</span>
                            <span>Mis Candidaturas</span>
                            <span className="ml-auto bg-primary text-[10px] font-bold px-2 py-0.5 rounded-full text-white">3</span>
                        </a>
                    </nav>
                    <button onClick={logout} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-colors w-full">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside> */}
            <div className="flex-1 flex flex-col gap-8 min-w-0">
                <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-2">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight text-text-main dark:text-white">Configuración del Perfil</h1>
                        <p className="text-text-muted text-lg">Gestiona tu información personal y preferencias</p>
                    </div>
                    <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-blue-100 dark:border-slate-700 w-full md:w-80">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-text-main dark:text-white">Perfil Completado</span>
                            <span className="text-sm font-bold text-primary">85%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full"></div>
                        </div>
                        <p className="text-xs text-text-muted mt-2">Completa tu biografía para llegar al 100%</p>
                    </div>
                </section>
                <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-blue-100 dark:border-slate-700 overflow-hidden">
                    <div className="p-8 border-b border-blue-100 dark:border-slate-700 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-text-main dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">face</span>
                            Información Básica
                        </h2>
                        <span className="text-sm text-text-muted italic">Última actualización: hace 2 días</span>
                    </div>
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-4 flex flex-col items-center gap-4">
                            <div className="relative group">
                                <div className="size-40 rounded-full bg-cover bg-center border-4 border-white dark:border-surface-dark shadow-lg" data-alt="portrait of a professional woman smiling">
                                </div>
                                <button className="absolute bottom-2 right-2 p-2 bg-primary hover:bg-primary-dark text-white rounded-full shadow-md transition-colors">
                                    <span className="material-symbols-outlined !text-[20px]">edit</span>
                                </button>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg dark:text-white">Foto de Perfil</h3>
                                <p className="text-sm text-text-muted mt-1">PNG o JPG, máx 5MB.</p>
                            </div>
                        </div>
                        <div className="lg:col-span-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-main dark:text-gray-200">Nombre</label>
                                    <input className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-background-light dark:bg-surface-dark px-4 py-3 focus:border-primary focus:ring-primary dark:text-white transition-shadow" type="text" value="Ana" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-main dark:text-gray-200">Apellidos</label>
                                    <input className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-background-light dark:bg-surface-dark px-4 py-3 focus:border-primary focus:ring-primary dark:text-white transition-shadow" type="text" value="García" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-text-main dark:text-gray-200">Titular Profesional</label>
                                <input className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-background-light dark:bg-surface-dark px-4 py-3 focus:border-primary focus:ring-primary dark:text-white transition-shadow" type="text" value="Diseñadora UX/UI Senior" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-main dark:text-gray-200">Correo Electrónico</label>
                                    <input className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-background-light dark:bg-surface-dark px-4 py-3 focus:border-primary focus:ring-primary dark:text-white transition-shadow" type="email" value="ana.garcia@email.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-main dark:text-gray-200">Teléfono</label>
                                    <input className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-background-light dark:bg-surface-dark px-4 py-3 focus:border-primary focus:ring-primary dark:text-white transition-shadow" type="tel" value="+34 600 000 000" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-text-main dark:text-gray-200">Ubicación</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-3.5 text-text-muted">location_on</span>
                                    <input className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-background-light dark:bg-surface-dark pl-12 pr-4 py-3 focus:border-primary focus:ring-primary dark:text-white transition-shadow" type="text" value="Madrid, España" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-text-main dark:text-gray-200">Sobre mí</label>
                                <textarea className="w-full rounded-2xl border-gray-200 dark:border-gray-700 bg-background-light dark:bg-surface-dark px-4 py-3 focus:border-primary focus:ring-primary dark:text-white resize-none transition-shadow" placeholder="Escribe una breve descripción sobre tu experiencia..." rows="4">Apasionada por crear experiencias digitales intuitivas y atractivas. Con más de 5 años de experiencia liderando equipos de diseño y colaborando con desarrolladores para lanzar productos exitosos.</textarea>
                                <div className="flex justify-end text-xs text-text-muted">Max. 500 caracteres</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-900 px-8 py-6 flex justify-end gap-4 border-t border-blue-100 dark:border-slate-700">
                        <button className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-text-main dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            Cancelar
                        </button>
                        <button className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined !text-[20px]">save</span>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-blue-100 dark:border-slate-700 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-text-main dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">notifications_active</span>
                            Preferencias de Notificación
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 rounded-xl bg-background-light dark:bg-slate-900 cursor-pointer group hover:border-primary/50 border border-transparent transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white dark:bg-surface-dark rounded-full text-primary shadow-sm">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div>
                                    <p className="font-medium text-text-main dark:text-white">Alertas de empleo por email</p>
                                    <p className="text-sm text-text-muted">Recibe las últimas ofertas que coinciden con tu perfil.</p>
                                </div>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input checked="" className="sr-only peer" type="checkbox" value="" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </div>
                        </label>
                        <label className="flex items-center justify-between p-4 rounded-xl bg-background-light dark:bg-slate-900 cursor-pointer group hover:border-primary/50 border border-transparent transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white dark:bg-surface-dark rounded-full text-primary shadow-sm">
                                    <span className="material-symbols-outlined">visibility</span>
                                </div>
                                <div>
                                    <p className="font-medium text-text-main dark:text-white">Perfil visible para reclutadores</p>
                                    <p className="text-sm text-text-muted">Permite que las empresas encuentren tu perfil.</p>
                                </div>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input checked="" className="sr-only peer" type="checkbox" value="" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-blue-100 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-blue-100 dark:border-slate-700 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-text-main dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">briefcase_meal</span>
                            Candidaturas Recientes
                        </h2>
                        <a className="text-sm font-medium text-primary hover:underline" href="#">Ver todas</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-slate-900 text-xs uppercase text-text-muted font-semibold">
                                <tr>
                                    <th className="px-6 py-4 rounded-tl-lg">Puesto</th>
                                    <th className="px-6 py-4">Empresa</th>
                                    <th className="px-6 py-4">Fecha</th>
                                    <th className="px-6 py-4 rounded-tr-lg">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                <tr className="hover:bg-background-light dark:hover:bg-background-dark/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-main dark:text-white">Product Designer</td>
                                    <td className="px-6 py-4 text-text-muted">TechSolutions Inc.</td>
                                    <td className="px-6 py-4 text-text-muted">20 Oct, 2023</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                            <span className="size-1.5 rounded-full bg-green-500"></span>
                                            En Proceso
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-background-light dark:hover:bg-background-dark/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-main dark:text-white">UX Researcher</td>
                                    <td className="px-6 py-4 text-text-muted">Global Media</td>
                                    <td className="px-6 py-4 text-text-muted">15 Oct, 2023</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                            <span className="size-1.5 rounded-full bg-blue-500"></span>
                                            Entrevista
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-background-light dark:hover:bg-background-dark/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-main dark:text-white">Senior UI Designer</td>
                                    <td className="px-6 py-4 text-text-muted">Creative Studio</td>
                                    <td className="px-6 py-4 text-text-muted">10 Oct, 2023</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                            <span className="size-1.5 rounded-full bg-gray-500"></span>
                                            Enviada
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                  <button onClick={logout} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-colors w-full">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
            </div>
        </main>
    )
}