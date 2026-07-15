import { SearchFilter } from "../components/SearchFilter.jsx"
import { SelectFilter } from "../components/SelectFilter.jsx"
import { ClearFilters } from "../components/ClearFilters.jsx"
import { useId, useState, useRef } from "react"



//Lógica. Custom hook
const useSearchForm = ({idExperienceLevel, idTechnology, idText, idLocation, onSearch, onTextFilter, clearFilters, inputRef}) => {
    //Valor que persiste entre renderizados
    const timeOutId = useRef(null)
    const [searchText, setSearchText] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        if(event.target.name === idText) return

        const filters = {
            technology: formData.get(idTechnology),
            modalidad: formData.get(idLocation),
            nivel: formData.get(idExperienceLevel)
        }

        console.log(filters)
        onSearch(filters)
    }

    const handleTextChange = (event) => {
        var text = event.target.value;

        setSearchText(text)

        //Debounce: cancelar el timeout anterior
        if(timeOutId.current){
            clearTimeout(timeOutId.current)
        }

        timeOutId.current = setTimeout(()=>{
            onTextFilter(text)
        },1000)
    }

    const handleClearFilters = () => {
        setSearchText("")
        onTextFilter("")
        clearFilters()
    }

    const handleClearInput = (event) => {
        event.preventDefault();

        inputRef.current.value="";
        onTextFilter("")
        setSearchText("")
        
    }

    return {handleSubmit, handleTextChange, handleClearFilters, handleClearInput}
}

export function SearchFormSection({onSearch,  opciones, isFiltered, onTextFilter, clearFilters,filters, initialText}) {
    const idText = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idExperienceLevel = useId()
    const inputRef = useRef()

    const {handleSubmit, handleTextChange, handleClearFilters, handleClearInput} = useSearchForm({idText, idExperienceLevel, idTechnology, idLocation, onSearch, onTextFilter, clearFilters, inputRef})


    return (
        <section className="jobs-search">
            <form onChange={handleSubmit} id="search-form-section"> 
                <div className="bg-surface rounded-xl p-4 lg:p-6 shadow-lg shadow-slate-200/50 border border-slate-200">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <SearchFilter defValue={initialText}  inputRef={inputRef} clearInput={handleClearInput} handleTextChanges={handleTextChange} name={idText} id="inputSearch" icon="search" placeholder="Cargo, palabra clave o empresa" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 flex-wrap items-end sm:items-center">

                {isFiltered && (
                    <ClearFilters onClear={handleClearFilters} id="clearFilters" text="Limpiar filtros"/>
                )}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:ml-auto">
                        <SelectFilter name={idLocation} id="type" labelText="Tipo de empleo" values={opciones.modalidad} filterValue={filters.modalidad}/>
                        <SelectFilter name={idExperienceLevel} id="level" labelText="Nivel de experiencia" values={opciones.nivel} filterValue={filters.nivel}/>
                        <SelectFilter name={idTechnology} id="tech" labelText="Tecnología" values={opciones.technology} filterValue={filters.technology}/>
                    </div>
                </div>
            </form>

        </section>
    )
}      