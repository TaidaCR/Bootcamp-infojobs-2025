//Leer y escribir ficheros en nuestro sistema
import { mkdir, readFile, writeFile } from 'node:fs/promises';
//No utilizar barra /, puede ser confuso porque windows usa \, mejor usar join
import { join, basename, extname } from 'node:path';


if (process.permission.has('fs.read', 'archivo.txt')) {
    const content = await readFile('./archivo.txt', 'utf-8')
    console.log(content);
} else {
    console.log('No tienes permiso para leer el archivo');
}

if (process.permission.has('fs.write', 'asdasd/files/documents')) {


    const outPutDir = join('asdasd', 'files', 'documents');
    //caretas anidadas si no existe el directorio, lo crea
    await mkdir(outPutDir, { recursive: true });
    const uppercaseContent = content.toUpperCase();

    const outPutFilePath = join(outPutDir, 'archivo-uppercase.txt');
    console.log('La extensión es:', extname(outPutFilePath));
    console.log('El nombre del archivo es:', basename(outPutFilePath))

    await writeFile(outPutFilePath, uppercaseContent);
} else {
    console.log('No tienes permiso para escribir en el directorio especificado');
}

//node --permission manage-files.js PARA MANEJAR PERMISOS
//node --permission --allow-fs-read="*" manage-files.js PARA PERMITIR LEER FICHEROS
//node --permission --allow-fs-write="*" manage-files.js
//node --permission --allow-fs-read="archivo.txt" --allow-fs-write="./output/*" manage-files.js PERMISO A LO COCNRETO QE QUIERO