//Creamos linea de comandos.
//creamos nuestro propio ls
//nos da los argumentos con los que llamamos a  nuestro programa de inea de comandosno

import {readdir, stat} from 'node:fs/promises';
import {format, join} from 'node:path';

//1. Recuperar carpeta a listar
const dir = process.argv[2] ?? '.';

//2. Formateo simple de los tamaños
const formatBytes = (size) => {
    if(size>1024) return `${size}B`
    return `${(size/1024).toFixed(2)}KB`
}

//3. Leer los nombres, sin info
const files = await readdir(dir)

//4. Recuperar la info de cada file
const entries = await Promise.all(
    files.map(async(name) => {
        const fullPath = join(dir, name)
        const info = await stat(fullPath)

        return{
            name,
            isDir: info.isDirectory(),
            size: formatBytes(info.size)
        }
    })
)

const sortedEntries = entries.sort((a,b) => b.isDir - a.isDir)

const sortedAlf = sortedEntries.sort()

for (const entry of sortedAlf.filter((entry) => entry.isDir)){
    const icon = entry.isDir ? '📁' : '📄'
    const size = entry.isDir ? '' : `${entry.size}`
    console.log(`${icon} ${entry.name.padEnd(25)}       ${size}`)
}

//Ejecutar con node cli.js