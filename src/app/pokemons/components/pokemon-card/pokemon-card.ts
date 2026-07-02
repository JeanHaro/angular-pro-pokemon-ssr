import { Component, computed, effect, input } from '@angular/core';

// Interfaces
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styles: ``,
})
export class PokemonCard {
  public pokemon = input.required<SimplePokemon>();
  public readonly pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`);

 /*  logEffect = effect(() => {
    console.log('PokemonCard:', this.pokemon());
  }) */
}
