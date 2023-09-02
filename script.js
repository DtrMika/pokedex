const container = document.getElementById("pokemons");
const storeValue = localStorage.getItem("catID");

const PAGE_URL = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"; // creamos una constante para obtener la pagina
// const Pokemon_URL = `https://pokeapi.co/api/v2/pokemon/${mew}`

async function getAll() {
  const response = await fetch(PAGE_URL);

  if (!response.ok) throw new Error(`No se encontró el endpoint`);

  const data = await response.json();

  const { results } = data;

  console.log(results);
  pokemonData = results;

  showData(results);
}

async function showData(dataArray) {
  let template = "";

  const localStoragePokemon = localStorage.getItem("pokemonName");

  if (!localStoragePokemon) {
    for (let item of dataArray) {
      const response = await fetch(item.url);
      const data = await response.json();

      const { base_experience, id, sprites } = data;

      template += `
      <div class="col-12 col-sm-6 col-md-4 col-xl-2">
        <div class="card" >
        <div class="row">
          <div class="col-6"><h6>${id}</h6></div>
          <div class="col-6"><h6>Exp:${base_experience}</h6></div>
        </div>
          <img class="card-img-top" src="${sprites.front_default}" alt="Imagen de ${data.name}">
          <div class="card-body">
            <h6 class="text-center">${item.name}</h6>
            <p class="card-text">descriptiondescriptiondescriptiondescriptiondescription</p>
          </div>
        </div>
      </div>
  `;
    }

    return (container.innerHTML = template);
  }

  // Si hay algo en el localStorage, muestra esto
  const pokemon_dinamic_URL = `https://pokeapi.co/api/v2/pokemon/${localStoragePokemon}/`;

  const response = await fetch(pokemon_dinamic_URL);
  if (!response.ok) return alert("pokemon no válido");
  const data = await response.json();

  const { base_experience, id, sprites } = data;
  console.log(data);

  template += `
    <div class="col-12">
      <div class="card" >
      <div class="row">
        <div class="col-6"><h6>${id}</h6></div>
        <div class="col-6"><h6>Exp:${base_experience}</h6></div>
      </div>
        <img class="card-img-top" src="${sprites.front_default}" alt="Imagen de ${data.name}">
        <div class="card-body">
          <h6 class="text-center">${data.name}</h6>
          <p class="card-text">descriptiondescriptiondescriptiondescriptiondescription</p>
        </div>
      </div>
    </div>
`;

  return (container.innerHTML = template);
}

const inputText = document.querySelector("#txtbtn");
const btn = document.querySelector("#btn-search");

console.log(inputText);
console.log(btn);

function getPokemonName() {
  btn.addEventListener("click", () => {
    let inputValue = inputText.value.toLowerCase();
    if (!inputValue) return alert("pone datos");
    localStorage.setItem("pokemonName", inputValue);
    location.reload();
  });
}

document.addEventListener("DOMContentLoaded", getAll);
document.addEventListener("DOMContentLoaded", getPokemonName);
