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
        const { titulo, empresa, ubicacion, data } = req.body

        const newJob = await JobModel.create({ titulo, empresa, ubicacion, data })

        return res.status(201).json(newJob)
    }

    static async partialUpdate(req, res) {
        const { id } = req.params
        const jobIndex = await JobModel.findIndex(job => job.id == id)

        if (jobIndex === -1) {
            return res.status(404).json({
                error: 'No se ha encontrado el empleo'
            })
        }

        const patchedJob = {
            ...jobs[jobIndex].id,
            ...req.body
        }

        jobs[jobIndex] = patchedJob

        return res.status(201).json(patchedJob)
    }

    static async update(req, res) {
        const { id } = req.params
        const jobIndex = await JobModel.findIndex(job => job.id == id)

        if (jobIndex === -1) {
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
    }

    static async delete(req, res) {
        //HACER LOGICA DE ESTE
    }
}