//Any --> Puede tener sentido usarla en migraciones de JS a TS
let cualquierCosa: any = true //Evitar, no hace verificación

//unknown. Hacer type narrowing, verificar el tipo primero. Util por ejemplo para parsear un json
let valorDesconocido: unknown= "hola"
if (typeof valorDesconocido === 'number'){
    const resultadoSeguro = valorDesconocido + 8
    console.log(resultadoSeguro)
} else if (typeof valorDesconocido === 'string'){
    console.log(valorDesconocido.toUpperCase())
}

//void
function saludar(): void{
    console.log("Hola")
}

//Never: el tipo imposible
function bucleInfinito(): never{
    while(true){
        //...
    }
}


// Tipo	     Qué representa	                              Ejemplo típico
// any	     ”Me da igual el tipo”	                      Evitar siempre que puedas
// unknown	 ”No sé el tipo, pero lo voy a comprobar”	  Datos de API, JSON.parse
// void	     ”No devuelvo nada útil”	                  console.log, event handlers
// never	 ”Esto nunca pasa”	                          Throw, loops infinitos, exhaustive checks