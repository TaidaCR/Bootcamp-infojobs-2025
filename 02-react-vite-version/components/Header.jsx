export function Header(){
    return(
<header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 lg:px-10 py-3">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
            <div className="flex items-center gap-4 text-slate-800">
                <div className="size-8 text-primary">
                    <span className="material-symbols-outlined text-3xl">work_outline</span>
                </div>
                <a href="/">
                <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">DevJobs</h2>

                </a>
            </div>
            <nav className="hidden md:flex flex-1 justify-center gap-8">
                <a className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal"
                    href="/search">Buscar Empleos</a>
                <a className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal"
                    href="#">Empresas</a>
                <a className="text-slate-600 hover:text-primary transition-colors text-sm font-medium leading-normal"
                    href="#">Salarios</a>
            </nav>
            
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-600 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                </button>
                
                <div>
                    <devjobs-avatar service="github" username="taidacr" size="24"></devjobs-avatar>
                    <devjobs-avatar service="google" username="taidacr" size="32"></devjobs-avatar>
                </div>
            </div>
        </div>
    </header>
    )
      
}