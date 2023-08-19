console.log("===JS CARREGADO===");
const listaDeExibicao = document.getElementById('pokemonList');
const sectionPage = document.getElementById('section-page');
const botaoNext = document.getElementById('button-next-page');
const botaoBack = document.getElementById('button-back-page');

let pagina = 1;
let numeroDosPokemons = 0;
const pokemonsPorPagina = 20;

function verificScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    return scrollPosition >= documentHeight-200;
  }

async function pokedex (primeiro, ultimo){

    let listaDePokemons = new Array(ultimo).fill(1);

    let teste;
    
    teste = await Promise.all(listaDePokemons.map(async (element, index) => {
        
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${index+1+primeiro}`);
        
        const data = await APIResponse.json();

        return  await data;
    }));

    exibirPokemons(teste);
}


async function exibirPokemons (listaDePokemons){

    listaDePokemons.forEach(element => {

        const lista = document.createElement('li');
        lista.classList.add("container-pokemon");

        const primeiraDiv = document.createElement('div');
        primeiraDiv.classList.add("container-nome-tipo");

        const tituloNome = document.createElement('h2');
        tituloNome.textContent = `${element.name}`
        primeiraDiv.appendChild(tituloNome);

        const segundaDiv = document.createElement('div');
        segundaDiv.classList.add("container-tipo");
        element.types.forEach(pokemonType => {
            const div = document.createElement('div');
            div.classList.add(`${pokemonType.type.name}`);
            div.classList.add("pokemon-type");
            div.textContent += `${pokemonType.type.name}`;
            lista.classList.add(`${pokemonType.type.name}`);
            segundaDiv.appendChild(div);
        });
        primeiraDiv.appendChild(segundaDiv);
        lista.appendChild(primeiraDiv);

        const imagemDoPokemon = document.createElement('img');
        imagemDoPokemon.setAttribute("src", `${element.sprites.other.dream_world.front_default}`)
        lista.appendChild(imagemDoPokemon);
        listaDeExibicao.appendChild(lista);

    });
    
}

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
})

window.addEventListener("scrollend", event=>{
    if (verificScroll()) {
        numeroDosPokemons += pokemonsPorPagina;
        pagina++
        pokedex(numeroDosPokemons, pokemonsPorPagina);
        botaoBack.style.display = "block";
        // Execute a ação desejada aqui
      }
})

pokedex(numeroDosPokemons, pokemonsPorPagina);
