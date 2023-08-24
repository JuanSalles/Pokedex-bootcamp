const listaDeExibicao = document.getElementById('pokemonList')

export default function exibirPokemons(listaDePokemons, offset) {

    listaDePokemons.forEach((pokemon, index) => {
        
        listaDeExibicao.innerHTML += criaElementoPokemon(pokemon, index, offset);

    });

    return true
}
function criaElementoPokemon(pokemon, index, offset) {

    return (`
        <li class="container-pokemon style-texto-type" data-type="${pokemon.mainType}" data-pokeid="${index + offset}" id="${index + offset}">
            <div class="ancora-pokemon" data-pokeid="${index + offset}">
                <div class="container-nome-tipo" data-pokeid="${index + offset}">
                        <h2>${pokemon.name}</h2>
                    <div class="container-tipo">
                        ${adicionaTiposDePokemon(pokemon.types)}
                    </div>
                </div>
                <img class="small-picture" src="${pokemon.picture}">
            </div>
        </li>
    `)
}
function adicionaTiposDePokemon(arrayDeTipos){

    let elementoDeTipos = "";
    

    arrayDeTipos.forEach((pokemonType) => {
       
        elementoDeTipos += `<div class="pokemon-type" data-type="${pokemonType.type.name}">${pokemonType.type.name}</div>`;
    })

    return elementoDeTipos
}
