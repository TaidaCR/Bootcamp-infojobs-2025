//En vez de usar context vamos a probar a usar zustand.
import { createContext, useContext, useState } from "react";

export const FavouritesContext = createContext()

export function FavouritesProvider({ children }){
  const [favourites, setFavourites] = useState([])
    const addToFavourites = (job) => {
        setFavourites(prevFavourites => [...prevFavourites, job])
    }

    const removeFromFavourites = (jobId) => {
        setFavourites(prevFavourites => prevFavourites.filter(job => job.id !== jobId))
    }   
    
    const isFavourite = (jobId) => {
        return favourites.some(job => job.id === jobId)
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }       

    return <FavouritesContext value={value}>{children}</FavouritesContext>
}

export function useFavourites(){
    const context = useContext(FavouritesContext)   
    if (context === undefined) {
        throw new Error("useFavourites debe ser usado dentro de un FavouritesProvider")
    }
    return context
}