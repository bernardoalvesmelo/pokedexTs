import { Pokemon } from "../models/pokemon";

export class PokemonService {

    selecionarPokemonPorNome(nome: string): Promise<Pokemon> {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + nome;

        return fetch(url)
            .then((res: Response): Promise<any> => this.processarResposta(res))
            .then((obj: any): Pokemon => this.mapearPokemon(obj));
    }

    selecionarPokemons(): Promise<any[]> {
        const url = 'https://pokeapi.co/api/v2/pokemon/';

        return fetch(url)
            .then((res: Response): Promise<Pokemon> => this.processarResposta(res))
            .then((obj: any): Promise<Pokemon[]> => this.mapearListaPokemons(obj.results));
    }

    processarResposta(resposta: Response): any {
        if (resposta.ok) {
            return resposta.json();
        }

        throw new Error('Pokemon não encontrado');
    }

    mapearPokemon(obj: any): Pokemon {
        return {
            id: obj.id,
            nome: obj.name,
            spriteUrl: obj.sprites.other['official-artwork'].front_default
        }
    }

    mapearListaPokemons(objetos: any[]): Promise<Pokemon[]> {
        const pokemons = objetos.map(obj => {
            return this.selecionarPokemonPorNome(obj.name);
        });

        return Promise.all(pokemons);
    }
}