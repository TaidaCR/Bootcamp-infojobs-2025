import {test, describe, before, after} from 'node:test'
import assert from 'node:assert'
import app from './app.js'

let server
//hacerlos en un puerto diferente al que solamos usar para no interferir con el desarrollo
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

//antes de todos los test, se ejecuta UNA vez, para levantar el servidor
before(async () => {
    return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve())
    server.on('error', reject)
    })
})

//después de todos los test, se ejecuta UNA vez, para cerrar el servidor
after(async () => {
    return new Promise((resolve, reject) => {
        server.close((err) => { if (err) return reject(err)
            resolve()
        })
    })                                   
})


describe('GET /jobs', () => {
    test('debería responder con un 200 y devolver un array de empleos', async () => {
                        //petición a jobs
        const response = await fetch(`${BASE_URL}/jobs`)   
                    //comprobamos que devuelve 200 
        assert.strictEqual(response.status, 200)
                    //transformamos la respuesta a json
        const json = await response.json()
        assert.ok(Array.isArray(json.data), 'La respuesta debería ser un array')
    })

    test('debería filtrar trabajos por tecnología', async () => {
        const tech = 'react'
        const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        console.log(json)
        assert.ok(
            json.data.every(job => job.data.technology.includes(tech)), 
            `Todos los empleos deberían incluir ${tech} en las tecnologías`
        )
    })
})

describe('POST /jobs')
//EJERCICIO: testear post put patch delete
//EJECUTAR: NODE_ENV=test node --test app.test.js
 //NODE_ENV=test node --watch --test app.test.js  (Si añado el watch se va ejecutando con cada cambio)
//lo de NODE_ENV=test es para que no se levante el servidor en app.js, porque ya lo hacemos aquí en el before. Si no, tendríamos dos servidores levantados y daría error de puerto ocupado.