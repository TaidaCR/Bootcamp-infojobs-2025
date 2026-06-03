//Diferencia con 04-node server.js, este era nativo. 04-express index.js incorpora el frameworl express
import express from 'express'

import cors from 'cors'

//En node.js hay que indicar el tipo. Ejemplo import dinamico más abajo.
//ver cuál nos conviene más. por ejemplo esta web quizás este porque gira todo en torno a los empleos
import jobs from './jobs.json' with {type:'json'}
import {DEFAULTS} from './config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()


const ACCEPTED_ORIGINS = ['http://localhost:5173',
    'https://bootcamp-react-lw9npcdw8-taidas-projects.vercel.app/'
    //, puedo añadir más
]

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || ACCEPTED_ORIGINS.includes(origin)){
                return callback(null, true)
            }
            return callback(new Error('Origin not allowed'))
        }
    })
)
//Middleware para parsear el body de las peticiones a json
app.use(express.json())

app.use((request, response, next) => {
    const timeString = new Date().toLocaleDateString()
console.log(`[${timeString}] ${request.method} ${request.url}`)
next()
})


app.get('/', (request, response) => {
    response.send('Hello World!')
})

app.get('/health', (request, response) => {
    return response.json({
        status: 'ok',
        uptime: process.uptime()
    })
})

app.get ('/jobs', async (req, res) => {
    //Esto se aplica para el Error CORS. Si web y API estan en Protocolo dominio o puerto diferentes el navegador bloque la patición. En el backend no habria problema
    // Indica que ese dominio peude hacer una peticion a este recurso
    //Instalar el paquete con npm install cors y usarlo como MIDDLEWARE para evitar tener que configurar esto a mano.
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    //import dinámico. solo se importa cuando se llama a la ruta. 
    // const {default: jobs} = await import('./jobs.json', {with: {type: 'json'}})
    const {text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET} = req.query

    let filteredJobs = jobs

    if(text){
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job => job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm))
    }

    if(technology){
        filteredJobs = filteredJobs.filter(
            job => job.tecnologias.includes(technology)
        )
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

    return res.json({data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber})
})

//Idempotente: deja el sistema igual si se llama varias veces
                        //aquí mismo concepto que en const
app.get('/jobs/:id', (req, res) => {
    //siempre los parámetros que devuelve son string
    const {id} = req.params

    const job = jobs.find(job => job.id === id)

    // return res.json({
    //     job: {id: jobId, title: `Job ${id}`}
    // })

    if (!job){
        return res.status(404).json({
            error: 'Job not found'
        })
    }

    return res.json(job)
})

//No es Idempotente: cada vez que se llama, el sistema cambia. Ejemplo: crear un nuevo recurso cada vez que se llama a la ruta.
app.post('/jobs', (req, res)=>{
    const {titulo, empresa, ubicacion, data} = req.body 

    const newJob = {
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion,
        data
    }

    jobs.push(newJob) //Lo haremos en una base de datos con un INSERT

    return res.status(201).json(newJob)
})

//Idempotente
app.delete('/jobs/:id', (req, res) => {
    //TODO
})

//
app.put('/jobs/:id', (req, res)=>{
    //1. Cogemos el id del empleo a reemplazar
    const {id} = req.params
    //2. Buscamos el empleo
    const jobIndex = jobs.findIndex(job => job.id == id)

    //3.Si no existe devolvemos error
    if (jobIndex === -1){
        return res.status(404).json({
            error: 'No se ha encontrado el empleo'
        })
    }

    
    const updatedJob = {
        ...jobs[jobIndex],
        ...req.body
    }

    jobs[jobIndex] = updatedJob
    return res.status(200).json(updatedJob)
})

app.patch('/jobs/:id', (req, res) => {
    const {id} = req.params
    const jobIndex = jobs.findIndex(job => job.id == id)

    //3.Si no existe devolvemos error
    if (jobIndex === -1){
        return res.status(404).json({
            error: 'No se ha encontrado el empleo'
        })
    }
//esto realmente es logica de put para que no se queden campos undefined. 
    //realmente logica de patch sería ...jobs[jobIndex].id, ...req.body porque esperaría el objeto entero
    const patchedJob = {
        ...jobs[jobIndex],
        ...req.body
    }

    jobs[jobIndex] = patchedJob

    return res.status(201).json(patchedJob)
})


//Comodín
app.listen(PORT, () => {
    console.log(`Servidor levantado en: ${PORT}`)
})

//Levantar servidor: node --watch index.js

//CRUD: Create Read Update Delete

//EJERCICIOS: CREAR EL PUT Y EL PATCH

// Probar: put/post/patch usar
//     curl -X PUT http://localhost:2314/jobs/p7q2m3n6-1l85-7m26-o2p7-6t9k0l2m3o5p -H "Content-Type: application/json" -d "{\"titulo\": \"IT Support specialist\", \"ubicacion\": \"Donostia\"}"

// Comprobar:
//     curl http://localhost:2314/jobs
//     (Y ahi lo busco)
