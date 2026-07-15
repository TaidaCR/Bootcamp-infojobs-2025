export function SearchTitle({ id, texth1, textp }) {
    return (
            <div>
                <h1 id={id} className="text-2xl font-bold text-slate-900">{texth1}</h1>
                <p className="text-slate-500 text-sm mt-1">{textp}</p>
            </div>
    )
}