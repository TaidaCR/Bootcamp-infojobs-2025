export function SearchFilter({name, id, icon, placeholder, handleTextChanges, inputRef, clearInput,defValue}) {
    return (
        <div className="search-filter">
            <span className="material-symbols-outlined">{icon}</span>
            <input ref={inputRef} id={id} name={name} type="text" defaultValue={defValue}
                className="w-full bg-slate-50 text-slate-900 rounded-full border border-slate-200 pl-12 pr-4 h-14 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 transition-all"
                placeholder={placeholder} onChange={handleTextChanges}/>
            <button onClick={clearInput} type="button">X</button>
        </div>
    )

}