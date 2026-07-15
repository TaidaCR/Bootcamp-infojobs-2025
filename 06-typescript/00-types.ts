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

export type UserBirth = {
    birth: Date
}

type UserEntity = User & UserId & UserBirth//Tipo de intersección, combina dos tipos en uno

const entity: UserEntity = {
    id: 1,
    name: "midudev",
    age: 30,
    role: "guest",
    email: "user@gmail.com",
    birth: new Date("1990-01-01")
}

export type User2 = {
    //readonly para indicar que esa propiedad es solo de lectura y no se puede modificar
    readonly name: string
    readonly age: number
    //propiedad opcional con el ?
    email?: string
}


export type Dictionary = {
    [key: string]: string
}