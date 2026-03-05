export function ClearFilters({id, text, onClear}) {
    return(
        <button type="button" onClick={onClear} id={id} className="text-sm text-primary hover:text-primary-hover hover:underline hidden sm:block">{text}
        </button>
    )
}