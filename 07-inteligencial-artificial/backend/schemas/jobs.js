import * as z from 'zod';
//LIBRERIA VALIDACIONES

//Typescript se ejecuta en BUILD TIME
//ZOD se ejecuta en RUNTIME
const jobSchema = z.object({
    titulo: z
            .string({
                error: 'El título es obligatorio'
            
                })
            .min(3, 'El título debe tener al menos 3 caracteres')
            .max(100, 'El título no puede tener más de 100 caracteres'),
    empresa: z.string(),
    ubicacion: z.string(),
    descripcion: z.string().optional(),
    data: z.object({
        technology: z.array(z.string()),
        modalidad: z.string(),
        nivel: z.enum(['junior', 'mid-level', 'senior'])
    }),
    content: z.object({
        description: z.string().max(500, 'La descripción no puede tener más de 500 caracteres').optional(),
        responsibilities: z.string().max(500, 'Las responsabilidades no pueden tener más de 500 caracteres').optional(),
        requirements: z.string().max(500, 'Los requisitos no pueden tener más de 500 caracteres').optional(),
        about: z.string().max(500, 'La sección "about" no puede tener más de 500 caracteres').optional()
    }).optional()
})

export function validateJob(input){
    return jobSchema.safeParse(input)
}

//que solo valide el input parcial para hacer partial update, no es necesario que valide todos los campos, solo los que se quieran actualizar
export function validatePartialJob(input) {
    return jobSchema.partial().safeParse(input)
}