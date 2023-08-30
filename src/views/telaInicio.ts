
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemonApi.service';
import './styles.css';

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
    }

    registrarElementos() {
        this.txtPesquisa = document.getElementById('txtPesquisa') as HTMLInputElement;
        this.formPrincipal = document.getElementById('formPrincipal') as HTMLFormElement;
        this.btnLimpar = document.getElementById('btnLimpar') as HTMLButtonElement;
        this.btnPesquisar = document.getElementById('btnPesquisar') as HTMLButtonElement;
        this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement;
    }

    registrarEventos() {
        this.formPrincipal
        .addEventListener('submit', (sender) => this.buscar(sender));

        this.btnLimpar
        .addEventListener('click', () => this.limparCard());

        this.formPrincipal
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
        .catch(erro => console.log('Pokemon não encontrado', erro));
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


    limparCard(): void {
        const pokemon = document.getElementById('pnlPokemon');
        if (pokemon) {
            this.pnlConteudo.removeChild(pokemon);
        }
    }
}

window.addEventListener('load', () => new TelaInicio());