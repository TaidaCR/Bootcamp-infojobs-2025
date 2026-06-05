import jobs from '../jobs.json' with {type: 'json'}
import crypto from 'crypto'

export class JobModel {
    static async getAll({text, title, level, limit =10, technology, offset = 0}) {
        let filteredJobs = jobs

        if (text) {
            const searchTerm = text.toLowerCase()
            filteredJobs = filteredJobs.filter(job => job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm))
        }

        if (technology) {
            filteredJobs = filteredJobs.filter(
                job => job.data.technology.includes(technology)
            )
        }

        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)

        const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

        return paginatedJobs
    }

    static async create({ titulo, empresa, ubicacion, data }){
        
        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            data
        }

        jobs.push(newJob)

        return newJob
    }

    static async getById(id) {
        const job = jobs.find(job => job.id === id) 

        return job
    }

    static async delete(id){
        const jobIndex = jobs.findIndex(job => job.id === id)

        if (jobIndex === -1) {
            return null
        }

        const deletedJob = jobs[jobIndex]

        //Elimina x numero de elementos a partir de la posición que se le indica
        jobs.splice(jobIndex, 1)

        return deletedJob
    }

    static async update({ id, titulo, empresa, ubicacion, descripcion, data, content}){
        const jobIndex = jobs.findIndex(job => job.id === id)

        if(jobIndex === -1){
            return null
        }

        const job = jobs[jobIndex]

        const updatedJob={
            id: id,
            titulo,
            empresa,
            ubicacion,
            descripcion,
            data,
            content
        }

        jobs[jobIndex] = updatedJob
        return updatedJob
    }

    
    static async partialUpdate(id, newData){
        const jobIndex = jobs.findIndex(job => job.id === id)

        if(jobIndex === -1){
            return null
        }

        const job = jobs[jobIndex]

        const updatedJob={
            ...job,
            ...newData,
            data:{
                //Lo que había
                ...job.data,
                //El nuevo
                ...newData.data
                
            },
            content:{
                ...job.content,
                ...newData.content
            },
        }

        jobs[jobIndex] = updatedJob
        return updatedJob
    }
}