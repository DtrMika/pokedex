const PAGE_URL= `https://pokeapi.co/api/v2/pokemon/`;// creamos una constante para obtener la pagina

fetch(PAGE_URL)// hacemos la solicitud para la url lo que nos da una respuesta
.then((response)=>{// este primer then maneja esta respuesta de la solicitudgit 
    // aca verificamos si la respuesta es exitosa 200
    if(!response.ok){
        throw new console.error("Error en de red"+response.status);
    }
    // esto devuelve la respuesta obtenida
    return response.text();
})
//Maneja el contenido de la pagina
.then((data)=>{ // este then maneja el contenido de la pagina
    console.log(data)
})

.catch((error)=>{ // captura y maneja cualquier error que pueda ocurrir durante el proceso de solicitud
    console.error("No se logro obtener la pagina", error);
});