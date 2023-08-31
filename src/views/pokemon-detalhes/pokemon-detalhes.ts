import { Pokemon } from "../../models/pokemon";
import { PokemonService } from "../../services/pokemonApi.service";
import './pokemon-detalhes.css';

class PokemonDetalhes {
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

        const url = new URLSearchParams(window.location.search);
        const nome = url.get('nome') as string;

        this.pesquisarPokemonPorNome(nome);
    }


    registrarElementos() {
        this.txtPesquisa = document.getElementById('txtPesquisa') as HTMLInputElement;
        this.formPrincipal = document.getElementById('formPrincipal') as HTMLFormElement;
        this.btnLimpar= document.getElementById('btnLimpar') as HTMLButtonElement;
        this.btnPesquisar = document.getElementById('btnPesquisar') as HTMLButtonElement;
        this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement;
    }

    registrarEventos() {
        this.formPrincipal
        .addEventListener('submit', (sender) => this.buscar(sender));

        this.btnLimpar
        .addEventListener('click', () => this.limparCard());
    }

    buscar(sender: SubmitEvent): void {
        sender.preventDefault();
        
        this.limparCard();

        const nome = this.txtPesquisa.value;

        this.pesquisarPokemonPorNome(nome);
    }

    pesquisarPokemonPorNome(nome: string) {
        this.pokemonService.selecionarPokemonPorNome(nome)
        .then(pokemon => this.gerarCard(pokemon))
        .catch((erro: Error) => this.exibirNotificacao(erro));
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

    limparCard(): void {
        const pokemon = document.getElementById('pnlPokemon');
        if (pokemon) {
            this.pnlConteudo.removeChild(pokemon);
        }
    }
}

window.addEventListener('load', () => new PokemonDetalhes());