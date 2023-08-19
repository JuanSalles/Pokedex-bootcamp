console.log("===JS CARREGADO===");
const listaDeExibicao = document.getElementById('pokemonList');

async function pokedex (primeiro, ultimo){

    let listaDePokemons = new Array(ultimo).fill(1);

    let teste;
    
    teste = await Promise.all(listaDePokemons.map(async (element, index) => {
        
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${index+1}`);
        
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
        imagemDoPokemon.setAttribute("src", `${element.sprites.front_default}`)
        lista.appendChild(imagemDoPokemon);
        listaDeExibicao.appendChild(lista);

    });
    
}

let pokemons = pokedex(0, 30);

