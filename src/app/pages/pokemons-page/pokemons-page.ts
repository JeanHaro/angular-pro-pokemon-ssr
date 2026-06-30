import { Component } from '@angular/core';

// Componentes
import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";

@Component({
  selector: 'pokemons-page',
  imports: [
    PokemonList
  ],
  templateUrl: './pokemons-page.html',
  styles: ``,
})
export default class PokemonsPage {}
