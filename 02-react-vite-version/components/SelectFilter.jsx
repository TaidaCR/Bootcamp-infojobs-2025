export function SelectFilter({name, labelText, values, id, onChangeSelect, filterValue}) {
    return (
        <div className="flex items-center gap-2">
            <label className="sr-only text-slate-500 text-sm" htmlFor={id}>{labelText}</label>
            <div className="relative">
                <select defaultValue="" name={name} onChange={onChangeSelect} value={filterValue}
                    className="appearance-none bg-white border border-slate-300 text-slate-700 text-sm rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-primary cursor-pointer hover:border-primary transition-colors"
                    id={id}>
                    <option value="">{labelText}</option>
                    {
                        values.map((value, index) => (
                            <option key={index} value={value}>{value}</option> 
                        ))
                    }
                </select>
                <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none material-symbols-outlined text-lg">expand_more</span>
            </div>
        </div>
    )
}

