import { Component, input } from '@angular/core';

// Componente
import { PokemonCard } from "../pokemon-card/pokemon-card";

// Interfaces
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  styles: ``,
})
export class PokemonList {
  public pokemons = input.required<SimplePokemon[]>();
}
