import express from 'express'
import {jobsRouter} from './routes/jobs.js'
import { corsMiddleware } from './middleware/cors.js'

import {DEFAULTS} from './config.js'
import {aiRouter} from "./routes/ai.js"

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

app.use(corsMiddleware())

app.use(express.json())

app.use('/jobs', jobsRouter)
app.use('/ai', aiRouter)

// process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'
if(!process.env.NODE_ENV){
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

export default app