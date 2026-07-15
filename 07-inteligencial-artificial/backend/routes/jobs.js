import {Router} from 'express'
import { JobController } from '../controllers/jobs.js'
import {validateJob, validatePartialJob} from '../schemas/jobs.js'

export const jobsRouter = Router()

function validateCreateJob(req, res, next) {
    const result = validateJob(req.body)
    if(result.success) {
        req.body = result.data
        return next()
    }

    return res.status(400).json({
        error: 'Datos de empleo no válidos',
        details: result.error.errors
    })
}

function validateUpdate(req, res, next) {
    const result = validatePartialJob(req.body)
    if(result.success) {
        req.body = result.data
        return next()
    }

    return res.status(400).json({
        error: 'Datos de empleo no válidos',
        details: result.error.errors
    })
}

jobsRouter.get ('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getById)

//Primero valida, luego crea o modifica el empleo
jobsRouter.post('/', validateCreateJob, JobController.create) 
jobsRouter.patch('/:id', validateUpdate, JobController.partialUpdate)
jobsRouter.put('/:id', validateCreateJob, JobController.update)

jobsRouter.delete('/:id', JobController.delete)

// export {jobsRouter}