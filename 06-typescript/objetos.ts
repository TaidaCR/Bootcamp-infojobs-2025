import type { User, User2, UserBirth, Dictionary } from './00-types.ts'

const user: User = {
    name: "midudev",
    age: 30,
    role: 'guest'
}

const userBirth: UserBirth = {
    birth: new Date("1990-01-01")
}

//freeze para que no se pueda modificar el objeto
const user2: User2 = Object.freeze({
    name: "midudev",
    age: 30,
    email: "user2@email.com"
})

const dictionary: Dictionary = {
    apple: "A fruit that grows on trees",
    banana: "A long yellow fruit",
    cherry: "A small red fruit"
}