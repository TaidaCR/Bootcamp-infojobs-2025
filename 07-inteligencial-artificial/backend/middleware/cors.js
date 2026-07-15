import cors from 'cors'

const ACCEPTED_ORIGINS = ['http://localhost:5174', 'http://localhost:5173']

export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {}) => {
    return cors({
        origin: (origin, callback) => {
            if (!origin || ACCEPTED_ORIGINS.includes(origin)){
                return callback(null, true)
            }
            return callback(new Error('Origin not allowed'))
        }
    })
}
