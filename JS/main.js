import exibirPokemons from "./exibirPokemons.js";
import pokedex from "./pokedex.js";

console.log("===JS CARREGADO===");

const listaDeExibicao = document.getElementById('pokemonList');
const botaoBack = document.getElementById('botao-back');
const modal = document.getElementById('poke-modal');
const imagemDoPokemon = document.getElementById('imagem-do-pokemon');
const boxModal = document.getElementById('box-modal');
const nomeModal = document.getElementById('nome-do-pokemon');
const typeModal = document.getElementById('pokemonType-modal');

const todosPokemons =[];

let breakPointAPI = true;

const larguraDaPagina = window.innerWidth;
let pokemonsPorPagina;

if(larguraDaPagina < 856){
    pokemonsPorPagina = 20;
}else {
    pokemonsPorPagina = 30;
}

let numeroDosPokemons = 0;

function verificScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    return scrollPosition >= documentHeight-100;
};

 window.onscroll = async () =>{
     if (verificScroll() && breakPointAPI) {
        breakPointAPI = false;
        numeroDosPokemons += pokemonsPorPagina;
        breakPointAPI = await renderizarPokemons(numeroDosPokemons, pokemonsPorPagina, listaDeExibicao);
     }
 };

listaDeExibicao.addEventListener("click", event =>{
    const id = event.target.parentElement.dataset.pokeid;
    const pokemon = todosPokemons[id];
    const itemLista = document.getElementById(`${id}`);
    imagemDoPokemon.setAttribute('src', `${pokemon.sprites.other["official-artwork"].front_default}`)
    modal.style.display = "flex";
    boxModal.setAttribute(`data-type`, `${itemLista.dataset.type}`);
    nomeModal.textContent = pokemon.name;
    pokemon.types.forEach(element => {
        const div = document.createElement('div');
        div.textContent = element.type.name;
        div.classList.add('modal__type-container')
        typeModal.appendChild(div);
    });
});

botaoBack.addEventListener("click", event => {
    modal.style.display = "none";
})

async function renderizarPokemons (offset, quantidadePorPagina, elementoDeExibicao, type=""){
    const pokemons = await pokedex(offset, quantidadePorPagina, type);
    todosPokemons.push(...pokemons)
    return exibirPokemons(pokemons, elementoDeExibicao, offset);
};

renderizarPokemons(numeroDosPokemons, pokemonsPorPagina, listaDeExibicao);