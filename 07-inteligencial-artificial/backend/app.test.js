import {test, describe, before, after} from 'node:test'
import assert from 'node:assert'
import app from './app.js'
import strict from 'node:assert/strict'
import { json } from 'zod'

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

//agruparlos por el método HTTP y la ruta que vas a testear.
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
        assert.ok(
            json.data.every(job => job.data.technology.includes(tech)), 
            `Todos los empleos deberían incluir ${tech} en las tecnologías`
        )
    })

    test('Debería devolver el empleo con el id especificado', async () => {
        const id = 'p7q2m3n6-1l85-7m26-o2p7-6t9k0l2m3o5p'
        const response = await fetch(`${BASE_URL}/jobs/${id}`)
        assert.strictEqual(response.status, 200)
        const json = await response.json()
        //Compara si dos valores son iguales
        assert.strictEqual(json.id, id, `El id del empleo debería ser ${id}`)
    })

    test('Debería devolver error 404 al no encontrar el id', async () => {
        const id = 'id-invalido12345'
        const response = await fetch(`${BASE_URL}/jobs/${id}`)
        assert.strictEqual(response.status, 404, "Debería devolver un error 404 para un ID no válido")
        const json = await response.json()
        assert.ok(json.error, `La respuesta debería contener un mensaje de error para un ID no válido`)
    })
})

describe('POST /jobs', () =>{
    test('Debería crear un nuevo empleo y devolverlo', async () => {
        const newJobData = {
            titulo: 'Trabajo de prueba',
            empresa: 'Empresa de prueba',
            ubicacion: 'Ubicación de prueba',
            data: {
                technology: ['nodejs', 'react'],
                modalidad:'híbrido',
                nivel:'senior'
            }
        }

        const response = await fetch(`${BASE_URL}/jobs`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newJobData)
        })
        const json = await response.json()
        assert.strictEqual(response.status, 201)
        assert.ok(json.id, 'El empleo creado debería tener un ID generado')
        assert.strictEqual(json.titulo, newJobData.titulo, 'El título del empleo creado debería ser el mismo que el enviado')
    })

    test('El título debe ser una cadena de texto', async () => {
        const badJobData = {
            titulo: 123131,
            empresa: 'Empresa de prueba2',
            ubicacion: 'Ubicación de prueba2',
            data: {
                technology: ['nodejs', 'react'],
                modalidad:'híbrido',
                nivel:'senior'
            }
        }

        const response = await fetch(`${BASE_URL}/jobs`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badJobData)
        })
        const json = await response.json()
        assert.strictEqual(response.status, 400)
    })
})


describe('DELETE /jobs' , () => {
    test('Debería eliminar el empleo con el id especificado', async () => {
        const id = 't1u6q7r0-5p29-1q60-s6t1-0x3o4p6q7s9t'
        const response = await fetch(`${BASE_URL}/jobs/${id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
            }
        })

        assert.strictEqual(response.status, 200)
        const responseAfterDelete = await fetch(`${BASE_URL}/jobs/${id}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
            }
        })

        const jsonAfterDelete = await responseAfterDelete.json()

        assert.strictEqual(responseAfterDelete.status, 404)
        assert.ok(jsonAfterDelete.error, 'El trabajo no existe porque se acaba de borrar')
    })
})

describe('PUT /jobs',  () => {
    test('Deberia modificar el trabajo completo', async () => {
        const id = 'k2l7h8i1-6g30-2h71-j7k2-1o4f5g7h8j0k'

        const fullyUpdatedJob = {
            titulo: 'Trabajo de prueba2',
            empresa: 'Empresa de prueba2',
            ubicacion: 'Ubicación de prueba2',
            descripcion: 'Descripcion de prueba2',
            data: {
                technology: ['nodejs2', 'react2'],
                modalidad:'modalidad de prueba2',
                nivel: 'Nivel de prueba2'
            },
            content:{
                description:'description de prueba2',
                responsibilities: 'responsibilities de prueba2',
                requirements:  'requirements de prueba2',
                about:'about de prueba2'
            }
        }

        const response = await fetch(`${BASE_URL}/jobs/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fullyUpdatedJob)
        })

        const json = await response.json()
        assert.strictEqual(response.status, 200)
        assert.strictEqual(json.titulo, fullyUpdatedJob.titulo, 'El título del empleo creado debe ser el mismo que el del json')
        //para comparar arrays
        assert.deepEqual(json.data.technology, fullyUpdatedJob.data.technology, 'El data del empleo creado debe ser el mismo que el del json')
        assert.strictEqual(json.descripcion, fullyUpdatedJob.descripcion, 'La descripcion del empleo creado debe ser el mismo que el del json')
    })
})

describe('PATCH /jobs', () => {
    test('Debería sorbreescribir parte del empleo', async () => {
        const id = 'k2l7h8i1-6g30-2h71-j7k2-1o4f5g7h8j0k'

        const patchedJob = {
            titulo: 'Trabajo de prueba patcheado',
            empresa: 'Empresa de prueba patcheada',
            ubicacion: 'Ubicación de prueba patcheada',
            data: {
                technology: ['nodejs patcheado', 'react patcheado'],
                modalidad:'modalidad de prueba patcheada',
                nivel: 'junior'
            },
            content:{
                description:'description de prueba patcheada'
            }
        }

        const response = await fetch(`${BASE_URL}/jobs/${id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patchedJob)
        })
        const json = await response.json()

        assert.strictEqual(response.status, 200)
        assert.strictEqual(patchedJob.titulo, json.titulo, 'Los titulos deben ser iguales')
        assert.deepEqual(patchedJob.data.modalidad, json.data.modalidad, 'Las modalidades deben ser iguales')
    })
})



//EJERCICIO: testear patch delete
//EJECUTAR: NODE_ENV=test node --test app.test.js
//NODE_ENV=test node --watch --test app.test.js  (Si añado el watch se va ejecutando con cada cambio)
//lo de NODE_ENV=test es para que no se levante el servidor en app.js, porque ya lo hacemos aquí en el before. Si no, tendríamos dos servidores levantados y daría error de puerto ocupado.