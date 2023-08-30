import { Pokemon } from "../models/pokemon";

export class PokemonService {

    selecionarPokemonPorNome(nome: string): Promise<Pokemon> {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + nome;

        return fetch(url)
            .then(res => res.json())
            .then((obj: any): Pokemon => this.mapearPokemon(obj));
    }

    mapearPokemon(obj: any): Pokemon {
        return {
            id: obj.id,
            nome: obj.name,
            spriteUrl: obj.sprites.front_default
        }
    }
}