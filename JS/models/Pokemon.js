export default class Pokemon {
    id;
    name;
    types;
    mainType;
    height;
    weight;
    picture;
    abilities;

    escolherTipoPrincipal(){
        
        const result = this.types.find((pokemonType, index) => {

            try{
                if(this.types.length == 1){
                    console.log(pokemonType.type.name)
                    return true
                }
                else if(pokemonType.type.name != "normal"){
                    
                    return true
                }
           
            } catch(e){
                console.log("erro na escolha do tipo")
            }
            
        })

        return result.type.name;
    }

    constructor(objectPokemon){
        this.id = objectPokemon.id;
        this.name = objectPokemon.name;
        this.types = objectPokemon.types;
        this.height = objectPokemon.height;
        this.weight = objectPokemon.weight;
        this.picture = objectPokemon.sprites.other["official-artwork"].front_default;
        this.mainType = escolherTipoPrincipal(objectPokemon);
        this.abilities = objectPokemon.abilities;
    }

}

function escolherTipoPrincipal(pokemon){
        
    const result = pokemon.types.find(pokemonType => {

        try{
            if(pokemon.types.length == 1){
                
                return true
            }
            else if(pokemonType.type.name != "normal"){
                
                return true
            }
       
        } catch(e){
            console.log("erro na escolha do tipo")
        }
        
    })

    return result.type.name;
}