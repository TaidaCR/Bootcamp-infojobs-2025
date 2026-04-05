import {create} from 'zustand';

//Creando una store en zustand
//Return implicito. se podría hacer también con return explícito
export const useFavouritesStore = create((set, get, store) => ({
    //Estado
    favourites: [],

    //Acciones
    addToFavourites: (jobId) => {
        set((state) => ({ 
            favourites: state.favourites.includes(jobId) 
            ? state.favourites :
            [...state.favourites, jobId] 
        }))
    },

clearFavourites:() => set(store.getInitialState()),

    removeFromFavourites: (jobId) => {
        set((state) => ({ 
            favourites: state.favourites.filter((id) => id !== jobId) 
        }))
    },

    isFavourite: (jobId) => {
        return get().favourites.includes(jobId)
    },

    toggleFavourite: (jobId) => {
        const {isFavourite, addToFavourites, removeFromFavourites} = get()
        const isFav = isFavourite(jobId)
        isFav ? removeFromFavourites(jobId) : addToFavourites(jobId)
    },

    //Estado derivado
    countFavourites: () => {
        return get().favourites.length
    }
}))
