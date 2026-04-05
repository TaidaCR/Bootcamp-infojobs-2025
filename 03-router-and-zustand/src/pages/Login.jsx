import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore.js";  
import { useId } from "react";
import { NavLink } from "react-router";

export default function LoginPage() {
    const { login } = useAuthStore()
    const navigate = useNavigate()

    const passwordId = useId()
    const emailId = useId()

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const email = formData.get(emailId)
        const password = formData.get(passwordId)

        if (email && password){
            login()
            navigate('/search')
        }
    }
    return (
        <main className="mw">
            <section className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="hidden lg:flex flex-col h-full min-h-[600px] rounded-lg overflow-hidden relative shadow-lg group">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Modern bright office workspace with glass walls and plants" >
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-10 text-white">
                        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/90 p-3 text-white backdrop-blur-sm">
                            <span className="material-symbols-outlined">verified_user</span>
                        </div>
                        <h1 className="text-4xl font-bold leading-tight mb-4">Tu próximo gran paso empieza aquí.</h1>
                        <p className="text-lg text-gray-200 font-medium max-w-md">Únete a millones de profesionales y empresas que construyen el futuro juntos.</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center w-full max-w-[480px] mx-auto lg:mx-0">
                    <div className="mb-8">
                        <h1 className="text-text-main dark:text-white text-4xl font-black leading-tight tracking-tight mb-3">
                            Bienvenido de nuevo
                        </h1>
                        <p className="text-text-muted dark:text-gray-400 text-base font-normal">
                            Ingresa tus credenciales para acceder a tu cuenta.
                        </p>
                    </div>
                    <form action="#" className="flex flex-col gap-6" onsubmit="event.preventDefault();">
                        <label className="flex flex-col gap-2">
                            <span className="text-text-main dark:text-gray-200 text-sm font-semibold pl-1">Email o Usuario</span>
                            <div className="relative flex items-center">
                                <span className="material-symbols-outlined absolute left-4 text-text-muted">mail</span>
                                <input className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-white/5 border border-transparent focus:border-primary focus:ring-0 rounded-xl text-text-main dark:text-white placeholder-text-muted/70 text-base transition-all" placeholder="ejemplo@correo.com" type="email" />
                            </div>
                        </label>
                        <label className="flex flex-col gap-2">
                            <div className="flex justify-between items-center pl-1 pr-1">
                                <span className="text-text-main dark:text-gray-200 text-sm font-semibold">Contraseña</span>
                                <a className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline" href="#">¿Olvidaste tu contraseña?</a>
                            </div>
                            <div className="relative flex items-center group">
                                <span className="material-symbols-outlined absolute left-4 text-text-muted">lock</span>
                                <input className="w-full h-14 pl-12 pr-12 bg-slate-50 dark:bg-white/5 border border-transparent focus:border-primary focus:ring-0 rounded-xl text-text-main dark:text-white placeholder-text-muted/70 text-base transition-all" placeholder="••••••••" type="password" />
                                <button className="absolute right-4 text-text-muted hover:text-text-main dark:hover:text-white flex items-center justify-center" type="button">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                            </div>
                        </label>
                        <div className="flex flex-col gap-4 pt-2">
                            <button onClick={handleSubmit} className="w-full h-14 bg-primary hover:bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg shadow-primary/20 transition-transform active:scale-[0.98] flex items-center justify-center gap-2" type="submit">
                                <span>Iniciar Sesión</span>
                                <span className="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
                            </button>
                            <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">o continúa con</span>
                                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="h-12 flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 transition-colors" type="button">
                                    <img alt="Google" className="w-5 h-5" data-alt="Google Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeer5rvNVKwcE9fZnU3o7_u1uRqrsauKNWKqypO_nnsXr_R2X8Qq6Cfic--FcxCxi_zmAjCEF6QYCB5npmDye7sfjuCAdMOzguuTzvhurkV8-tR4dipbS2joVYddIt4lvKAXPDR3waMwha5hqvU0pc1GPpJuJ0c3a3INcT3dyERG1BdbsWQN5hu8GDwut_UI8xcvZWOVkjbsAqRDd_Pdd5awc0SdunDt2HTGJ9UJ1B7f06iE4lNl4k1ghFxFQqtpQqxdtLktxsOVg" />
                                    <span className="text-sm font-semibold dark:text-white">Google</span>
                                </button>
                                <button className="h-12 flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 transition-colors" type="button">
                                    <img alt="LinkedIn" className="w-5 h-5" data-alt="LinkedIn Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZHM_47rA9rixNlufqAM3GtR1sFbs9ndPNqPlfAZYC5FC2bYnaKbs5mmK1HA1ySYaGY0mClbG1h-Iz6Yp5lY7CDaKFRhhwSnLyMXjQUtS7MEn2KnfHN_6dlFGsJx8OvwWFZsPMddSmuaK8oFND7TERAW3FpQPpHF75wG3TkhCteHZXOpSV3GilJS6GInohX1FJMA9GW2i9EfI42DnC4we0nAMs89aom-SqIn9AhFRNq0OrjWydQsy0QOquIqOFRLNBTfHPFLLUV-Y" />
                                    <span className="text-sm font-semibold dark:text-white">LinkedIn</span>
                                </button>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-text-main dark:text-gray-300 text-sm">
                                ¿No tienes una cuenta?
                                <NavLink to="/register" className="text-primary font-bold hover:underline ml-1" href="#">Crear cuenta</NavLink>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}