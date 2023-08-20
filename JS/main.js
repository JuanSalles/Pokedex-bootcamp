import exibirPokemons from "./exibirPokemons.js";
import pokedex from "./pokedex.js";

console.log("===JS CARREGADO===");

const listaDeExibicao = document.getElementById('pokemonList');
const sectionPage = document.getElementById('section-page');
const botaoNext = document.getElementById('button-next-page');
const botaoBack = document.getElementById('button-back-page');
const modal = document.getElementById('poke-modal');

const todosPokemons =[];

let pagina = 1;
let numeroDosPokemons = 0;
const pokemonsPorPagina = 20;

function verificScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    return scrollPosition >= documentHeight-500;
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

window.addEventListener("scroll", event=>{
    if (verificScroll()) {
        numeroDosPokemons += pokemonsPorPagina;
        pagina++
        pokedex(numeroDosPokemons, pokemonsPorPagina);
        botaoBack.style.display = "block";
        renderizarPokemons(numeroDosPokemons, pokemonsPorPagina, listaDeExibicao);
    }
});


listaDeExibicao.addEventListener("click", event =>{
    modal.innerHTML = "";
    const convercao = JSON.stringify(todosPokemons[event.target.parentElement.id]);
    localStorage.setItem("pokemon", convercao);
    const pokemonEscolhido = document.querySelector(`[data-pokeid="${event.target.parentElement.id}"]`);
    modal.appendChild(pokemonEscolhido);
    modal.style.display = "block";
});

modal.addEventListener("click", event => {
    if(event.target.id == "poke-modal"){
        modal.style.display = "none";
    }
})

async function renderizarPokemons (offset, quantidadePorPagina, elementoDeExibicao, type=""){
    const pokemons = await pokedex(offset, quantidadePorPagina, type);
    todosPokemons.push(...pokemons)
    exibirPokemons(pokemons, elementoDeExibicao, offset);
};

renderizarPokemons(numeroDosPokemons, pokemonsPorPagina, listaDeExibicao);