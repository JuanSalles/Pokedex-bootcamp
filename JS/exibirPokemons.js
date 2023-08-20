export default function exibirPokemons (listaDePokemons, elemento, offset){

    listaDePokemons.forEach((pokemon, index) => {

        const lista = document.createElement('li');
        lista.classList.add("container-pokemon");

        const primeiraDiv = document.createElement('div');
        primeiraDiv.classList.add("container-nome-tipo");

        const tituloNome = document.createElement('h2');
        tituloNome.textContent = `${pokemon.name}`
        primeiraDiv.appendChild(tituloNome);
        primeiraDiv.setAttribute("data-pokeid",`${index+offset}`)

        const segundaDiv = document.createElement('div');
        segundaDiv.classList.add("container-tipo");
        pokemon.types.forEach((pokemonType, index) => {
            const div = document.createElement('div');
            div.classList.add(`${pokemonType.type.name}`);
            div.classList.add("pokemon-type");
            div.textContent += `${pokemonType.type.name}`;
            if(pokemonType.type.name != "normal" && index==0){
                lista.setAttribute("data-type", `${pokemonType.type.name}`);
            }else if(pokemon.types[0].type.name == "normal"){
                lista.setAttribute("data-type", `${pokemonType.type.name}`);
            }
            segundaDiv.appendChild(div);
        });
        primeiraDiv.appendChild(segundaDiv);
        
        const imagemDoPokemon = document.createElement('img');
        imagemDoPokemon.setAttribute("src", `${pokemon.sprites.other["official-artwork"].front_default}`)
        const ancora = document.createElement("div");
        ancora.classList.add("ancora-pokemon")
        ancora.setAttribute("href","#");
        ancora.setAttribute("data-pokeid",`${index+offset}`);
        lista.setAttribute("data-pokeid",`${index+offset}`);
        lista.setAttribute("id",`${index+offset}`);
        ancora.appendChild(primeiraDiv);
        ancora.appendChild(imagemDoPokemon);
        lista.appendChild(ancora)
        elemento.appendChild(lista);
    });
    
    return true
}