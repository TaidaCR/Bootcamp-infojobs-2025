function sumar(a:number, b:number): number{
    return a + b
}

//Aqui al poner el tipo de los parametros infiere el tipo del resultado, podemos no ponerlo
function sumar2(a:number, b:number){
    return a + b
}

const sumar3 = (a:number, b:number) => {
    return a + b
}

//PARAMETROS OPCIONALES
function saludar2(nombre: string, apellido?: string) {
  if (apellido) return `Hola ${nombre} ${apellido}`
  return `Hola ${nombre}`
}

//PARAMETROS POR DEFECTO. Si tiene valor por defecto no puede ser opcional
function crearUsuario(nombre: string, rol: string = 'admin') {
  return { nombre, rol }
}

//Rest parameters. No sabemos cuántos parámetros va a haber
function sumarNumeros(...numeros: number[]): number{
    return numeros.reduce((acc, curr) => acc + curr, 0)
}

//tipos de función
