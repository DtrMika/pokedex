const PAGE_URL= `https://pokeapi.co/api/v2/pokemon/`;

fetch(PAGE_URL)
.then((response)=>{
    // aca verificamos si la respuesta es exitosa 200
    if(!response.ok){
        throw new console.error("Error en de red"+response.status);
    }
    // esto devuelve la respuesta obtenida
    return response.text();
})
//Maneja el contenido de la pagina
.then((data)=>{
    console.log(data)
})

.catch((error)=>{
    console.error("No se logro obtener la pagina", error);
});