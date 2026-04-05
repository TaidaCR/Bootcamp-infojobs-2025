import {create} from 'zustand';

//CustomHook
export const useAuthStore = create((set) => ({      
    //Estado
    isLoggedIn: false,

    //Acciones
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false })
}))