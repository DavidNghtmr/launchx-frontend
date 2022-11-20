//Exites 649 pokemon con gif
const pokemonNumero = document.querySelector(".pokemon-numero");
const pokemonNombre = document.querySelector(".pokemon-nombre");
const pokemonImagen = document.querySelector(".pokemon-imagen");
const weight = document.querySelector(".weight");
const height = document.querySelector(".height");

const form = document.querySelector(".form");
const input = document.querySelector(".texto");
const btnAnterior = document.querySelector(".btn-anterior");
const btnSiguiente = document.querySelector(".btn-siguiente");

let botonesPokemon = 0;

const buscarPokemon = async (pokemon) => {
  const apiPokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (apiPokemon.status === 200) {
    const datos = await apiPokemon.json();
    return datos;
  }
};

const imagenPokemon = async (pokemon) => {
  pokemonNombre.innerHTML = "Buscando ...";
  pokemonNumero.innerHTML = "";

  const datos = await buscarPokemon(pokemon);

  if (datos) {
    pokemonNombre.innerHTML = datos.name;
    pokemonNumero.innerHTML = datos.id;
    pokemonImagen.src =
      datos["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    weight.innerHTML = `Peso: ${datos.weight} g`;
    height.innerHTML = `Altura: ${datos.height}0 cm`;
    input.value = "";
    botonesPokemon = datos.id;
  } else {
    pokemonImagen.src = "images/not-found.png";
    pokemonNombre.innerHTML = "No reconocido";
    pokemonNumero.innerHTML = "";
    input.value = "";
    botonesPokemon = datos.id;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  imagenPokemon(input.value.toLowerCase());
});

btnAnterior.addEventListener("click", () => {
  if (botonesPokemon > 1) {
    botonesPokemon -= 1;
    imagenPokemon(botonesPokemon);
  }
});

btnSiguiente.addEventListener("click", () => {
  if (botonesPokemon < 649) {
    botonesPokemon += 1;
    imagenPokemon(botonesPokemon);
  }
});
