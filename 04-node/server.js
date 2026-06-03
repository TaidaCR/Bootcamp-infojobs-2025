import {createServer} from 'http';
import {json} from 'node:stream/consumers';
import {randomUUID} from 'node:crypto';

process.loadEnvFile(); //carga las variables de entorno del archivo .env

//Podemos pasarle la variable de entorno: PORT=1234 node server.js
const port = process.env.PORT ?? 3000;

function sendJson(res, statusCode, data){
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data))
}

const users = [
  {
    "id": 1,
    "name": "Taida"
  },
  {
    "id": 2,
    "name": "Juan"
  },
  {
    "id": 3,
    "name": "Maria"
  },
  {
    "name": "Taiida",
    "id": "90fc7d4e-062a-46a4-82e0-d95a0503de8e"
  },
  {
    "name": "Ana",
    "id": "4cd77a92-13a7-486b-8382-2e2950dfb87e"
  }
]

//imprescindible request y respuestas
const server = createServer(async (req, res) => {

    const { method, url } = req

    const [pathname, queryString] = url.split('?')

    console.log(queryString)

    const searchParams = new URLSearchParams(queryString)
    console.log(searchParams.get('limit'))

    if (method === 'GET'){

        if (pathname === "/users"){

            const limit = Number(searchParams.get('limit')) || users.length
            const offset = Number(searchParams.get('offset')) || 0

            const paginatedUsers = users.slice(offset, offset + limit)

            return sendJson(res,200, users)
        }

        if (url === "/health"){
            return sendJson(res, 200, {status: 'ok', uptime: process.uptime()})
        }
    }

    if (method === 'POST'){
        if (pathname === "/users"){
            const body = await json(req)
            console.log(body)

            if (!body || !body.name){
                return sendJson(res, 400, {error: 'El campo name es requerido'})
            }
            
            const newUser = {
                name: body.name,
                id: randomUUID()
            }

            users.push(newUser)
            return sendJson(res, 201, {message: 'Usuario creado'})
        }
    }

    return sendJson(res, 404, {error: 'Not found'})
})

//se ejecuta cuando el servidor se levante
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})


//PARA LEVANTARLO: node --watch server.js o node server.js