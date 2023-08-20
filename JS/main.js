import exibirPokemons from "./exibirPokemons.js";
import pokedex from "./pokedex.js";

console.log("===JS CARREGADO===");

const listaDeExibicao = document.getElementById('pokemonList');
const sectionPage = document.getElementById('section-page');
const botaoNext = document.getElementById('button-next-page');
const botaoBack = document.getElementById('button-back-page');

let pokemons;

let pagina = 1;
let numeroDosPokemons = 0;
const pokemonsPorPagina = 20;

function verificScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    return scrollPosition >= documentHeight-200;
};

sectionPage.addEventListener("click", event =>{
    if (event.target == botaoNext){
        listaDeExibicao.textContent = "";
        numeroDosPokemons += pokemonsPorPagina;
        pagina++
        pokedex(numeroDosPokemons, pokemonsPorPagina);
        window.scrollTo(0, 0);
        botaoBack.style.display = "block";
    }else if((event.target == botaoBack) && (pagina > 1)){
        listaDeExibicao.textContent = "";
        pagina--
        numeroDosPokemons -= pokemonsPorPagina;
        pokedex(numeroDosPokemons, pokemonsPorPagina);
        window.scrollTo(0, 0);
        if(pagina === 1){
            botaoBack.style.display = "none";
        }
    }
});

window.addEventListener("scrollend", event=>{
    if (verificScroll()) {
        numeroDosPokemons += pokemonsPorPagina;
        pagina++
        pokedex(numeroDosPokemons, pokemonsPorPagina);
        botaoBack.style.display = "block";
        renderizarPokemons(numeroDosPokemons, pokemonsPorPagina, listaDeExibicao);
    }
});


listaDeExibicao.addEventListener("click", event =>{
    const convercao = JSON.stringify(pokemons[event.target.parentElement.id]);
    localStorage.setItem("pokemon", convercao);
});

async function renderizarPokemons (offset, quantidadePorPagina, elementoDeExibicao, type=""){
    pokemons = await pokedex(offset, quantidadePorPagina, type);
    exibirPokemons(pokemons, elementoDeExibicao);
};

renderizarPokemons(numeroDosPokemons, pokemonsPorPagina, listaDeExibicao);