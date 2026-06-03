//Diferencia con 04-node server.js, este era nativo. 04-express index.js incorpora el frameworl express
import express from 'express'

//En node.js hay que indicar el tipo. Ejemplo import dinamico más abajo.
//ver cuál nos conviene más. por ejemplo esta web quizás este porque gira todo en torno a los empleos
import jobs from './jobs.json' with {type:'json'}
import {DEFAULTS} from './config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

app.use((request, response, next) => {
    const timeString = new Date().toLocaleDateString()
console.log(`[${timeString}] ${request.method} ${request.url}`)
next()
}) //Middleware para parsear el body de las peticiones a json


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


    console.log({limit, technology})
    return res.json(filteredJobs)
})

//Idempotente: deja el sistema igual si se llama varias veces

//aquí mismo concepto que en const
app.get('/jobs/:id', (req, res) => {
    //siempre los parámetros que devuelve son string
    const {id} = req.params

    const jobId = Number(id)

    return res.json({
        job: {id: jobId, title: `Job ${id}`}
    })
})

//No es Idempotente: cada vez que se llama, el sistema cambia. Ejemplo: crear un nuevo recurso cada vez que se llama a la ruta.
app.post('/jobs', (req, res)=>{
    //TODO
})

//Idempotente
app.delete('/jobs/:id', (req, res) => {
    //TODO
})

//Reemplazar un recurso completo
app.put('/jobs/:id', (req, res) => {
    //TODO
})

//Actualizar parcialmente un recurso
app.patch('/jobs/:id', (req, res) => {
    //TODO
})

//Ruta opcional
app.get('/a{b}cd', (req, res) => {
    return res.send('Ruta opcional abcd o acd')
})

//Comodín
app.get('/a*cd', (req, res) => {
    return res.send('El comodín es el asterisco')
})

//Usar regex
app.get('/*fly$/', (req, res) => {
    return res.send('Terminando en fly')
})

//Comodín

app.listen(PORT, () => {
    console.log(`Servidor levantado en: ${PORT}`)
})

//node --watch index.js  --> watch para que se reinicie el servidor cada vez que se edite el código.

