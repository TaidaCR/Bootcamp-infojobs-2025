import type { User, User2 } from './00-types.ts'

const user: User = {
    name: "midudev",
    age: 30,
    role: 'guest'
}

//freeze para que no se pueda modificar el objeto
const user2: User2 = Object.freeze({
    name: "midudev",
    age: 30,
    email: "user2@email.com"
})