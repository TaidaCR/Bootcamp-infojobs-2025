function procesar(valor: number | string){
    console.log(valor)
    if (typeof valor === 'number'){
        console.log("El valor es un numero")
    } else{
        console.log("El valor es una cadena")
    }
}

function imprimirMensaje(mensaje: null | string | undefined){
    //porque null e undefined son false, no haria falta comprobarlo con el typeof
    if(mensaje){

    }
}

//
type Pez = { nombre: string; nadar: () => void }
type Pajaro = { nombre: string; volar: () => void }
type Perro = { nombre: string; ladrar: () => void }

type Animal = Pez | Pajaro | Perro

function mover(animal: Animal) {
  if ('nadar' in animal) {
    // animal es Pez
    animal.nadar()
    return
  }

  if ('volar' in animal) {
    // animal es Pajaro
    animal.volar()
    return
  }

  // animal es Perro
  animal.ladrar()
}


function formatDate(value: Date | string) {
  if (value instanceof Date) {
    // value es Date
    return value.toISOString()
  }

  // value es string
  return new Date(value).toISOString()
}