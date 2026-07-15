interface Persona{
    readonly name: string
    readonly age: number
}

interface Identificable {
    id: number
}

interface User extends Persona, Identificable {
    email?: string
    role: "admin" | "user" | "guest"

    //dos maneras diferentes 
    saludar(): string
    login: () => string
}

const user: User = {
    name: "Ana",
    age: 23,
    id: 1234,
    role: "admin",
    saludar() {return "Hola";},
    login() {return "Hola";}
}

//Si declaras la misma interfaz en un archivo varias veces se fusionan
//Cuando utilizar tipos y cuándo interfaces. Se pueden solapar.
//Interfaz: más pensada para utilizarse con objetos. Por defecto siempre se usarán tipos
//Ventajas de interfaces: objetos


//INTERFACES PARA CLASES (para el resto mejor tipos)
interface MediaPlayer{
    play(): void
    pause(): void
    stop(): void
}

class Reproductor implements MediaPlayer{

    play(): void{
        console.log("Reproduciendo...")
    }
    stop(): void{
        console.log("Parando...")
    }
    pause(): void{
        console.log("Pausando...")
    }
}

//todo esto se puede ejecutar con node.js