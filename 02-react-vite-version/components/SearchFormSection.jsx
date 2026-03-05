
import { SearchFilter } from "../components/SearchFilter.jsx"
import { SelectFilter } from "../components/SelectFilter.jsx"
import { ClearFilters } from "../components/ClearFilters.jsx"
import { useId } from "react"

export function SearchFormSection({opciones, /*onSearch,*/ onTextFilter, clearFilters, onChangeSelect, textValue }) {
    const idText = useId()
    const idTech = useId()
    const idSchedule = useId()
    const idLevel = useId()
    const idRange = useId()
    const idModality = useId()

    //Si quisieramos hacerlo con el submit al pulsar button
    // const handleSubmit = (event) => {
    //     event.preventDefault()

    //     const formData = new FormData(event.target)

    //     const filters = {
    //         search: formData.get(idText),
    //         tech: formData.get(idTech),
    //         schedule: formData.get(idSchedule),
    //         level: formData.get(idLevel),
    //         range: formData.get(idRange),
    //         modality: formData.get(idModality)
    //     }

    //     console.log(filters)
    //     onSearch(filters)
    // }

    const handleSelectChanges = (name, value) =>{
        onChangeSelect(name, value)
    }
   

    const handleTextChange = (event) => {
        const text = event.target.value
        onTextFilter(text)
        console.log(text)
    }
    
    return (
        <section className="jobs-search">
             <form /*onSubmit={handleSubmit}*/> 
                <div className="bg-surface rounded-xl p-4 lg:p-6 shadow-lg shadow-slate-200/50 border border-slate-200">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <SearchFilter value={textValue} name={idText} id="inputSearch" icon="search" handleTextChanges={handleTextChange} placeholder="Cargo, palabra clave o empresa" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 flex-wrap items-end sm:items-center">

                    <ClearFilters onClear={clearFilters} id="clearFilters" text="Limpiar filtros" />

                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:ml-auto">
                        <SelectFilter onChangeSelect={(e) => handleSelectChanges("range", e.target.value)} name={idRange} id="range" labelText="Rango salarial" prefix="$" sufix="k" values={opciones.range} />
                        <SelectFilter onChangeSelect={(e) => handleSelectChanges("schedule", e.target.value)} name={idSchedule} id="type" labelText="Tipo de empleo" values={opciones.schedule} />
                        <SelectFilter onChangeSelect={(e) => handleSelectChanges("level", e.target.value)} name={idLevel} id="level" labelText="Nivel de experiencia" values={opciones.level} />
                        <SelectFilter onChangeSelect={(e) => handleSelectChanges("tech", e.target.value)} name={idTech} id="tech" labelText="Tecnología" values={opciones.tech} />
                        <SelectFilter onChangeSelect={(e) => handleSelectChanges("modality", e.target.value)} name={idModality} id="modality" labelText="Modalidad" values={opciones.modality} />
                    </div>
                </div>
            </form>

        </section>
    )
}      