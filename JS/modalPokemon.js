import detalhesPokemon from "./detalhesPokemon.js"

const imagePokemonInsideModal = document.getElementById('imagem-do-pokemon');
const boxModal = document.getElementById('box-modal');
const titlePokemon = document.getElementById('nome-do-pokemon');
const typeInsideModal = document.getElementById('pokemonType-modal');
const elementoPokemonId = document.getElementById('modal__pokemon-id')

export default function modalPokemon(pokemon){
    detalhesPokemon(pokemon);
    boxModal.setAttribute(`data-type`, pokemon.mainType);
    imagePokemonInsideModal.setAttribute('src', pokemon.picture);
    titlePokemon.textContent = pokemon.name;
    elementoPokemonId.textContent = "#"+pokemon.id;
    typeInsideModal.innerHTML = criaElementoDeTipos(pokemon.types);
    
}

function criaElementoDeTipos(listaDeTipos){
    let elementoHTML = "";
    listaDeTipos.forEach(element => {
        elementoHTML += `<div class="pokemon-type modal__type-container" data-type="${element.type.name}">${element.type.name}</div>`
    });
    return elementoHTML;
}


