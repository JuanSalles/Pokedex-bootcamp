import Pokemon from "./models/Pokemon.js"
export default async function pokedex(offset, limit, type) {


    if (type == "") {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        const data = await APIResponse.json();
        const pokemons = Promise.all(data.results.map(async element => {
            const APIResponse = await fetch(element.url);
            const pokemon = new Pokemon(await APIResponse.json());
            return pokemon;
        }));
        return (await pokemons);
    } else {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await APIResponse.json();
        const pokemons = Promise.all(data.pokemon.map(async element => {
            const APIResponse = await fetch(element.pokemon.url);
            const pokemon = new Pokemon(await APIResponse.json());
            return pokemon;
        }));
        return (await pokemons);
    }
    
}