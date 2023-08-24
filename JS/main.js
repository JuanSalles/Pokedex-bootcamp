import exibirPokemons from "./exibirPokemons.js";
import pokedex from "./pokedex.js";
import modalPokemon from "./modalPokemon.js";

console.log("===JS CARREGADO===");

const containerModal = document.getElementById('poke-modal');
const listaDeExibicao = document.getElementById('pokemonList');
const botaoBackDetail = document.getElementById('botao-back-detail');
const botaoBackType = document.getElementById('botao-back-type');
const botaoTipo = document.getElementById('filter-tipo');
const typeModal = document.getElementById('poke-modal-tipo');
const elementoListaDeTipos = document.getElementById('filtro-lista-de-tipos');
let tipoSelecionado = "";

let pokemon;

let todosPokemons = [];

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
     if (verificScroll() && breakPointAPI && tipoSelecionado=="") {
        breakPointAPI = false;
        numeroDosPokemons += pokemonsPorPagina;
        breakPointAPI = await renderizarPokemons(numeroDosPokemons, pokemonsPorPagina);
     }
 };

listaDeExibicao.addEventListener("click", event =>{
    const id = event.target.parentElement.dataset.pokeid;
    pokemon = todosPokemons[id];
    modalPokemon(pokemon);
    containerModal.style.display = "flex"
});

botaoTipo.addEventListener("click", () => typeModal.style.display = "flex");

botaoBackDetail.addEventListener("click", () => containerModal.style.display = "none");

botaoBackType.addEventListener("click", () => typeModal.style.display = "none");

elementoListaDeTipos.addEventListener("click", event =>{
    tipoSelecionado = event.target.dataset.type
    listaDeExibicao.textContent = "";
    numeroDosPokemons = 0;
    todosPokemons = [];
    renderizarPokemons(numeroDosPokemons, pokemonsPorPagina, tipoSelecionado);
    typeModal.style.display = "none";
})

async function renderizarPokemons (offset, quantidadePorPagina, type=""){
    const pokemons = await pokedex(offset, quantidadePorPagina, type);
    todosPokemons.push(...pokemons)
    return exibirPokemons(pokemons, offset);
};

renderizarPokemons(numeroDosPokemons, pokemonsPorPagina);