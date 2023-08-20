const div = document.getElementById("pokemons");
const storeValue = localStorage.getItem("catID");

const PAGE_URL = "https://pokeapi.co/api/v2/pokemon/"; // creamos una constante para obtener la pagina

fetch(PAGE_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la red: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    const results = data.results;

    // Recorre la lista de resultados y obtiene más detalles de cada Pokémon
    const promises = results.map((pokemon) => {
      return fetch(pokemon.url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la red: " + response.status);
          }
          return response.json();
        })
        .then((pokemonData) => {
          return {
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            description: "Descripción de tu Pokémon", // Puedes personalizar esto
          };
        });
    });

    // Espera a que se completen todas las solicitudes antes de mostrar los datos
    Promise.all(promises)
      .then((dataArray) => {
        showData(dataArray); // Llama a la función showData para mostrar los datos
      })
      .catch((error) => {
        console.error("No se pudo obtener la página", error);
      });
  })
  .catch((error) => {
    console.error("No se pudo obtener la lista de Pokémon", error);
  });

const container = document.getElementById("pokemons");

function showData(dataArray) {
  container.innerHTML = "";
  for (const item of dataArray) {
    container.innerHTML += `<div class="row card" style="width: 45%">
      <img class="card-img-top" width="200" src="${item.image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">${item.description}<br>Precio USD: ${item.cost}<br>Vendidos: ${item.soldCount}</p>
        <a href="#" class="btn btn-primary"></a>
      </div>
    </div>`;
  }
}
