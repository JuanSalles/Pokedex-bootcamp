
export default async function pokedex (offset, limit, type){

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        
    const data = await APIResponse.json();

    const pokemons = Promise.all(data.results.map(async element =>{
        const APIResponse = await fetch(element.url);
        const pokemon = await APIResponse.json();
        return await pokemon;
    }));

    return(await pokemons);
}