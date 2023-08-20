export default async function exibirPokemons (listaDePokemons, elemento, offset){

    listaDePokemons.forEach(async (pokemon, index) => {

        const lista = document.createElement('li');
        lista.classList.add("container-pokemon");

        const primeiraDiv = document.createElement('div');
        primeiraDiv.classList.add("container-nome-tipo");

        const tituloNome = document.createElement('h2');
        tituloNome.textContent = `${pokemon.name}`
        primeiraDiv.appendChild(tituloNome);

        const segundaDiv = document.createElement('div');
        segundaDiv.classList.add("container-tipo");
        pokemon.types.forEach(pokemonType => {
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
        imagemDoPokemon.setAttribute("src", `${pokemon.sprites.other.dream_world.front_default}`)
        const ancora = document.createElement("a");
        ancora.classList.add("ancora-pokemon")
        ancora.setAttribute("href","#");
        ancora.setAttribute("id",`${index+offset}`);
        ancora.appendChild(imagemDoPokemon);
        lista.appendChild(ancora)
        elemento.appendChild(lista);
    });
    
}