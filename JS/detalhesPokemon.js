const div = document.createElement('div');

const elementoSpecie = document.getElementById('stat-species');
const elementoHeight = document.getElementById('stat-height');
const elementoWeight = document.getElementById('stat-weight');
const elementoEggCycle = document.getElementById('stat-egg-cycle');
const elementoAbilities = document.getElementById('stat-abilities');
const elementoMacho = document.getElementById('stat-gender-macho');
const elementoFemea = document.getElementById('stat-gender-femea');
const elementoEggGroup = document.getElementById('stat-egg-group');


export default function statusPokemon(pokemon){

elementoHeight.textContent = `${pokemon.height*10}cm`;
elementoSpecie.textContent = '??';
elementoWeight.textContent = pokemon.weight;
elementoEggCycle.textContent = "??";
elementoAbilities.textContent = "";
pokemon.abilities.forEach((element, index) =>{
    if(index > 0){
        elementoAbilities.textContent += ", ";
    }
    elementoAbilities.textContent += element.ability.name;
})
elementoMacho.textContent = "??";
elementoFemea.textContent = "??";
elementoEggGroup.textContent = "??";
}