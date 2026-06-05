import {Router} from 'express'
import { JobController } from '../controllers/jobs.js'

const jobsRouter = Router()

jobsRouter.get ('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getById)
jobsRouter.post('/', JobController.create) 
jobsRouter.delete('/:id', JobController.delete)
jobsRouter.put('/:id', JobController.update)
jobsRouter.patch('/:id', JobController.partialUpdate)

export {jobsRouter}