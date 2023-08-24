import detalhesPokemon from "./detalhesPokemon.js"

const imagePokemonInsideModal = document.getElementById('imagem-do-pokemon');
const boxModal = document.getElementById('box-modal');
const titlePokemon = document.getElementById('nome-do-pokemon');
const typeInsideModal = document.getElementById('pokemonType-modal');

export default function modalPokemon(pokemon){
    detalhesPokemon(pokemon);
    typeInsideModal.textContent = "";
    boxModal.setAttribute(`data-type`, pokemon.mainType);
    imagePokemonInsideModal.setAttribute('src', pokemon.picture);
    titlePokemon.textContent = pokemon.name;
    typeInsideModal.innerHTML = criaElementoDeTipos(pokemon.types);
}

function criaElementoDeTipos(listaDeTipos){
    let elementoHTML = "";
    listaDeTipos.forEach(element => {
        elementoHTML += `<div class="pokemon-type modal__type-container" data-type="${element.type.name}">${element.type.name}</div>`
    });
    return elementoHTML;
}


