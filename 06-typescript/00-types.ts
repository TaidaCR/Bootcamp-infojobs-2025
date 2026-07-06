export type Company = {
    name: string
    adress: string
}

type UserId = {
    readonly id: string | number
}

export type User = {
    //readonly para indicar que esa propiedad es solo de lectura y no se puede modificar
    readonly name: string
    readonly age: number
    //propiedad opcional con el ?
    email?: string
    //Tipo anidado
    company?: Company
    role: "admin" | "user" | "guest" //Tipo literal, solo puede ser uno de esos tres valores
}

type UserEntity = User & UserId //Tipo de intersección, combina dos tipos en uno

const entity: UserEntity = {
    id: 1,
    name: "midudev",
    age: 30,
    role: "guest",
    email: "user@gmail.com"
}

export type User2 = {
    //readonly para indicar que esa propiedad es solo de lectura y no se puede modificar
    readonly name: string
    readonly age: number
    //propiedad opcional con el ?
    email?: string
}