import exibirPokemons from "./exibirPokemons.js";
import pokedex from "./pokedex.js";
import statusPokemon from "./statusPokemon.js";

console.log("===JS CARREGADO===");

const listaDeExibicao = document.getElementById('pokemonList');
const botaoBackDetail = document.getElementById('botao-back-detail');
const botaoBackType = document.getElementById('botao-back-type');
const detailModal = document.getElementById('poke-modal');
const typeModal = document.getElementById('poke-modal-tipo');
const imagemDoPokemon = document.getElementById('imagem-do-pokemon');
const boxModal = document.getElementById('box-modal');
const nomeModal = document.getElementById('nome-do-pokemon');
const typeInsideDetailModal = document.getElementById('pokemonType-modal');
const botaoTipo = document.getElementById('filter-tipo');
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
    const itemLista = document.getElementById(`${id}`);
    statusPokemon(pokemon);
    typeInsideDetailModal.textContent = "";
    imagemDoPokemon.setAttribute('src', `${pokemon.sprites.other["official-artwork"].front_default}`)
    detailModal.style.display = "flex";
    boxModal.classList.add('style-texto-type');
    boxModal.setAttribute(`data-type`, `${itemLista.dataset.type}`);
    nomeModal.textContent = pokemon.name;
    pokemon.types.forEach(element => {
        const div = document.createElement('div');
        div.textContent = element.type.name;
        div.classList.add('modal__type-container')
        typeInsideDetailModal.appendChild(div);
    });
});

botaoTipo.addEventListener("click", () => typeModal.style.display = "flex");

botaoBackDetail.addEventListener("click", () => detailModal.style.display = "none");

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