const listaDeExibicao = document.getElementById('pokemonList')

export default function exibirPokemons(listaDePokemons, offset) {

    listaDePokemons.forEach((pokemon, index) => {
        
        listaDeExibicao.innerHTML += criaElementoPokemon(pokemon, index, offset);

    });

    return true
}
function criaElementoPokemon(pokemon, index, offset) {

    const objetoDeTipos = adicionaTiposDePokemon(pokemon.types);

    return (`
        <li class="container-pokemon style-texto-type" data-type="${objetoDeTipos.mainType}" data-pokeid="${index + offset}" id="${index + offset}">
            <div class="ancora-pokemon" data-pokeid="${index + offset}">
                <div class="container-nome-tipo" data-pokeid="${index + offset}">
                        <h2>${pokemon.name}</h2>
                    <div class="container-tipo">
                        ${objetoDeTipos.elemento}
                    </div>
                </div>
                <img class="small-picture" src="${pokemon.sprites.other["official-artwork"].front_default}">
            </div>
        </li>
    `)
}

function adicionaTiposDePokemon(arrayDeTipos){

    let elementoDeTipos = "";
    let mainType ="";

    arrayDeTipos.forEach((pokemonType, index) => {
       
        if (pokemonType.type.name != "normal" && index == 0) {
            mainType = pokemonType.type.name;
        } else if (arrayDeTipos[0].type.name == "normal") {
            mainType = pokemonType.type.name;
        }
        
        elementoDeTipos += `<div class="${pokemonType.type.name} pokemon-type" data-type="${mainType}">${pokemonType.type.name}</div>`;
    })

    return {elemento: elementoDeTipos, mainType: mainType}
}
