import { JobModel } from "../models/job.js"
import { DEFAULTS } from "../config.js"

export class JobController {
    static async getAll(req, res) {
        const { text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query

        const paginatedJobs = await JobModel.getAll({ text, title, level, limit, technology, offset })
        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)
        return res.json({ data: paginatedJobs, total: paginatedJobs.length, limit: limitNumber, offset: offsetNumber })
    }

    static async getById(req, res) {
        //Igual que esto: const id = req.params.id
        const { id } = req.params
        const job = await JobModel.getById(id)

        if (!job) {
            return res.status(404).json({
                error: 'Job not found'
            })
        }

        return res.json(job)
    }

    static async create(req, res) {
        const { titulo, empresa, ubicacion, descripcion, data, content } = req.body

        const newJob = await JobModel.create({ titulo, empresa, ubicacion, descripcion, data, content })

        return res.status(201).json(newJob)
    }

    static async partialUpdate(req, res) {
        const { id } = req.params

                                                            //pasamos el body completo
        const updatedJob = await JobModel.partialUpdate(id, req.body)

       if (!updatedJob) {
            return res.status(404).json({
                error: 'No se ha encontrado el empleo'
            })
        }
        return res.status(200).json(updatedJob)
    }

    static async update(req, res) {
        const { id } = req.params
        const { titulo, empresa, ubicacion, descripcion, data, content } = req.body

       const updatedJob = await JobModel.update({id, titulo, empresa, ubicacion, descripcion, data, content})
       if (!updatedJob) {
            return res.status(404).json({
                error: 'No se ha encontrado el empleo'
            })
        }
        return res.status(200).json(updatedJob)
    }

    static async delete(req, res) {
        const { id } = req.params

        const jobToDelete = await JobModel.getById(id)

        if (!jobToDelete) {
            return res.status(404).json({
                error: 'No se ha encontrado el empleo'
            })
        }

        await JobModel.delete(id)

        return res.status(200).json(jobToDelete)
    }
}