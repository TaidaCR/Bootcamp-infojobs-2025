export function SearchFilter({name, id, icon, placeholder, handleTextChanges, value}) {
    return (
        <div className="search-filter">
            <span className="material-symbols-outlined">{icon}</span>
            <input id={id} name={name} value={value}
                className="w-full bg-slate-50 text-slate-900 rounded-full border border-slate-200 pl-12 pr-4 h-14 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 transition-all"
                placeholder={placeholder} defaultValue="" onChange={handleTextChanges}/>
            {/* <button type="submit">Buscar</button> */}
        </div>
    )

}