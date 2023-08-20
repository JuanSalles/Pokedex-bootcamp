console.log("pokemon carregado");



const pokemon = JSON.parse(localStorage.pokemon);


const nome = document.getElementById('nome-do-pokemon');
const foto = document.getElementById('imagem-do-pokemon');
const pokebox = document.getElementById('pokebox');
const tipos = document.getElementById('tipos')

pokemon.types.forEach(pokemonType => {
    const div = document.createElement('div');
    div.classList.add(`${pokemonType.type.name}`);
    div.classList.add("pokemon-type");
    div.textContent += `${pokemonType.type.name}`;
    pokebox.classList.add(`${pokemonType.type.name}`);
    tipos.appendChild(div);
});

nome.textContent = pokemon.name;
foto.setAttribute("src", pokemon.sprites.other.dream_world.front_default)