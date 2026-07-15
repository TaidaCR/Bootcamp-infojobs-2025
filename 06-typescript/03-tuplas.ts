const persona: [string, number] = ["midudev", 30] //Tupla, un array con un número fijo de elementos y tipos específicos

const [personaName, personaAge] = persona //Desestructuración de la tupla

type Coordinates = [latitud: number, longitud: number] //Tupla para representar coordenadas

const [lat, long] = [10, 20] //Tupla para representar un punto en un plano cartesiano

type RGB = [number, number, number] //Tupla para representar un color en formato RGB

const color: RGB = [255, 0, 0] //Tupla para representar el color rojo en formato RGB

type StringYMuchosNumeros = [string, ...number[]] //un string y el resto números

type Config = readonly[server: string, port: number, usesL: boolean]
const config: Config = ["http://localhost:", 1234, true]