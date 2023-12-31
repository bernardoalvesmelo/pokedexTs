
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemonApi.service';
import './tela-inicio.css';

class TelaInicio {
    txtPesquisa: HTMLInputElement;
    formPrincipal: HTMLFormElement;
    btnLimpar: HTMLButtonElement;
    btnPesquisar: HTMLButtonElement;
    pnlConteudo: HTMLDivElement;

    pokemonService: PokemonService;

    constructor() {
        this.registrarElementos();
        this.registrarEventos();

        this.pokemonService = new PokemonService();

        this.pokemonService.selecionarPokemons()
            .then((pokemons) => this.gerarGridPokemons(pokemons));
    }

    gerarGridPokemons(pokemons: Pokemon[]): any {
        const pnlGrid = document.createElement('div');
        pnlGrid.classList.add('grid-pokemons');

        for( let pokemon of pokemons) {
            const card = this.obterCard(pokemon);
        
            pnlGrid.appendChild(card);
        }

        this.pnlConteudo.appendChild(pnlGrid);
    }

    registrarElementos() {
        this.txtPesquisa = document.getElementById('txtPesquisa') as HTMLInputElement;
        this.formPrincipal = document.getElementById('formPrincipal') as HTMLFormElement;

        this.btnPesquisar = document.getElementById('btnPesquisar') as HTMLButtonElement;
        this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement;
    }

    registrarEventos() {
        this.formPrincipal
        .addEventListener('submit', (sender) => this.buscar(sender));

    }

    buscar(sender: SubmitEvent): void {
        sender.preventDefault();
        
        
        const nome = this.txtPesquisa.value;

        this.pesquisarPokemonPorNome(nome);
    }

    pesquisarPokemonPorNome(nome: string) {
        this.pokemonService.selecionarPokemonPorNome(nome)
        .then(pokemon => this.redirecionarUsuario(pokemon.nome))
        .catch((erro: Error) => this.exibirNotificacao(erro));
    }

    redirecionarUsuario(nome: string): any {
        window.location.href = 'pokemon-detalhes.html?nome=' + nome;
    }

    gerarCard(pokemon: Pokemon): void {
        const pnlPokemon = document.createElement('div');
        pnlPokemon.className = 'pnlPokemon';
        pnlPokemon.innerHTML = 
            `<h2>${pokemon.nome}</h2>
            <p>${pokemon.id}</p>
            <img src=${pokemon.spriteUrl}>`
        this.pnlConteudo.appendChild(pnlPokemon);
    }

    obterCard(pokemon: Pokemon): HTMLDivElement {
        const pnlPokemon = document.createElement('div');
        pnlPokemon.className = 'pnlPokemon';
        pnlPokemon.innerHTML = 
            `<h2>${pokemon.nome}</h2>
            <p>${pokemon.id}</p>
            <img src=${pokemon.spriteUrl}>`;


        pnlPokemon.addEventListener('click', (sender) => {
            window.location.href = `pokemon-detalhes.html?nome=${pokemon.nome}`
        })
        return pnlPokemon;
    }


    exibirNotificacao(erro: Error): void {
        const divNotificacao = document.createElement('div');

        divNotificacao.textContent = erro.message;
        divNotificacao.classList.add('notificacao');

        divNotificacao
        .addEventListener('click', (sender: Event) => {
            (sender.target as HTMLElement).remove()
        });

        document.body.appendChild(divNotificacao);
        
        setTimeout(() => {
            divNotificacao.remove();
        }, 5000);
    }
}

window.addEventListener('load', () => new TelaInicio());