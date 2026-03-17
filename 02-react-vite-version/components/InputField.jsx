export function InputField({ labelName, placeholder, type = "text", required = false }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{labelName}</label>
            <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" placeholder={placeholder} type={type} required={required}/>
        </div>
    )

}