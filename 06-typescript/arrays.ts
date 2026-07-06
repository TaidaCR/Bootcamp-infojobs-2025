//Sintaxis 1 - mejor para arrays simples. La más común
const numeros: number[] = [1, 2, 3, 4, 5]
numeros.push(6) //Se puede modificar
//Si intentas meterle string no deja

//Sintaxis 2 - más avanzada
const numeros2: Array<number> = [1, 2, 3, 4, 5]


let vacio = [] //lo declara como any[] y se puede meter cualquier tipo de dato pero no deberíamos hacer eso, mejor tiparlo

//Arrays mixtos (evitarlo)
const mixto: (string | number)[] = ["midudev", 25, "midu", 30]

//Tupla - no se puede modificar, inmutable
//Se identifica longitud y tipo de datos en cada posición
const tupla: [string, number] = ["midudev", 25]

